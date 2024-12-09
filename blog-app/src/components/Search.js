import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import "./Search.css"
const Search = ({ handleSearch, searchValue, onInputChange, loading }) => {
    return (
        <div className="searchForm">
            <form
                className="d-flex"
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent form default behavior
                    handleSearch(e);    // Call handleSearch function
                }}
            >
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Blog ..."
                    value={searchValue}
                    onChange={onInputChange}
                />
                <MDBBtn type="submit" disabled={loading}>
                    {loading ? "Searching..." : "Search"}
                </MDBBtn>
            </form>
        </div>
    );
};

export default Search;
