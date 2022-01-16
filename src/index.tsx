import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { reducer, StateProvider } from './state';
import './styles/index.css';

const rootElement = document.getElementById('root');
render(
	<StateProvider reducer={reducer}>
		<App />
	</StateProvider>, rootElement
);
