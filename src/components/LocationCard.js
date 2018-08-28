import React from 'react';

import './LocationCard.css';

export default function LocationCard(props) {
    return (
        <div className="LocationCard" onClick={props.onClick}>
            <img src={props.location.getImageUrl()} alt={props.location.getTitle()} />
            <div className="LocationCard-title">{props.location.getTitle()}</div>
        </div>
    )
}
