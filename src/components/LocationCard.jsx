import React from 'react';
import PropTypes from 'prop-types';

import './LocationCard.css';

export function LocationCard({ imageUrl, title, imageRatio }) {
    const style = { paddingTop: `${imageRatio}%` };
    return (
        <div className="LocationCard" style={style}>
            <img src={imageUrl} alt={title} />
            <div className="LocationCard-title">{title}</div>
        </div>
    );
}

LocationCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageRatio: PropTypes.number.isRequired,
};
