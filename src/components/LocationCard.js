import React from 'react';
import './LocationCard.css';
class LocationCard extends React.Component {
    render() {
        return (
            <div className="LocationCard">
                <img src={this.props.imgSrc} alt={this.props.title} />
                <div className="LocationCard-title">{this.props.title}</div>
            </div>
        )
    }
}

export default LocationCard;