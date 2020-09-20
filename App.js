/* eslint-disable prettier/prettier */
import React, { PureComponent } from 'react';
import MainAppContainer from './src/container/MainAppContainer';
import { Provider } from 'react-redux';
import store from './src/reducers';
export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <MainAppContainer />
      </Provider>
    );
  }
}

