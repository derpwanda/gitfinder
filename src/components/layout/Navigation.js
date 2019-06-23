import React from "react";
import PropTypes from "prop-types";

const Navigation = ({ icon, title }) => {
    return (
        <nav className='navbar bg-primary'>
            <h1>
                <i className={icon} /> {title}
            </h1>
        </nav>
    );
};

Navigation.defaultProps = {
    title: "Github Finder dP",
    icon: "fas fa-angle-double-right"
};

Navigation.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default Navigation;
