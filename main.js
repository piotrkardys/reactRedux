import { createStore } from 'redux';

const counter = (state = 0, action) => {			//function to increment/decrement the state
	switch (action.type) {
		case 'INCREMENT': return state + 1;
		case 'DECREMENT': return state - 1;
		default: return state;
	}
}

const store = createStore(counter);					//redux's store
//const render = () => {
//	document.body.innerText = store.getState();
//};

//store.subscribe(render);
//render();


console.log(store.getState());						//returns state

store.dispatch( { type: 'INCREMENT'});				//updates state (calls specific actions)
console.log(store.getState());

store.subscribe(() => {								//method is called every time when sth on the page change (after dispatch method)
	document.body.innerText = store.getState();
});

document.addEventListener('click', () => {			//if there is click on the page do something (INCREMENT in that case)
	store.dispatch({ type: 'INCREMENT'});
});