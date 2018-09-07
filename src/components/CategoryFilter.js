import React from 'react';

import './CategoryFilter.css';

export class CategoryFilter extends React.Component {
    constructor(props) {
        super(props);
        this.toggleFilter = this.toggleFilter.bind(this);
    }

    toggleFilter(filterProp, value) {
        return () => {
            this.props.toggleFilter(filterProp, value);
        }
    }

    render() {
        const { title, filterProp, values, activeValues } = this.props;
        return (
            <div className="CategoryFilter">
                <div className="CategoryFilter-title">{title}</div>
                <div className="CategoryFilter-categories">
                    {values.map(value => (
                        <button className={`CategoryFilter-category ${activeValues.includes(value.value) ? '--active' : ''}`}
                            key={value.value}
                            onClick={this.toggleFilter(filterProp, value.value)}>
                            {value.value}
                            <span className="CategoryFilter-count">{value.count}</span>
                        </button>
                    ))}
                </div>
            </div>
        )
    }
}
