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

export function ListHeader({title}) {
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
    )

}

export function DetailsHeader({listUrl, title, date, imageUrl}) {
    return (
        <header className="Header --padding-bottom">
            <Link className="CloseButton" to={listUrl}>
                <FontAwesomeIcon icon={faTimes} />
            </Link>
            <img src={imageUrl} alt={title}/>
            <h3>{title}</h3>
            <p>Episode du {date}</p>
        </header>
    )
}
