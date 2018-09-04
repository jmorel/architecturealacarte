import React from 'react';

export default function Pagination({pageIndices, setPageIndex, currentPageIndex}) {
    return (
        <div className="Pagination">
            {pageIndices.map(index =>
                <button className={index === currentPageIndex ? 'active' : ''}
                    key={index}
                    onClick={() => setPageIndex(index)}>
                    {index}
                </button>
            )}
        </div>
    )
}