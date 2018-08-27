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

    imgSrc(imageId) {
        return `https://jmorel.opendatasoft.com/explore/dataset/ete-archi/files/${imageId}/300`;
    }


    currentPageItems() {
        const start = this.state.currentPageIndex * this.state.pageSize;
        const end = start + this.state.pageSize;
        return this.props.items.slice(start, end);
    }

    lastPageIndex() {
        return Math.floor(this.props.items.length / this.state.pageSize);
    }

    setPageIndex(index) {
        this.setState({
            currentPageIndex: Math.max(0, Math.min(this.lastPageIndex(), index)),
        })
        console.log(this.state.currentPageIndex, this.lastPageIndex())
    }

    pageIndices() {
        return Array.from(Array(this.lastPageIndex()).keys())
    }

    render() {
        return (
            <div className="PaginatedCardList">
                {this.currentPageItems().map(item => (
                    <LocationCard key={item.date}
                        title={item.titre}
                        imgSrc={this.imgSrc(item.image.id)} />
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