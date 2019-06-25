import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
    state = {
        text: ""
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.searchUsers(this.state.text);
        this.setState({ text: "" }); //resets search back to blank
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className='form'>
                    <input
                        type='text'
                        name='text'
                        placeholder='find user...'
                        value={this.state.text}
                        onChange={this.onChange}
                    />
                    <input
                        type='submit'
                        value='Search'
                        className='btn btn-dark btn-block'
                    />
                </form>
            </div>
        );
    }
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired
};

export default Search;
