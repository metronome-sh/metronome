import { remember } from '@epic-web/remember';
import { env } from '@metronome/env.server';
import { Kafka } from 'kafkajs';

export function hello() {
  console.log('hello world');
}

export const kafka = remember('kafka', () => {
  return new Kafka({
    clientId: 'metronome',
    brokers: env.kafka().brokers,
  });
});
