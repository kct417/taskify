import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './HomePage.jsx';
// import App from './App.jsx';
import Sidebar from './Sidebar.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HomePage />
		<Sidebar />
	</React.StrictMode>,
);
