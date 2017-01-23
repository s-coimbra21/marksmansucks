import { h } from 'preact';

import style from './index.entry.scss';

export default ({ hostedBy, original }) => (
  <div class={style.clipInfo}>
    <a rel="noopener noreferrer" target="_blank" href={original}>Original clip on <b>{hostedBy}</b></a>
  </div>
);
