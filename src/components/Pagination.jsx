import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.scss';

const NB_BUTTONS = 7;

export function Pagination({ lastIndex, currentIndex, setCurrentIndex }) {
    const firstIndex = Math.min(Math.max(0, currentIndex - Math.floor(NB_BUTTONS / 2)), lastIndex - NB_BUTTONS);
    const indices = (new Array(NB_BUTTONS)).fill(undefined).map((_, index) => index + firstIndex);

    return (
        <div className="Pagination">
            {indices.map(index => (
                <button
                    className={index === currentIndex ? 'active' : ''}
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
}

Pagination.propTypes = {
    lastIndex: PropTypes.number.isRequired,
    currentIndex: PropTypes.number.isRequired,
    setCurrentIndex: PropTypes.func.isRequired,
};
