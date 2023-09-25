import { users } from '@metronome/db.server';

export function createAuthHandle(request: Request) {
  async function user() {}

  async function attempt({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await users.authenticate({ email, password });

    console.log({ user });

    // const response = await fetch('https://api.metronome.io/v1/auth/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({email, password})
    // })
    // const data = await response.json()
    // return data
  }

  return { user, attempt };
}
