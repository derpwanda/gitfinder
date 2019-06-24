import React, { Component } from "react";
import Navigation from "./components/layout/Navigation";
import Users from "./components/users/Users";
import axios from "axios";
import "./App.css";

class App extends Component {
    state = {
        users: [],
        loading: false
    };
    async componentDidMount() {
        this.setState({ loading: true });

        const res = await axios.get("https://api.github.com/users");

        //after the response/res
        this.setState({ users: res.data, loading: false });

        console.log(res.data);
    }

    render() {
        return (
            <div className='App'>
                <Navigation title='Github Finder' icon='fab fa-github' />
                <div className='container'>
                    <Users
                        loading={this.state.loading}
                        users={this.state.users}
                    />
                </div>
            </div>
        );
    }
}

export default App;
