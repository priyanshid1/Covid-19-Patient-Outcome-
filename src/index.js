import React from 'react';
import ReactDOM from 'react-dom/client'; // Notice the change to `react-dom/client`
import App from './App';
import './index.css';  // Optional: Add custom styling if needed
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);