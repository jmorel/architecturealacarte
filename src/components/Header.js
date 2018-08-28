import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './Header.css';

library.add(faArrowAltCircleLeft, faTimes);

export function HomeHeader(props) {
    return (
        <header className="Header --padding-top --padding-bottom">
            <h1>{props.title}</h1>
        </header>
    )
}

export function ListHeader(props) {
    return (
        <header className="Header --padding-top --padding-bottom">
            <p>
                <Link to={'/'}>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    Architecture à la carte
                </Link>
            </p>
            <h2>{props.title}</h2>
        </header>
    )

}

export function DetailsHeader(props) {
    return (
        <header className="Header --padding-bottom">
            <button className="CloseButton"
                onClick={props.navigateToList}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <img src={props.location.getImageUrl()} alt={props.location.getTitle()}/>
            <h3>{props.location.getTitle()}</h3>
            <p>Episode du {props.location.getDate()}</p>
        </header>
    )
}
