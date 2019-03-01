import React, { Component } from 'react';
import AppLogo from './AppLogo'
import MenuGlobal from './MenuGlobal'
import AppWindow from './AppWindow'
import 'bootstrap'

class App extends Component {
  render() {
    return (
      <div className="App">

          <AppLogo />
          <MenuGlobal />
          <AppWindow />

      </div>
    );
  }
}

export default App;
