import React from 'react';

import './LocationCard.css';

export function LocationCard({imageUrl, title, imageRatio}) {
    const style = {paddingTop: `${imageRatio}%`};
    return (
        <div className="LocationCard" style={style}>
            <img src={imageUrl} alt={title}/>
            <div className="LocationCard-title">{title}</div>
        </div>
    )
}
