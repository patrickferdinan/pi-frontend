import React from 'react';
import './global.css';

//https://codeseven.github.io/toastr/
//https://codeseven.github.io/toastr/demo.html
import 'bootswatch/dist/flatly/bootstrap.css'
import 'toastr/build/toastr.min.js'
import 'toastr/build/toastr.css'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Routes from './routes';

function App() {
  return (
    <Routes />
  );
}

export default App;
