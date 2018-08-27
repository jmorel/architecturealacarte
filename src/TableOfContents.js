import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './TableOfContents.css';

class TableOfContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [
                [{ label: "L'été archi de David Abittan", url: "/ete-archi.html" }],
                [{ label: "Le génie des lieux", url: "test" }],
                [
                    { label: "Les journées du patrimoine 2017", url: "test" },
                    { label: "Les journées du patrimoine 2016", url: "test" },
                    { label: "Les journées du patrimoine 2015", url: "test" },
                ],
                [{ label: "Architecture remarquable des XXème et XXIème siècles en Île de France", url: "test" }],
                [{ label: "Les 50 lieux en France à voir au moins une fois dans sa vie", url: "test" }],
            ]
        }
    }
    render() {
        return (
            <div className="TableOfContents">
                {this.state.sections.map((section, index) =>
                    <ToCSection links={section} key={index}></ToCSection>
                )}
            </div>
        )
    }
}

class ToCSection extends Component {
    render() {
        return (
            <ul className="TableOfContents-section">
                {this.props.links.map(link =>
                    <li key={link.label}>
                        <Link to={link.url}>{link.label}</Link>
                    </li>
                )}
            </ul>
        )
    }
}

export default TableOfContents;