import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';

import Footer from '../components/Footer';
import Header from '../components/Header';
import PaginatedCardList from '../components/PaginatedCardList';

import { buildImageIcon, buildSimpleIcon } from '../utils';

import './EteArchiList.css';
import '../components/Header.css';
import 'leaflet/dist/leaflet.css';


class EteArchiList extends Component {
    state = {
        records: []
    }

    componentDidMount() {
        axios
            .get('https://jmorel.opendatasoft.com/api/v2/catalog/datasets/ete-archi/exports/json')
            .then(res => {
                const records = res.data.map(record => ({
                    ...record,
                    imageIcon: buildImageIcon(record),
                    simpleIcon: buildSimpleIcon(record),
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
                                icon={record.imageIcon}
                                onClick={this.navigateToRecord(record)} />
                        )}
                    </Map>
                </main>
            </div>
        )
    }
}

export default EteArchiList;