import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path ='/' component={Landing} />
        <Redirect from='*' to ='/' />
      </Switch>
    </Router>
  );
}

export default App;
