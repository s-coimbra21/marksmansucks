import { h, Component } from 'preact';
import Article from '../Article';

import style from './index.scss';

export default class Articles extends Component {
  constructor (props) {
    super(props);
    this.state = {
      active: 0,
      isOpen: false
    };
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.noModal) {
      this.setState({ isOpen: false });
    }
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleDocumentClick = event => {
    if (!this.base.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  handleOpen = article => {
    if (article === this.state.active) {
      return this.setState({ isOpen: false });
    }
    this.setState({ active: article, isOpen: true });
  }

  render () {
    const { isOpen, active } = this.state;
    const { canLoad } = this.props;

    if (!canLoad) {
      return null;
    }

    return (
      <div id="articles" class={style.articles}>
        <Article index={1} title="Twitch DELETING Poppy" isActive={isOpen && active === 1} onOpen={this.handleOpen} imageSrc="https://cdn.marksmansucks.lol/1.jpg">
          <iframe width="560" height="349" src="https://www.youtube.com/embed/MU1BTD2mj24" frameBorder="0" autoplay={false} allowFullScreen />
        </Article>
        <Article index={3} title="EYE-POPPING damage from Draven" isActive={isOpen && active === 3} onOpen={this.handleOpen} imageSrc="https://cdn.marksmansucks.lol/3.jpg">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/_xn5E-G81FY" frameBorder="0" autoplay={false} allowFullScreen />
        </Article>
      </div>
    );
  }
}
