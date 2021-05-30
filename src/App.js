import { Provider } from 'react-redux';
import store from './store';
import Router from './routers';
import "./App.scss"
const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

export default App;
