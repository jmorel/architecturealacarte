import React from 'react';
import PropTypes from 'prop-types';

import './Filter.css';

export const Filter = (props) => {
    const { widget } = props;
    if (widget === 'dropdown') {
        return <DropDownFilter {...props} />;
    }
    return <CategoryFilter {...props} />;
};

Filter.propTypes = {
    widget: PropTypes.string,
};

Filter.defaultProps = {
    widget: undefined,
};

export class DropDownFilter extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        const { filterProp, toggleFilter } = this.props;
        const value = event.target.value;
        toggleFilter(filterProp, value);
        /* eslint-disable no-param-reassign */
        event.target.value = '';
    }

    handleClick(event) {
        const { filterProp } = this.props;
        const value = event.target.dataset.value;
        this.props.toggleFilter(filterProp, value);
    }

    render() {
        const { title, values, activeValues } = this.props;
        return (
            <div className="DropdownFilter">
                <div className="DropdownFilter-title">{title}</div>
                <select className="DropdownFilter-select" onChange={this.handleChange}>
                    <option value="">Sélectionner...</option>
                    {values.map(value => (
                        <option key={value.value} value={value.value}>{value.value}</option>
                    ))}
                </select>
                <div className="CategoryFilter-categories">
                    {activeValues.map(value => (
                        <button
                            className="CategoryFilter-category --active"
                            key={value}
                            data-value={value}
                            onClick={this.handleClick}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

DropDownFilter.propTypes = {
    title: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    activeValues: PropTypes.array.isRequired,
    filterProp: PropTypes.string.isRequired,
    toggleFilter: PropTypes.func.isRequired,
};

export class CategoryFilter extends React.Component {
    constructor(props) {
        super(props);
        this.toggleFilter = this.toggleFilter.bind(this);
    }

    toggleFilter(filterProp, value) {
        return () => {
            this.props.toggleFilter(filterProp, value);
        };
    }

    render() {
        const { title, filterProp, values, activeValues } = this.props;
        return (
            <div className="CategoryFilter">
                <div className="CategoryFilter-title">{title}</div>
                <div className="CategoryFilter-categories">
                    {values.map(value => (
                        <button
                            className={`CategoryFilter-category ${activeValues.includes(value.value) ? '--active' : ''}`}
                            key={value.value}
                            onClick={this.toggleFilter(filterProp, value.value)}
                        >
                            {value.value}
                            <span className="CategoryFilter-count">{value.count}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

CategoryFilter.propTypes = {
    title: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    activeValues: PropTypes.array.isRequired,
    filterProp: PropTypes.string.isRequired,
    toggleFilter: PropTypes.func.isRequired,
};
