const fs = require('fs');

const champions = [
  'Jinx', 'Ashe', 'Caitlyn', 'Corki', 'Draven', 'Ezreal',
  'Jhin', 'Kalista', 'Kog\'Maw', 'Lucian', 'Miss Fortune',
  'Sivir', 'Tristana', 'Twitch', 'Varus', 'Vayne'
];

const normalize = c => c.replace(/[ ']/, '').toLowerCase();
const template = c => `
  .${c} {
    background-image: url('./img/${c}.jpg');
  }
`;

const text = champions.map(normalize).map(template).join('');

fs.writeFileSync('./champions.scss', text, 'utf-8');
