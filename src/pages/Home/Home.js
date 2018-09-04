import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import TableOfContents from './components/TableOfContents';
import { Footer } from '../../components/Footer';
import { HomeHeader } from '../../components/Header';
import { Link } from 'react-router-dom';

import './Home.css';
import 'leaflet/dist/leaflet.css';

class Home extends Component {
  render() {
    return (
      <div className="HomeLayout">
        <div className="HomeLayout-sidebar">
          <HomeHeader title="Architecture a la carte" />
          <div className="Sidebar-content">
            <p><Link to="/">Architecture à la Carte</Link> est un catalogue interactif, un outil de découverte du patrimoine architectural français. Convivial et ludique, ce n'est pas une alternative aux listes exhaustives des Monuments Nationaux et Monuments historiques mais plutôt un compagnon à ces bases de données austères.</p>
            <p>Ce site est compatible avec tous les appareils mobiles, n'hésitez pas à l'utiliser pendant vos balades !</p>
            <p>Le projet vous plait ? Vous voulez y participer ? Vous voulez documenter l'architecture moderne et contemporaine dans votre région ?</p>
            <p><a href="mailto:contact@architecturealacarte.fr">Ecrivez nous!</a></p>
          </div>
          <Footer />
        </div>
        <div className="HomeLayout-main">
            <div className="HomeLayout-mapContainer">
                <Map center={[46.596170, 2.387703]} zoom={6}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                </Map>
            </div>
          <TableOfContents></TableOfContents>
        </div>
      </div>
    );
  }
}

export default Home;
