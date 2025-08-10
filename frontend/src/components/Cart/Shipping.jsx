import React, { useEffect, useState } from 'react';
import { countries } from 'countries-list';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../redux/featurs/cartSlice';
import { useNavigate } from 'react-router-dom';
import CheckOutSteps from './CheckOutSteps';

export default function Shipping() {
    const countriesList = Object.values(countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if (shippingInfo) {
            setAddress(shippingInfo.address || '');
            setPhoneNo(shippingInfo.phoneNo || ''); // ✅ fixed key
            setCity(shippingInfo.city || '');
            setZipCode(shippingInfo.zipCode || '');
            setCountry(shippingInfo.country || '');
        }
    }, [shippingInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ address, phoneNo, city, zipCode, country }));
        navigate('/confirm_order');
    };

    return (
        <>
            <CheckOutSteps shipping />

            <div className="row wrapper mb-5">
                <div className="col-10 col-lg-5">
                    <form
                        className="shadow rounded bg-body"
                        onSubmit={submitHandler}
                    >
                        <h2 className="mb-4">Shipping Info</h2>

                        <div className="mb-3">
                            <label htmlFor="address_field" className="form-label">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city_field" className="form-label">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone_field" className="form-label">Phone No</label>
                            <input
                                type="tel"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)} // ✅ fixed setter
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="zip_code_field" className="form-label">Zip Code</label>
                            <input
                                type="number"
                                id="zip_code_field"
                                className="form-control"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="country_field" className="form-label">Country</label>
                            <select
                                id="country_field"
                                className="form-select"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                <option value="">Select Country</option>
                                {countriesList.map((c) => (
                                    <option key={c.name} value={c.name}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn w-100 py-2"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
