import 'promise-polyfill';
import 'whatwg-fetch';
import { h, render } from 'preact';
import App from './app';

// require('preact/devtools');

render(<App />, document.body, document.getElementById('root'));
