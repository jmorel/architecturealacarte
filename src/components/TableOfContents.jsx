import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './TableOfContents.scss';

class TableOfContents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [
                [{ label: "L'été archi de David Abittan", url: '/ete-archi' }],
                [{ label: 'Le génie des lieux', url: '/genie-des-lieux' }],
                [{ label: 'Architecture remarquable des XXème et XXIème siècles en Île de France', url: '/ile-de-france' }],
                [{ label: 'Les 50 lieux en France à voir au moins une fois dans sa vie', url: '/50-lieux-en-france-a-voir-au-moins-une-fois-dans-sa-vie' }],
            ],
        };
    }
    render() {
        return (
            <div className="TableOfContents">
                {this.state.sections.map((section, index) => (
                    <ToCSection links={section} key={/* eslint-disable react/no-array-index-key */index} />
                ))}
            </div>
        );
    }
}

const ToCSection = ({ links }) => (
    <ul className="TableOfContents-section">
        {links.map(link => (
            <li key={link.label}>
                <Link to={link.url}>{link.label}</Link>
            </li>
        ))}
    </ul>
);

ToCSection.propTypes = {
    links: PropTypes.array.isRequired,
};

export default TableOfContents;
