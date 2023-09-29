import { json } from '@remix-run/node';

export function success() {
  return json({ success: true });
}
