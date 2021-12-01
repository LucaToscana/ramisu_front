import React from 'react'

function ShowFilters({ filters, handleFilters }) {
    return (
        <div className="hidden lg:flex lg:flex-wrap lg:showFilters lg:m-4">
            {filters.map(f =>
                <div key={f} className="flex  showFilter shadow-inner mb-4 mr-8">
                    <p className="font-bold p-2" >{f}</p>
                    <p className="font-bold p-2 deleteFilter" onClick={() => handleFilters(f)}>X</p>
                </div>
            )}
        </div>
    )
}

export default ShowFilters
