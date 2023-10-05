import { faker } from '@faker-js/faker';
import { env } from '@metronome/env.server';
import fetch from 'node-fetch';

import { generateRemixFunction, generateRequest } from './mocks';

const postData = async () => {
  const data = faker.helpers.arrayElement([
    [generateRequest('loader'), generateRemixFunction('loader')],
    [generateRequest('action'), generateRemixFunction('action')],
  ]);

  try {
    await fetch('http://127.0.0.1:3000/metrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ApiKey: env.producer().apiKey!,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error('Error producing seed data:', error);
  }
};

let warmedUp = false;

const postWithRandomInterval = async () => {
  // wait 30 seconds before starting to post data
  if (!warmedUp) {
    await new Promise((resolve) => setTimeout(resolve, 30000));
    warmedUp = true;
  }

  if (!env.producer().apiKey) return;
  await postData();
  const randomDelay = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000; // Random delay between 1 and 5 seconds
  setTimeout(postWithRandomInterval, randomDelay);
};

postWithRandomInterval();
