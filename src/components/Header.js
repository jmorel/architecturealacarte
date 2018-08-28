import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'

import './Header.css';

library.add(faArrowAltCircleLeft);

class Header extends Component {
    render() {
        return (
            <header className="Header">
                {this.props.homeLink &&
                    <div>
                        <Link to={'/'}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft}/>
                            Architecture à la carte
                        </Link>
                    </div>
                }
                <h1>{this.props.title}</h1>
            </header>
        )
    }
}

export default Header;