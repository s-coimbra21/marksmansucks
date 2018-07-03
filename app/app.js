import { h, Component } from 'preact';
import cx from 'classnames';
import style from './index.entry.scss';
import './normalize.css';

import Button from './Button';
import Player from './Player';
import Content from './Content';
import Articles from './Articles';
import ChampionList from './ChampionList';
import ClipInfo from './ClipInfo';
import Share from './Share';

/* eslint-disable */
function shuffle (a) {
  for (let i = a.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}
/*eslint-enable */

const videos = [
  {
    urls: ['https://d0playscdntv-a.akamaihd.net/video/GXz8YqJZKSB/processed/720.mp4'],
    hostedBy: 'Plays.tv',
    original: 'https://plays.tv/video/584a05f3906d3d4969/when-syndra-decides-you-dont-get-play-league-legends',
    die: 5
  }
];

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      idx: 0,
      videoIdx: 0,
      isFirst: true,
      isPlaying: false,
      loading: false,
      championsTab: false,
      loadChampionsTab: false
    };
  }

  componentDidMount () {
    this.fetchVideos(0);
  }

  fetchVideos (idx) {
    fetch(`/marksmansucks/videos_${idx}.json`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(res => {
        const newVids = res.videos;
        shuffle(newVids);
        newVids.forEach(v => videos.push(v));
        this.setState({ idx: this.state.idx + 1 });
        return videos;
      })
      .catch(e => {
        console.error('Could not fetch new videos', e);
      });
  }

  handleLoadingStart = () => this.setState({ loading: true });
  handleStart = () => this.setState({ loading: false, isFirst: false, championsTab: false });
  handleEnd = () => this.setState({ isFirst: false });
  handleError = networkState => {
    if (networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
      this.nextVideo();
    }
  };
  handleEndSequence = () => {
    this.setState({ isPlaying: false });
//    this.nextVideo();
  };

  nextVideo = cb => {
    let nextIdx = this.state.videoIdx + 1;
    if (nextIdx >= videos.length) {
      nextIdx = 0;
    }
    if (nextIdx + 1 === videos.length) {
      this.fetchVideos(this.state.idx);
    }
    this.setState({
      videoIdx: nextIdx
    }, cb);
  }

  startPlaying = () => {
    this.setState({ isPlaying: true });
    return false;
  }

  openChampions = () => this.setState({ championsTab: !this.state.championsTab, loadChampionsTab: true });

  render = () => {
    const { isFirst, isPlaying, loading, videoIdx } = this.state;
    const videoObj = videos[videoIdx];
    const hideContent = isFirst || isPlaying;
    return (
      <section id="root" class={style.app}>
        <div class={cx(style.mainContainer, hideContent && style.playing)}>
          <Player
            videoObj={videoObj}
            isPlaying={this.state.isPlaying}
            queueNextVideo={this.nextVideo}
            onLoadingStart={this.handleLoadingStart}
            onStart={this.handleStart}
            onEnd={this.handleEnd}
            onEndSequence={this.handleEndSequence}
            onError={this.handleError}
            loading={this.state.loading}
            isFirst={this.state.isFirst}
          />
          <div class={cx(style.buttonWrapper, style.start)} style={{ display: isFirst ? 'flex' : 'none' }}>
            <Button onClick={this.startPlaying} disabled={loading}>{loading ? 'Loading...' : 'Experience ADC'}</Button>
          </div>
          <div class={style.championsButtonWrapper} style={{ display: hideContent ? 'none' : 'flex' }}>
            <Button onClick={this.openChampions} disabled={loading}>Free Champions</Button>
          </div>
          <ClipInfo {...videoObj} />
          {!isFirst && <Content startPlaying={this.startPlaying} loading={loading} />}
          {!isFirst && <Articles canLoad={!isFirst} noModal={isPlaying} />}
        </div>
        <div class={style.championListWrapper}>
          {!isFirst && <ChampionList isOpen={this.state.championsTab} load={this.state.loadChampionsTab} />}
        </div>
        <Share className={style.share} />
      </section>
    );
  }
}
