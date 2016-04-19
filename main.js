/* LESSON 1 - 8 */ /*
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
*/


/* LESSON 9 */ /*
const addCounter = (list) => {							//adds counter
	//return list.concat([0]);							//both ways are good
  	return [...list, 0];
};

const removeCounter = (list, index) => {				//removes counter
  //return list.slice(0, index).concat(list.slice(index + 1));
  return [...list.slice(0, index),
    	  ...list.slice(index + 1)
  ];
};

const incrementCounter = (list, index) => {				//increments specific number in list
	//return list.slice(0, index).concat([list[index] + 1]).concat(list.slice(index+1));
  	return [...list.slice(0, index),
           	   list[index] + 1,
    	  	...list.slice(index + 1)
  ];
};

const testAddCounter = () => {							//test for each function
  const listBefore = [];
  const listAfter = [0];
  
  deepFreeze(listBefore);								//makes that the list cannot change, unable to update (is frozen)
  expect(addCounter(listBefore)).toEqual(listAfter);
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];
  
  deepFreeze(listBefore);
  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};

const testIncrementCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];
  
  deepFreeze(listBefore);
  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();

console.log('All tests passed.');
*/

/* LESSON 10 */ /*
const toggleToDo = (todo) => {										//change the 'completed' field
	//return {														//both ways are correct
	//	id: todo.id,
	//	text: todo.text,
	//	completed: !todo.completed
	//};
	return Object.assign({}, todo, { completed: !todo.completed });//assign - adds fields to the new object by copying (thats why as a first argument we passed empty object - we create new object),
																   //second argument is the object which we want to copy, and the third is which field should be added/modified
};

const testToggleToDo = () => {
	const todoBefore = {
		id: 0,
		text: 'React Redux',
		completed: false
	};
	const todoAfter = {
		id: 0,
		text: 'React Redux',
		completed: true
	};

	deepFreeze(todoBefore);

	expect(toggleToDo(todoBefore)).toEqual(todoAfter);
};

testToggleToDo();
console.log('All tests passed!');
*/

/* LESSON 11 - 13*/ /*
const todo = (state, action) => {								//R E D U C E R ! (of single object in the todos array)
	switch (action.type) {
		case 'ADD_TODO': return { id: action.id, text: action.text, completed: false };
		case 'TOGGLE_TODO': 
			if (state.id !== action.id) return state;		//if state id isn't equal to action id do nothing with element
			return Object.assign({}, state, { completed: !state.completed }); //otherwise update field 'completed'
		default: return state;
	};
};

const todos = (state = [], action) => {							// R E D U C E R ! (of the array of todos - updates application's state)
	switch (action.type) {
		case 'ADD_TODO':
			return [...state, todo(undefined, action)];			//we are adding new object to the array (list) (equivalent to .concat method)
		case 'TOGGLE_TODO':
			return state.map(t => todo(t, action));				//mappig - forEach 't' do something
		default:
			return state;
	}
};

const testAddTodo = () => {
	const stateBefore = [];
	const action = {
		type: 'ADD_TODO', id: 0, text: 'React Redux'
	};
	const stateAfter = [
		{ id: 0, text: 'React Redux', completed: false}
	];

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
	const stateBefore = [
		{ id: 0, text: 'React Redux', completed: false },
		{ id: 1, text: 'Go shopping', completed: false }
	];
	const action = {
		type: 'TOGGLE_TODO', id: 1
	};
	const stateAfter = [
		{ id: 0, text: 'React Redux', completed: false },
		{ id: 1, text: 'Go shopping', completed: true }
	];

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
console.log('All tests passed!');
*/

/* LESSON 14 */
import { createStore } from 'redux';

const todo = (state, action) => {								
	switch (action.type) {
		case 'ADD_TODO': return { id: action.id, text: action.text, completed: false };

		case 'TOGGLE_TODO': 
			if (state.id !== action.id) return state;		
			return Object.assign({}, state, { completed: !state.completed });

		default: return state;
	};
};

const todos = (state = [], action) => {
	switch (action.type) {
		case 'ADD_TODO': return [...state, todo(undefined, action)];

		case 'TOGGLE_TODO': return state.map(t => todo(t, action));

		default: return state;
	}
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
	switch(action.type) {
		case 'SET_VISIBILITY_FILTER': return action.filter;
		default: return state;
	};
};

const todoApp = (state = {}, action) => {									//root of the REDUCER's tree
	return {
		todos: todos(state.todos, action),									//calls todos REDUCER
		visibilityFilter: visibilityFilter(state.visibilityFilter, action)	//calls visibilityFilter REDUCER
	};
};

const store = createStore(todoApp);

console.log('INITIAL STATE:');
console.log(store.getState());
console.log('= = = = = = = =');

console.log('DISPATCHING ADD_TODO..');
store.dispatch({ type: 'ADD_TODO', id: 0, text: 'React Redux' });
console.log('= = = = = = = = = = = =');

console.log('CURRENT STATE:');
console.log(store.getState());
console.log('= = = = = = = =');

console.log('X X X X X X X X X');

console.log('DISPATCHING ADD_TODO..');
store.dispatch({ type: 'ADD_TODO', id: 1, text: 'Go shopping' });
console.log('= = = = = = = = = = = =');

console.log('CURRENT STATE:');
console.log(store.getState());
console.log('= = = = = = = =');

console.log('X X X X X X X X X');

console.log('DISPATCHING TOGGLE_TODO..');
store.dispatch({ type: 'TOGGLE_TODO', id: 0 });
console.log('= = = = = = = = = = = =');

console.log('CURRENT STATE:');
console.log(store.getState());
console.log('= = = = = = = =');

console.log('X X X X X X X X X');

console.log('DISPATCHING SET_VISIBILIRT_FILTER..');
store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED' });
console.log('= = = = = = = = = = = =');

console.log('CURRENT STATE:');
console.log(store.getState());
console.log('= = = = = = = =');