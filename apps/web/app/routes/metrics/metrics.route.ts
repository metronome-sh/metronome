import { kafka } from '@metronome/kafka.server';
import { type ActionFunctionArgs } from '@remix-run/node';

export async function action({ request }: ActionFunctionArgs) {
  const apiKey = request.headers.get('api-key');

  if (!apiKey) return new Response(null, { status: 202 });

  const data = await request.json();

  if (!data) return new Response(null, { status: 202 });

  const producer = await kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'metrics',
    messages: [{ value: JSON.stringify({ apiKey, data }) }],
  });

  await producer.disconnect();

  return new Response(null, { status: 200 });
}
