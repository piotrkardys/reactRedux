import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';

//const createStore = (reducer) => {
//	let state;
//	let listeners = [];								
//
//	const getState = () => state;									//returns actual state
//
//	const dispatch = (action) => {									//updates state and calls each listener in the array
//		state = reducer(state, action);
//		listeners.forEach(listener => listener());
//	};
//
//	const subscribe = (listener) => {								//adds listeners to the array and filters them
//		listeners.push(listener);
//		return () => {
//			listeners = listeners.filter(l => l !== listener);
//		};
//	};
//
//	dispatch({});													//returns function to the primary state
//
//	return { getState, dispatch, subscribe };
//};

const counter = (state = 0, action) => {			//function to increment/decrement the state
	switch (action.type) {
		case 'INCREMENT': return state + 1;
		case 'DECREMENT': return state - 1;
		default: return state;
	}
}

const store = createStore(counter);					//(redux's store)ours store

const Counter = (props) => (						//main page (counter block)
	<div>
		<h1>{props.value}</h1>
		<button onClick={props.onIncrement}>+</button>
		<button onClick={props.onDecrement}>-</button>
	</div>

);

const render = () => {								//shows the block (render the Counter with proper parameters)
//	document.body.innerText = store.getState();
	ReactDOM.render(<Counter 
		value={store.getState()}
		onIncrement = {() => store.dispatch({type: 'INCREMENT'})}
		onDecrement = {() => store.dispatch({type: 'DECREMENT'})} />, document.getElementById('root'));
};

store.subscribe(render);
render();


//console.log(store.getState());						//returns state

//store.dispatch( { type: 'INCREMENT'});				//updates state (calls specific actions)
//console.log(store.getState());

//store.subscribe(() => {								//method is called every time when sth on the page change (after dispatch method)
//	document.body.innerText = store.getState();
//});

//document.addEventListener('click', () => {			//if there is click on the page do something (INCREMENT in that case)
//	store.dispatch({ type: 'INCREMENT'});
//});