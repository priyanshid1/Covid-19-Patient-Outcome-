import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';  // Optional: Add custom styling if needed
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return <h1>Hello, this is a test!</h1>;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);