import { h } from 'preact';
import cx from 'classnames';

import style from './index.scss';

export default function Modal ({ className, children }) {
  return (
    <div class={cx(style.dialog, className)}>
      <div class={style.contentWrapper}>
        {children && children}
      </div>
      <div class={style.border} />
    </div>
  );
}
