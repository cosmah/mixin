import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import './index.css';
import Modal from 'react-modal';


// Create a root container where your app will be mounted
const root = createRoot(document.getElementById('root'));
Modal.setAppElement('#root');


root.render(
 <React.StrictMode>
    <App />
 </React.StrictMode>
);