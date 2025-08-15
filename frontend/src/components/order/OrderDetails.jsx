import React, { useEffect } from 'react';
import { useOrdersDetailsQuery } from '../../redux/api/orderApi';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';

export default function OrderDetails() {
    const { id } = useParams();
    const { data, isLoading, error } = useOrdersDetailsQuery(id);
    const order = data?.order || {};

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }

    }, [error]);

    if (isLoading) {
        return <Loader />;
    }

    if (!order) {
        return <p className="text-center mt-5">Order not found</p>;
    }

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        user,
        totalPrice,
        orderStatus,
        createdAt,
        _id
    } = order;

    // const isPaid = paymentInfo?.status === "paid" ? true : false

    return (
        <div className="row d-flex justify-content-center">
            <div className="col-12 col-lg-9 mt-5 order-details">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mt-5 mb-4">Your Order Details</h3>
                    <Link className="btn btn-success" to={`/invoice/order/${_id}`}>
                        <i className="fa fa-print"></i> Invoice
                    </Link>
                </div>

                {/* Order Summary */}
                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <th scope="row">ID</th>
                            <td>{_id}</td>
                        </tr>
                        <tr>
                            <th scope="row">Status</th>
                            <td className={orderStatus === 'Delivered' ? 'greenColor' : 'redColor'}>
                                <b>{orderStatus}</b>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Date</th>
                            <td>{new Date(createdAt).toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Shipping Info */}
                <h3 className="mt-5 mb-4">Shipping Info</h3>
                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <th scope="row">Name</th>
                            <td>{user?.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Phone No</th>
                            <td>{shippingInfo?.phoneNo}</td>
                        </tr>
                        <tr>
                            <th scope="row">Address</th>
                            <td>
                                {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.postalCode}, {shippingInfo?.country}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Payment Info */}
                <h3 className="mt-5 mb-4">Payment Info</h3>
                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <th scope="row">Status</th>
                            <td className={paymentInfo?.status?.toLowerCase() === 'paid' ? 'greenColor' : 'redColor'}>
                                <b>{paymentInfo?.status?.toUpperCase()}</b>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Method</th>
                            <td>{paymentInfo?.method || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Stripe ID</th>
                            <td>{paymentInfo?.id || 'N/A'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Amount Paid</th>
                            <td>${totalPrice?.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Order Items */}
                <h3 className="mt-5 my-4">Order Items:</h3>
                <hr />
                {orderItems?.map((item) => (
                    <div className="cart-item my-1" key={item?.product}>
                        <div className="row my-5">
                            <div className="col-4 col-lg-2">
                                <img
                                    src={item?.image}
                                    alt={item?.name}
                                    height="45"
                                    width="65"
                                />
                            </div>
                            <div className="col-5 col-lg-5">
                                <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                            </div>
                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                <p>${item?.price}</p>
                            </div>
                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                <p>{item?.quantity} Piece(s)</p>
                            </div>
                        </div>
                    </div>
                ))}
                <hr />
            </div>
        </div>
    );
}
