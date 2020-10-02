import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootreducer from './reducer/rootreducer';
export default function configureStore(initialState={}) {
 return createStore(
   rootreducer,
   applyMiddleware(thunk)
 );
}