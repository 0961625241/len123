import logo from './logo.svg';
import './App.css';
import WalletCard from "./components/WalletCard/WalletCard";
import Swap from "./components/Swap/Swap";
import Swap2token from "./components/Swap2token/Swap2token";
import SwapExactETHForTokens from "./components/SwapExactETHForTokens/SwapExactETHForTokens"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
  
      <Router>
          <Switch>
            <Route exact path="/" component={WalletCard} />
            <Route exact path="/swap" component={Swap} />
            <Route exact path="/swap2token" component={Swap2token} />
            <Route exact path="/swapExactETHForTokens" component={SwapExactETHForTokens} />
          </Switch>
        </Router>
    </div> 
  );
}

export default App;
