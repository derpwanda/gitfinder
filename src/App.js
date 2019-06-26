import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

class App extends Component {
    state = {
        users: [],
        user: {},
        loading: false,
        alert: null,
        repos: []
    };

    searchUsers = async text => {
        this.setState({ loading: true }); //spinner

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${
                process.env.REACT_APP_GH_C_ID
            }&client_secret=${process.env.REACT_APP_GH_C_SECRET}`
        );

        //after the response/res
        this.setState({ users: res.data.items, loading: false });

        console.log(res.data);
    };

    // get user repos
    getUserRepos = async username => {
        this.setState({ loading: true }); //spinner

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
                process.env.REACT_APP_GH_C_ID
            }&client_secret=${process.env.REACT_APP_GH_C_SECRET}`
        );

        //after the response/res
        this.setState({ repos: res.data, loading: false });

        console.log(res.data);
    };

    //get a single user
    getUser = async username => {
        this.setState({ loading: true }); //spinner

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${
                process.env.REACT_APP_GH_C_ID
            }&client_secret=${process.env.REACT_APP_GH_C_SECRET}`
        );

        //after the response/res
        this.setState({ user: res.data, loading: false });

        console.log(res.data);
    };

    //clears users in the UI
    clearUsers = () => {
        this.setState({ users: [], loading: false });
    };

    setAlert = (msg, type) => {
        this.setState({ alert: { msg: msg, type: type } });

        //after alert fires it will disappear after 5 seconds/ 5000 ms
        setTimeout(() => this.setState({ alert: null }), 5000);
    };

    render() {
        const { users, user, loading, repos } = this.state;
        return (
            <Router>
                <div className='App'>
                    <Navigation title='Github Finder' icon='fab fa-github' />
                    <div className='container'>
                        <Alert alert={this.state.alert} />
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={props => (
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={
                                                users.length > 0 ? true : false
                                            }
                                            setAlert={this.setAlert}
                                        />
                                        <Users
                                            loading={loading}
                                            users={users}
                                        />
                                    </Fragment>
                                )}
                            />
                            <Route exact path='/about' component={About} />
                            <Route
                                exact
                                path='/user/:login'
                                render={props => (
                                    <User
                                        {...props}
                                        getUser={this.getUser}
                                        getUserRepos={this.getUserRepos}
                                        user={user}
                                        repos={repos}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
