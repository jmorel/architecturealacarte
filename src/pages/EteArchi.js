import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';

import Footer from '../components/Footer';
import Header from '../components/Header';
import PaginatedCardList from '../components/PaginatedCardList';

import './EteArchi.css';
import '../components/Header.css';
import 'leaflet/dist/leaflet.css';

const buildIcon = function (record) {
    const iconRadius = 50;
    const ratio = Math.max(record.image.width / iconRadius, record.image.height / iconRadius);
    const iconHeight = record.image.height / ratio;
    const iconWidth = record.image.width / ratio;
    return L.icon({
        iconUrl: `https://jmorel.opendatasoft.com/explore/dataset/ete-archi/files/${record.image.id}/300`,
        iconSize:     [iconWidth, iconHeight],
        iconAnchor:   [iconWidth/2, iconHeight/2],
    })
};

class EteArchi extends Component {
    state = {
        records: []
    }

    componentDidMount() {
        axios
            .get('https://jmorel.opendatasoft.com/api/v2/catalog/datasets/ete-archi/exports/json')
            .then(res => {
                const records = res.data.map(record => ({
                    ...record,
                    icon: buildIcon(record),
                }))
                this.setState({ records: records });
            })
    }

    navigateToRecord(record) {
        return () => {
            this.props.history.push(`/ete-archi/${record.date}`);
        }
    }

    render() {
        return (
            <div className="EteArchi">
                <div className="Sidebar">
                    <Header title="L'ete archi de David Abittan" homeLink={true} />
                    <div className="Sidebar-content">
                        <p>
                            Durant l’été, <a href="">David Abittan</a> nous emmène chaque semaine sur <a href="">France Inter</a> à la découverte de toutes les époques de l’architecture de France.
                        </p>
                        <PaginatedCardList items={this.state.records}></PaginatedCardList>
                    </div>
                    <Footer />
                </div>
                <main>
                    <Map center={[51.505, -0.09]} zoom={7}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        {this.state.records.filter(record => record.coordonnees).map(record =>
                            <Marker key={record.date}
                                    position={record.coordonnees}
                                    icon={record.icon}
                                    onClick={this.navigateToRecord(record)}/>
                        )}
                    </Map>
                </main>
            </div>
        )
    }
}

export default EteArchi;