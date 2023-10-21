import { Chalk } from 'chalk';
import boxen from 'boxen';

const chalk = new Chalk({ level: 3 });

const fly = chalk.magenta('Fly.io');

// Boxed Text
const text = `
✅ Created ${fly} web deployment files
✅ Created ${fly} redis deployment files
`;

console.log(
  boxen(text, {
    title: 'Deployment set up',
    padding: 0.5,
    borderColor: 'green',
  }),
);
