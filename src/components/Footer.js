import React, {Component} from 'react';
import './Footer.css';

class Footer extends Component {
    render() {
        return (
          <footer className="Footer">
            <p>Architecture à la carte est un projet de <a href="">Gabrielle Desnoyers</a> et <a href="">Jérémy Morel</a> rendu possible par la plateforme <a href="">OpenDataSoft</a>.</p>
            <p>La conception du projet et sa réalisation sont détaillées dans <a href="">un article de blog</a>.</p>
            <p>L'intégralité du code est open-source et disponible sur <a href="">GitHub</a></p>
          </footer>
        )
    }
}

export default Footer;