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

        // adds alert if input is empty
        if (this.state.text === "") {
            this.props.setAlert("Please enter a query", "light");
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: "" }); //resets search back to blank
        }
    };

    render() {
        const { showClear, clearUsers } = this.props;

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

                {showClear && (
                    //if showClear is true show the button, else don't
                    <button
                        className='btn btn-light btn-block'
                        onClick={clearUsers}
                    >
                        Clear
                    </button>
                )}
            </div>
        );
    }
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
};

export default Search;
