import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import ComparePage from './pages/ComparePage'

import Analysis from './components/Analysis'
import About from './components/About'

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <BrowserRouter>
                    <Route path="/" exact={true} component={HomePage} />
                    <Route path="/explore/:location" component={ExplorePage} />
                    <Route path="/compare" component={ComparePage} />
                </BrowserRouter>
                <Analysis />
				<About />
            </div>
        );
    }
}

export default App;
