import { h, Component } from 'preact';
import cx from 'classnames';
import debounce from 'lodash.debounce';
import style from './index.entry.scss';

export default class Player extends Component {
  constructor (props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
      dead: false,
      still: false
    };
  }

  componentWillMount () {
    if (typeof window !== 'undefined') {
      const width = window && Math.floor(window.innerWidth);
      this.setState({ width: window && window.innerWidth, height: (9 * width) / 16 });
    }
  }

  componentDidMount () {
    this.debouncedResize = debounce(this.onResize, 200);
    window.addEventListener('resize', this.debouncedResize);
    this.video.addEventListener('ended', this.onEnd);
    this.video.addEventListener('playing', this.onStart);
    this.video.addEventListener('timeupdate', this.onProgress);
    this.video.addEventListener('error', this.onError);
    this.video.addEventListener('canplaythrough', this.onCanPlayThrough);
  }

  componentDidUpdate (prevProps) {
    if (this.props.videoObj !== prevProps.videoObj) {
      this.load();
    }
    if (this.props.isPlaying === true && prevProps.isPlaying === false) {
      this.tryPlayVideo();
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.debouncedResize);
    this.video.removeEventListener('ended', this.onEnd);
    this.video.removeEventListener('playing', this.onStart);
    this.video.removeEventListener('timeupdate', this.onProgress);
    this.video.removeEventListener('error', this.onError);
    this.video.removeEventListener('canplaythrough', this.onCanPlayThrough);
  }

  onResize = () => {
    this.setState(
      { width: this.video.clientWidth, height: this.video.clientHeight },
      this.generateStill
    );
  }

  onStart = () => {
    this.setState({ still: false });
    this.props.onStart();
  }

  onProgress = () => {
    const currentTime = this.video.currentTime;
    if (!this.state.dead) {
      if (this.prevTime === currentTime) {
        this.video.play();
      }
      if (currentTime.toPrecision(2) >= this.props.videoObj.die) {
        this.setState({ dead: true });
      }
    }
    if (this.props.videoObj.end) {
      if (currentTime.toPrecision(2) >= this.props.videoObj.end) {
        this.video.pause();
        this.onEnd();
      }
    }
    this.prevTime = this.video.currentTime;
  }

  onEnd = () => {
  /*  this.setState({ dead: true }, () => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(this.onEndSequence, 1500);
    });*/
    this.props.onEnd();
    this.onEndSequence();
  }

  onError = () => {
    this.props.onError(this.video.networkState);
  };

  onCanPlayThrough = () => {
    if (this.props.isPlaying && this.props.loading) {
      this.playVideo();
    }
  }

  onEndSequence = () => {
    this.setState({ still: true }, this.generateStill);
    this.props.onEndSequence();
  }

  load = () => {
    this.video.load();
    const start = this.props.videoObj.start;
    if (start) {
      this.video.currentTime = start;
    }
  }

  tryPlayVideo = () => {
    this.setState({ dead: false });
    this.props.onLoadingStart();
    if (!this.props.isFirst) {
      this.props.queueNextVideo();
    } else if (this.video.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA) {
      this.playVideo();
    }
    return false;
  }

  playVideo = () => {
    const start = this.props.videoObj.start;
    if (this.video.currentTime <= start) {
      this.video.currentTime = start || 0;
    }
    this.video.play();
  }

  generateStill = () => {
    if (this.state.still) {
      const { width, height } = this.state;
      // generate thumbnail URL data
      const context = this.canvas.getContext('2d');
      context.drawImage(this.video, 0, 0, width, height);
    }
  }

  render = ({ children, videoObj }) => (
    <div class={cx(style.player, this.state.dead && style.dead, this.state.still && style.still)}>
      <canvas
        ref={c => { this.canvas = c; }}
        width={this.state.width}
        height={this.state.height}
      />
      <video
        ref={v => {
          this.video = v;
        }} muted preload="metadata"
      >
        {videoObj && videoObj.urls.map((src, i) =>
          <source
            key={src}
            onError={(i + 1) === videoObj.urls.length && this.onError}
            src={src}
          />)}
      </video>
      <div class={style.overlay} />
      <div class={style.youDied}>
        <div class={style.bg} />
        <img role="presentation" src="/cdn/you-died.png" />
      </div>
      {children}
    </div>
  );
}
