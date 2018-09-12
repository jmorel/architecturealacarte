import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import './Spinner.scss';

library.add(faSpinner);

export function Spinner() {
    return (
        <div className="Spinner">
            <div>Chargement des lieux...</div>
            <FontAwesomeIcon icon={faSpinner} spin />
        </div>
    );
}
