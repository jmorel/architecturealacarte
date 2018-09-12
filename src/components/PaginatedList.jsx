import React from 'react';
import PropTypes from 'prop-types';

import { Pagination } from './Pagination';

export class PaginatedList extends React.Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
        this.setCurrentIndex = this.setCurrentIndex.bind(this);
    }

    setCurrentIndex(index) {
        this.props.setCurrentIndex(index);
        this.node.scrollIntoView();
    }

    render() {
        const { children, currentIndex, lastIndex } = this.props;
        return (
            <div ref={(node) => { this.node = node; }} >
                {children}
                <Pagination
                    lastIndex={lastIndex}
                    currentIndex={currentIndex}
                    setCurrentIndex={this.setCurrentIndex}
                />
            </div>
        );
    }
}

PaginatedList.propTypes = {
    children: PropTypes.element.isRequired,
    currentIndex: PropTypes.number.isRequired,
    lastIndex: PropTypes.number.isRequired,
    setCurrentIndex: PropTypes.func.isRequired,
};
