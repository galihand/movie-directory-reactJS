import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store