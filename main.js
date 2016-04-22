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

/* LESSON 14 - 16 */ /*
import { createStore } from 'redux';
//import { combineReducers } from 'redux';

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

const combineReducers = (reducers) => {					//combineReducers from scratch
	return (state = {}, action) => {					//returns other function - proper reducer
		return Object.keys(reducers).reduce(			//returns the object which
				(nextState, key) => {					//consists the nextState of each 'todoApp' field
					nextState[key] = reducers[key](state[key], action); //calculations of the nextState
					return nextState;					//returns the nextState (part of the forEach loop)
				},
				{}
			);
	};
};

const todoApp = combineReducers({todos, visibilityFilter});					//does exactly the same as under 

//const todoApp = (state = {}, action) => {									//root of the REDUCER's tree
//	return {
//		todos: todos(state.todos, action),									//calls todos REDUCER
//		visibilityFilter: visibilityFilter(state.visibilityFilter, action)	//calls visibilityFilter REDUCER
//	};
//};

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
console.log('= = = = = = = = = = =a =');

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
*/

/* LESSON 17 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

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

const todoApp = combineReducers({todos, visibilityFilter});
const store = createStore(todoApp);

const FilterLink = ({filter, children, currentFilter, onClick}) => {		//children property is sign of which element calls that function (what's between the HTML marks of that element)
	if (filter === currentFilter) {								//if the "new filter" is the current one - dont show it as a link
		return <span>{children}</span>							//and do nothing 
	}
	//
	return (													//otherwise create new list of todos (with chosen filter)
		<a href="#" onClick={e => {
			e.preventDefault();
			onClick(filter);
		}}>
			{children}
		</a>
	);
	
};
//
const Footer = ({visibilityFilter, onFilterClick}) => {			//visualization of the filters (Show: All, Active, Completed)
	return (
		<div>
			<p>Show: 
				{' '}
				<FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}>ALL, </FilterLink>
				{' '}
				<FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter} onClick={onFilterClick}>ACTIVE, </FilterLink>
				{' '}
				<FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>COMPLETED</FilterLink>
			</p>
		</div>
	);
};
//
const Todo = ({onClick, completed, text}) => {					//visualization of a single task
	return (
		<li onClick={onClick} style={{textDecoration: completed ? 'line-through' : 'none'}}> 
				{text} 
		</li>
	);
};
//
const TodoList = ({todos, onTodoClick}) => {					//visualization of 'todos' list
	return (
		<ul>
			{todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}
		</ul>
	);
};

const AddTodo =({onAddClick}) => {								//visualization of the AddTodo panel (input + button)
	let input;

	return (
		<div>
			<input ref={node => { input = node}} />

			<button onClick={() => {
				onAddClick(input.value);
				input.value = '';
			}}>
				Add Todo
			</button>
		</div>
	);
};
//

const getVisibleTodos = (todos, filter) => {			//returns the list (array) of the 'todos' which are selected (it depends on the filter)
	switch(filter) {
		case 'SHOW_ALL': return todos;

		case 'SHOW_ACTIVE': return todos.filter(t => !t.completed);

		case 'SHOW_COMPLETED': return todos.filter(t => t.completed);
	}
};

let nextTodoId = 0;											//index of the element in the todos list
//class TodoApp extends React.Component {					//TodoApp doesn't need to be a class any more - it can be a function
const TodoApp = ({todos, visibilityFilter}) => (
//	render() {		//renders input field, button and the list of tasks (todos list; input ref has to be set that way); in the <li> we need to set the key value


//		const visibleTodos = getVisibleTodos(todos, visibilityFilter);		//gets array of current visible 'todos' (depends on chosen filter)

			<div>
				<AddTodo onAddClick={ text => {
				store.dispatch({ type: 'ADD_TODO', text, id: nextTodoId++ });
			}} />

				<TodoList todos={getVisibleTodos(todos, visibilityFilter)} onTodoClick={id => {
					store.dispatch({ type: 'TOGGLE_TODO', id });
				}} />

				<Footer visibilityFilter={visibilityFilter} onFilterClick={filter => {
					store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter });
				}} />

			</div>
//	}
);

const render = () => {						//renders components on the page
	ReactDOM.render(<TodoApp {...store.getState()}/>, document.getElementById('root'));	//giver all store agruments as a props
};
//
store.subscribe(render);					//shows the components (calls the render function)
render();
