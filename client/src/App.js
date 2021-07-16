
import './App.css';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Details from './components/Details';
import Welcome from './components/Welcome';
import Otp from './components/Otp'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
         <Router>
                <Switch>
                    <Route path="/" exact component={Signin} />
                    <Route path="/register" component={Signup} />
                    <Route path="/details" component={Details} />
                    <Route path="/otp" component={Otp} />
                    <Route path="/Welcome" component={Welcome} />
                </Switch>
            </Router>
    </div>
  );
}

export default App;
