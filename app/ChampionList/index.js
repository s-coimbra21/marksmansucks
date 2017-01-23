import { h } from 'preact';
import cx from 'classnames';
import Sidebar from '../Sidebar';

import mastery7 from './img/mastery7.png';

import style from './index.scss';
import championsStyle from './champions.scss';

const champions = [
  'Jinx', 'Ashe', 'Caitlyn', 'Corki', 'Draven', 'Ezreal',
  'Jhin', 'Kalista', 'Kog\'Maw', 'Lucian', 'Miss Fortune',
  'Sivir', 'Tristana', 'Twitch', 'Varus', 'Vayne'
];

const normalize = c => c.replace(/[ ']/, '').toLowerCase();

const ChampionList = ({ isOpen, load }) => (
  <div class={cx(style.championList, isOpen && style.open)}>
    <Sidebar val={champions.length * 300} />
    <div class={style.champions}>
      {champions.map(c =>
        <div class={style.square}>
          <img role="presentation" src={mastery7} class={style.mastery} />
          <div class={style.squareBg}>
            <div class={load && championsStyle[normalize(c)]} />
          </div>
          <span class={style.name}>{c}</span>
        </div>)}
    </div>
  </div>
  );

export default ChampionList;
