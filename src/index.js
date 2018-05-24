import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './containers/Root';
import configureStore from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

ReactDOM.render(<Root store={store}></Root>, document.getElementById('root'));
registerServiceWorker();
