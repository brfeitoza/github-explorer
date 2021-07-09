import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Repository } from '../pages/Repository';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/repositories/:repository+" component={Repository} />
    </Switch>
  </Router>
);

export default Routes;
