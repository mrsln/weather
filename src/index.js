import React      from 'react';
import { render } from 'react-dom';
import App        from './App';

const tiles = [
	{
		city: 'Perm'
	},
	{
		city: 'Auckland'
	}
];

render(<App tiles={tiles} />, document.getElementById('root'));
