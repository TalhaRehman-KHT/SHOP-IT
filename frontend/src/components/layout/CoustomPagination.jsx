import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';

export default function CoustomPagination({ resPerPage, filterProductsCount }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;

    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    const setCurrentPageNo = (pageNumber) => {
        setSearchParams({ page: pageNumber });
    };

    return (
        <>
            {filterProductsCount > resPerPage && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={filterProductsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="First"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            )}
        </>
    );
}
