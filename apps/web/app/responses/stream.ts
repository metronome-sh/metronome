import { handle } from '@metronome/utils.server';

import { empty } from './empty';

export interface StreamCleanupCallback {
  (): void;
}

export interface StreamSetupCallback<LoaderFunction> {
  (
    send: (data: Partial<UnwrapDeferred<LoaderFunction>>, ts: number) => void,
    controller: AbortController,
  ): Promise<StreamCleanupCallback> | StreamCleanupCallback;
}

export async function stream<LoaderFunction>(
  routeId: string,
  request: Request,
  callback: StreamSetupCallback<LoaderFunction>,
): Promise<Response> {
  const { query } = await handle(request);
  if ((await query.get('_intent')) === 'handshake') return empty();

  if (!request.signal) return new Response(null, { status: 400 });

  const streamController = new AbortController();

  let cleanup: StreamCleanupCallback | null = null;

  const readableStream = new ReadableStream({
    async start(controller) {
      let closed = false;

      function close() {
        console.log('Closing stream');
        if (closed) return;

        cleanup?.();
        closed = true;
        // clearInterval(pingInterval);
        request.signal.removeEventListener('abort', close);
        controller.close();
      }

      streamController.signal.addEventListener('abort', close);

      const encoder = new TextEncoder();

      if (request.signal.aborted) close();

      // Send a ping every 30 seconds to keep the connection alive
      // const pingInterval = setInterval(() => {
      //   const event = { name: 'keepalive', detail: { data: null, ts: Date.now() } };
      //   const stringified = JSON.stringify(event);
      //   controller.enqueue(encoder.encode('event: message\n'));
      //   controller.enqueue(encoder.encode(`data: ${stringified}\n\n`));
      // }, 55_000);

      request.signal.addEventListener('abort', close);

      function send(
        sendData: Partial<UnwrapDeferred<LoaderFunction>>,
        ts: number,
      ) {
        if (closed) return;

        const stringified = JSON.stringify({
          name: routeId,
          detail: { data: sendData, ts },
        });

        controller.enqueue(encoder.encode('event: message\n'));
        controller.enqueue(encoder.encode(`data: ${stringified}\n\n`));
      }

      cleanup = await callback(send, streamController);

      if (request.signal.aborted) close();
    },
  });

  return new Response(readableStream, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}
