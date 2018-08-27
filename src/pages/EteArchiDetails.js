import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';

import { buildImageIcon, buildSimpleIcon } from '../utils';

class EteArchiDetails extends React.Component {
    state = {
        records: [],
        currentRecord: {},
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
                this.setState({
                    records: records,
                    currentRecord: records.filter(record => record.date === this.props.match.params.date)[0] || {},
                });
            })
    }

    navigateToList() {
        return () => this.props.history.push(`/ete-archi`);
    }

    render() {
        return (
            <div className="EteArchi">
                <div className="Sidebar">
                    <div className="Header">
                        <button className="CloseButton"
                            onClick={this.navigateToList()}>
                            close
                        </button>
                        <img src={this.state.currentRecord.image} />
                        <h2>{this.state.currentRecord.titre}</h2>
                        <p>Episode du {this.state.currentRecord.date}</p>
                    </div>

                    <div className="Sidebar-content">
                        <p>
                            {this.state.currentRecord.description}
                        </p>
                        <p>
                            <a href={this.state.currentRecord.podcast}>Ecouter l'épisode</a>
                        </p>
                        <p>
                            Crédits photos: {this.state.currentRecord.credits_image}
                        </p>
                    </div>
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
                                    icon={record.date === this.state.currentRecord.date ? record.imageIcon : record.simpleIcon}
                                    onClick={this.navigateToList(record)}/>
                        )}
                    </Map>
                </main>
            </div>
        )
    }
}

export default EteArchiDetails;