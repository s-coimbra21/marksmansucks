import { h, Component } from 'preact';
import cx from 'classnames';

import style from './index.entry.scss';

/**
 * Button that looks exactly like the golden border buttons on
 * the League Client
 */
export default class Button extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isHover: false,
      isMouseDown: false,
      isClick: false
    };
  }

  onClick = () => {
    const { onClick, disabled } = this.props;
    if (!disabled) {
      this.setState({ isClick: true });
      setTimeout(() => {
        if (this.state.isClick) {
          this.setState({ isClick: false });
        }
      }, 600);
      onClick && onClick.call && onClick();
    }
  }

  onMouseDown = () => this.setState({ isMouseDown: true });
  onMouseUp = () => this.setState({ isMouseDown: false });

  onMouseEnter = () => this.setState({ isHover: true });
  onMouseLeave = () => this.setState({ isHover: false, isMouseDown: false });

  render () {
    const { className, children, text, disabled } = this.props;
    const { isHover, isMouseDown, isClick } = this.state;
    const hoverClass = !disabled && isHover ? style.hover : style.idle;
    const mouseDownClass = !disabled && isMouseDown && style.down;
    const clickClass = !disabled && isClick && style.click;
    const disabledClass = disabled && style.disabled;
    return (
      <div
        class={cx(
          style.button, hoverClass, mouseDownClass, clickClass, disabledClass, className
        )}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        <div class={style.buttonBg} />
        <div class={style.borderIdle} />
        <div class={style.borderTransition} />
        <div class={style.flare} />
        <div class={style.glow} />
        <div class={style.sheenWrapper} >
          <div class={style.sheen} />
        </div>
        <div class={style.content}>
          {children || text}
        </div>
      </div>
    );
  }
}
