import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import './PageLayout.css';

export function PageLayout({ sidebar, markers, defaultPosition, defaultZoom }) {
    return (
        <div className="PageLayout">
            {sidebar}
            <div className="PageLayout-mapContainer">
                <Map center={defaultPosition} zoom={defaultZoom}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {markers}
                </Map>
            </div>
        </div>
    )
}