import { h } from 'preact';

import style from './index.scss';

const Sidebar = ({ val }) => (
  <div class={style.sidebar}>
    <div class={style.summary}>
      <span class={style.count}>{val}</span>
      <span class={style.text}>Total Free Gold</span>
    </div>
  </div>
  );

export default Sidebar;
