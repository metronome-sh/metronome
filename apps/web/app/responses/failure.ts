import { json } from '@remix-run/node';

export function failure() {
  return json({ success: false });
}
