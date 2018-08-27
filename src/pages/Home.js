import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import TableOfContents from '../TableOfContents';
import Footer from '../components/Footer';
import Header from '../components/Header';

import './Home.css';
import 'leaflet/dist/leaflet.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Sidebar">
          <Header title="Architecture a la carte"/>
          <div className="Sidebar-content">
            <p>Architecture à la Carte est un catalogue interactif, un outil de découverte du patrimoine architectural français. Convivial et ludique, ce n'est pas une alternative aux listes exhaustives des Monuments Nationaux et Monuments historiques mais plutôt un compagnon à ces bases de données austères.</p>
            <p>Ce site est compatible avec tous les appareils mobiles, n'hésitez pas à l'utiliser pendant vos balades !</p>
            <p>Le projet vous plait ? Vous voulez y participer ? Vous voulez documenter l'architecture moderne et contemporaine dans votre région ?</p>
            <p><a href="">Ecrivez nous!</a></p>
          </div>
          <Footer/>
        </div>
        <main>
          <Map center={[51.505, -0.09]} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
          </Map>
          <TableOfContents></TableOfContents>
        </main>
      </div>
    );
  }
}

export default Home;
