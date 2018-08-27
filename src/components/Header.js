import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className="Header">
                {this.props.homeLink && 
                    <div>
                        <Link to={'/'}>Architecture à la carte</Link>
                    </div>
                }
                <h1>{this.props.title}</h1>
            </header>
        )
    }
}

export default Header;