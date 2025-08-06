import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPriceQueryParams } from '../../helpers/helper.js';
import { PRODUCT_CATEGORIES } from '../constants/constant.js';

export default function Filter() {
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Form submit handler for price
    const handlePriceSubmit = (e) => {
        e.preventDefault();

        if (min !== '') searchParams.set("price[gte]", min);
        else searchParams.delete("price[gte]");

        if (max !== '') searchParams.set("price[lte]", max);
        else searchParams.delete("price[lte]");

        setSearchParams(searchParams);
    };

    // Handle category checkbox change
    const handleCategoryChange = (category) => {
        const currentCategories = searchParams.getAll("category");
        const updatedCategories = currentCategories.includes(category)
            ? currentCategories.filter(c => c !== category)
            : [...currentCategories, category];

        searchParams.delete("category");
        updatedCategories.forEach(c => searchParams.append("category", c));
        setSearchParams(searchParams);
    };

    // Handle rating checkbox change
    const handleRatingChange = (rating) => {
        const currentRatings = searchParams.getAll("ratings");
        const updatedRatings = currentRatings.includes(rating)
            ? currentRatings.filter(r => r !== rating)
            : [...currentRatings, rating];

        searchParams.delete("ratings");
        updatedRatings.forEach(r => searchParams.append("ratings", r));
        setSearchParams(searchParams);
    };

    // Keep state synced with URL for price
    useEffect(() => {
        setMin(searchParams.get("price[gte]") || '');
        setMax(searchParams.get("price[lte]") || '');
    }, [searchParams]);

    return (
        <div className="border p-3 filter">
            <h3>Filters</h3>
            <hr />
            <h5 className="filter-heading mb-3">Price</h5>

            <form className="px-2" onSubmit={handlePriceSubmit}>
                <div className="row">
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Min ($)"
                            name="min"
                            value={min}
                            onChange={(e) => setMin(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Max ($)"
                            name="max"
                            value={max}
                            onChange={(e) => setMax(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-primary">GO</button>
                    </div>
                </div>
            </form>

            <hr />
            <h5 className="mb-3">Category</h5>
            {PRODUCT_CATEGORIES?.map((cat) => {
                const isChecked = searchParams.getAll("category").includes(cat);
                return (
                    <div className="form-check" key={cat}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="category"
                            value={cat}
                            id={`cat-${cat}`}
                            checked={isChecked}
                            onChange={() => handleCategoryChange(cat)}
                        />
                        <label className="form-check-label" htmlFor={`cat-${cat}`}>{cat}</label>
                    </div>
                );
            })}

            <hr />
            <h5 className="mb-3">Ratings</h5>
            {[5, 4].map((rating) => {
                const isChecked = searchParams.getAll("ratings").includes(rating.toString());
                return (
                    <div className="form-check" key={rating}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="ratings"
                            value={rating}
                            id={`rating-${rating}`}
                            checked={isChecked}
                            onChange={() => handleRatingChange(rating.toString())}
                        />
                        <label className="form-check-label" htmlFor={`rating-${rating}`}>
                            <span className="star-rating">
                                {'★ '.repeat(rating)}{'☆ '.repeat(5 - rating)}
                            </span>
                        </label>
                    </div>
                );
            })}
        </div>
    );
}
