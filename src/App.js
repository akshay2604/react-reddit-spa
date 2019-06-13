import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {storeInst} from './redux/store';
import ContainerNav from './ContainerNav';

class App extends Component {
  constructor (props) {
    super (props);
    this.config = storeInst;
  }
  render () {
    return (
      <Provider store={this.config.store}>
        <PersistGate loading={null} persistor={this.config.persistor}>
          <ContainerNav />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
