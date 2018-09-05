import React from 'react';
import { CinquanteLieuxCategoryTag } from './CinquanteLieuxCategoryTag';

import './CinquanteLieuxLocationCard.css';

export function CinquanteLieuxLocationCard({ title, subtitle, imageUrl, categories }) {
    return (
        <div className="CinquanteLieuxLocationCard">
            {imageUrl && <img src={imageUrl} alt={title} className="CinquanteLieuxLocationCard-image" />}
            <div className="CinquanteLieuxLocationCard-header">
                <span className="CinquanteLieuxLocationCard-title">{title}</span>
                {categories.map(category => <CinquanteLieuxCategoryTag key={category} category={category} />)}
            </div>
            <div className="CinquanteLieuxLocationCard-subtitle">{subtitle}</div>
        </div>
    );
}