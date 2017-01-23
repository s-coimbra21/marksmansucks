import { h, Component } from 'preact';

export default class Source extends Component {
  componentDidMount () {
    this.hook();
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.isLast !== nextProps.isLast) {
      if (nextProps.isLast) {
        this.hook();
      }
      if (this.props.isLast) {
        this.unhook();
      }
    }
  }
  componentWillUnmount () {
    this.unhook();
  }
  hook = () => {
    this.base.addEventListener('error', this.handleError);
  }
  unhook = () => {
    this.base.removeEventListener('error', this.handleError);
  }
  handleError = error => {
    this.props.onError(error);
  }
  render () {
    const { src, type } = this.props;
    return <source src={src} type={type} />;
  }
}
