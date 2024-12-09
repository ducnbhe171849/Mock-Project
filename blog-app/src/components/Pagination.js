import { MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBBtn } from "mdb-react-ui-kit";

const Pagination = ({ currentPage, pageLimit, loadBlogsData, totalBlog, dataLength, resetPage }) => {
    const totalPages = Math.ceil(totalBlog / pageLimit);

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            const start = (currentPage + 1) * pageLimit;
            loadBlogsData(start, pageLimit, 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            const start = (currentPage - 1) * pageLimit;
            loadBlogsData(start, pageLimit, -1);
        }
    };

    return (
        <div>
            <MDBPagination center className="mb-0">
                {currentPage > 0 && (
                    <MDBPaginationItem>
                        <MDBBtn rounded onClick={handlePrev}>Prev</MDBBtn>
                    </MDBPaginationItem>
                )}

                <MDBPaginationItem>
                    <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
                </MDBPaginationItem>

                {dataLength === pageLimit && currentPage < totalPages - 1 && (
                    <MDBPaginationItem>
                        <MDBBtn rounded onClick={handleNext}>Next</MDBBtn>
                    </MDBPaginationItem>
                )}
            </MDBPagination>
        </div>
    );
};


export default Pagination;
