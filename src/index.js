import React from 'react';
import ReactDOM from 'react-dom';
import * as styles from 'styles/index.less';
import { AppContainer } from './containers/app/app';

const reactAppSelector = document.querySelector('.react-app');
ReactDOM.render(<AppContainer />, reactAppSelector);
