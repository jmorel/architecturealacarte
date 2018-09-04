import React from 'react';

import './Sidebar.css';

export function Sidebar({ children }) {
    return (
        <div className="Sidebar">
            {children}
        </div>
    )
}