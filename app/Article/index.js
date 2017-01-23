import { h } from 'preact';
import Media from '../Media';
import Modal from '../Modal';

import style from './index.scss';

/* eslint-disable no-confusing-arrow */
export default function Article ({ index, children, title, imageSrc, isActive, onOpen }) {
  return (
    <article class={style.article}>
      {isActive && <Modal className={style.content}>
        <div class={style.videoWrap}>
          {children}
        </div>
      </Modal>}
      <Media query={{ maxWidth: 959 }}>
        {matches => matches ? <div class={style.videoWrap}>{children}</div> :
        <div class={style.imageWrapper} onClick={() => onOpen(index)}>
          <img class={style.image} alt={title} src={imageSrc} />
        </div>}
      </Media>
      <Media query={{ maxWidth: 959 }}>
        {matches => matches ? null :
        <div class={style.title} onClick={() => onOpen(index)}>
          {title}
        </div>}
      </Media>
    </article>
  );
}
