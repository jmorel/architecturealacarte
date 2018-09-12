import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import './Header.scss';

library.add(faArrowAltCircleLeft, faTimes);

export function HomeHeader({ title, children }) {
    return (
        <header className="Header --padding-top --padding-bottom">
            <h1>{title}</h1>
            {children}
        </header>
    );
}

HomeHeader.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
};

HomeHeader.defaultProps = {
    children: undefined,
};

export function ListHeader({ title }) {
    return (
        <header className="Header --padding-top --padding-bottom">
            <p>
                <Link to={'/'}>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    Architecture à la carte
                </Link>
            </p>
            <h2>{title}</h2>
        </header>
    );
}

ListHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

export function DetailsHeader({ listUrl, title, imageUrl, children }) {
    return (
        <header className="Header --padding-bottom">
            <Link className="CloseButton" to={listUrl}>
                <FontAwesomeIcon icon={faTimes} />
            </Link>
            <img src={imageUrl} alt={title} />
            <h3>{title}</h3>
            {children}
        </header>
    );
}

DetailsHeader.propTypes = {
    title: PropTypes.string.isRequired,
    listUrl: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    children: PropTypes.element,
};

DetailsHeader.defaultProps = {
    children: undefined,
};
