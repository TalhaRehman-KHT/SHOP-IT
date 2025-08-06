import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const submithandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {

            navigate(`/?keyword=${keyword}`);


        } else {
            navigate('/');
        }
    }

    return (
        <>
            <form onSubmit={submithandler}>
                <div className="input-group">
                    <input
                        type="text"
                        id="search_field"
                        aria-describedby="search_btn"
                        className="form-control"
                        placeholder="Enter Product Name ..."
                        name="keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button id="search_btn" className="btn" type="submit">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </form>
        </>
    )
}
