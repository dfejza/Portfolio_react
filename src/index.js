import React from 'react';
import ReactDOM from 'react-dom';
import App from './scenes/App';
import registerServiceWorker from './registerServiceWorker';

// Routers
import { BrowserRouter } from 'react-router-dom'

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducers'

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App 
                changeEng={() => store.dispatch({ type: 'SET_LANG' , payload: 0})}
                changeJap={() => store.dispatch({ type: 'SET_LANG' , payload: 1})}
            />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
  
registerServiceWorker();
