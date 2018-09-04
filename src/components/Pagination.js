import React from 'react';

import './Pagination.css';

export function Pagination({ lastIndex, currentIndex, setCurrentIndex }) {
    const indices = Array.from(Array(lastIndex).keys())
    return (
        <div className="Pagination">
            {indices.map(index =>
                <button className={index === currentIndex ? 'active' : ''}
                    key={index}
                    onClick={() => setCurrentIndex(index)}>
                    {index + 1}
                </button>
            )}
        </div>
    )
}