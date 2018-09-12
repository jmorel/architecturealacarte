import React from 'react';
import PropTypes from 'prop-types';

import './Sidebar.css';

export const Sidebar = ({ children }) => (
    <div className="Sidebar">
        {children}
    </div>
);

Sidebar.propTypes = {
    children: PropTypes.element.isRequired,
};
