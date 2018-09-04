import React from 'react';

import './CinquanteLieuxLocationCard.css';

export function CinquanteLieuxLocationCard({ onClick, title, subtitle, imageUrl, category }) {
    return (
        <div className="CinquanteLieuxLocationCard" onClick={onClick}>
            {imageUrl && <img src={imageUrl} alt={title} className="CinquanteLieuxLocationCard-image" />}
            <div className="CinquanteLieuxLocationCard-title">
                {title}
                <div className="CinquanteLieuxLocationCard-category">{category}</div>
            </div>
            <div className="CinquanteLieuxLocationCard-subtitle">{subtitle}</div>
        </div>
    );
}