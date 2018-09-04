import React from 'react';
import ReactDOM from 'react-dom';

import { Pagination } from './Pagination';

export class PaginatedList extends React.Component {
    constructor(props) {
        super(props)
        this.listRef = React.createRef();
        this.setCurrentIndex = this.setCurrentIndex.bind(this);
    }

    setCurrentIndex(index) {
        this.props.setCurrentIndex(index)
        ReactDOM.findDOMNode(this.listRef.current).scrollIntoView();
    }

    render () {
        const { children, currentIndex, lastIndex } = this.props;
        return (
            <div ref={this.listRef}>
                {children}
                <Pagination
                    lastIndex={lastIndex}
                    currentIndex={currentIndex}
                    setCurrentIndex={this.setCurrentIndex} />
            </div>
        );
    }
}