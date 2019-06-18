import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NameForm from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<NameForm />, document.getElementById('GitFollowers'));

serviceWorker.unregister();
