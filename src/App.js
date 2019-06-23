import React, { Component } from "react";
import Navigation from "./components/layout/Navigation";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Navigation title='Github Finder' icon='fab fa-github' />
            </div>
        );
    }
}

export default App;
