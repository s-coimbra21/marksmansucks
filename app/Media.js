// https://github.com/ReactTraining/react-media

import { Component } from 'preact';
import json2mq from 'json2mq';

class Media extends Component {
  state = {
    matches: true
  }

  componentWillMount () {
    let { query } = this.props;

    if (typeof query !== 'string') { query = json2mq(query); }

    if (typeof window === 'object') {
      this.mediaQueryList = window.matchMedia(query);
      this.mediaQueryList.addListener(this.updateMatches);
      this.updateMatches();
    }
  }

  componentWillUnmount () {
    this.mediaQueryList.removeListener(this.updateMatches);
  }

  updateMatches = () =>
    this.setState({ matches: this.mediaQueryList.matches })

  render () {
    const { children, render } = this.props;
    const { matches } = this.state;

    if (!children || !children.length) {
      return null;
    }

    if (matches && render) {
      return render();
    }

    if (typeof children[0] === 'function') {
      return children[0](matches);
    }

    return matches ? children[0] : null;
  }
}

export default Media;
