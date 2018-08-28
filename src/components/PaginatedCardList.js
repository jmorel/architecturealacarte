import React from 'react';

import LocationCard from './LocationCard';

import './PaginatedCardList.css';

class PaginatedCardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPageIndex: 0,
            pageSize: 5,
        }
    }

    currentPageLocations() {
        const start = this.state.currentPageIndex * this.state.pageSize;
        const end = start + this.state.pageSize;
        return this.props.locations.slice(start, end);
    }

    lastPageIndex() {
        return Math.floor(this.props.locations.length / this.state.pageSize);
    }

    setPageIndex(index) {
        this.setState({
            currentPageIndex: Math.max(0, Math.min(this.lastPageIndex(), index)),
        })
    }

    pageIndices() {
        return Array.from(Array(this.lastPageIndex()).keys())
    }

    render() {
        return (
            <div className="PaginatedCardList">
                {this.currentPageLocations().map(location => (
                    <LocationCard key={location.getId()}
                        location={location}
                        onClick={this.props.onCardClick(location)} />
                ))}
                <div className="Pagination">
                    {this.pageIndices().map(index =>
                        <button className={index === this.state.currentPageIndex ? 'active' : ''}
                            key={index}
                            onClick={() => this.setPageIndex(index)}>{index}</button>
                    )}
                </div>
            </div>
        )
    }
}

export default PaginatedCardList;