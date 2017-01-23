import { h } from 'preact';
import Button from '../Button';

import style from './index.scss';

export default ({ startPlaying, loading }) => (
  <div id="content" class={style.content}>
    <div class={style.title}>
        MARKSMAN SUCKS
      </div>
    <div class={style.description}>
        Wake up, stop losing elo
      </div>
    <div class={style.buttonWrapper}>
      <Button onClick={startPlaying} disabled={loading}>{loading ? 'Loading...' : 'Try Again'}</Button>
    </div>
  </div>
);
