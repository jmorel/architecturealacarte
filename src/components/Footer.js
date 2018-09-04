import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {Link} from 'react-router-dom';
import './Footer.css';

library.add(faGithub)

export class Footer extends Component {
    render() {
        return (
          <footer className="Footer">
            <p><Link to="/">Architecture à la carte</Link> est un projet de <a href="http://gabrielledesnoyers.com/">Gabrielle Desnoyers</a> et <a href="http://hexagonal.io/">Jérémy Morel</a>.</p>
            <p>L'intégralité du code est open-source et disponible sur <a href="http://github.com/jmorel/architecturealacarte"><FontAwesomeIcon icon={faGithub} /> GitHub</a></p>
          </footer>
        )
    }
}