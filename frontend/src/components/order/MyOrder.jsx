import React, { useEffect } from 'react';
import { useMyOrdersQuery } from '../../redux/api/orderApi.js';
import Loader from '../layout/Loader.jsx';
import toast from 'react-hot-toast';
//import { MDBDataTable } from 'mdbreact';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/featurs/cartSlice.js';

export default function MyOrder() {
    const navigate = useNavigate();
    const { data, isLoading, error } = useMyOrdersQuery();
    const [searchparams] = useSearchParams();
    const order_success = searchparams.get("order_success")
    const dispatch = useDispatch();
    // Handle errors
    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
        if (order_success) {
            dispatch(clearCart());
            navigate("/me/orders");
        }
    }, [error, order_success]);

    const setOrders = () => {
        const orders = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Amount Paid',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Payment Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Order Status',
                    field: 'orderStatus',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        };

        data?.orders?.forEach((order) => {
            orders.rows.push({
                id: order?._id,
                amount: `$${order?.totalAmount}`, // Added currency format
                status: order?.paymentInfo?.status?.toUpperCase(),
                orderStatus: order?.orderStatus,
                actions: (
                    <>
                        <Link
                            to={`/me/orders/${order?._id}`}
                            className='btn btn-primary btn-sm me-2'
                        >
                            <i className='fa fa-eye'></i>
                        </Link>
                        <Link
                            to={`/invoice/order/${order?._id}`}
                            className='btn btn-success btn-sm'
                        >
                            <i className='fa fa-print'></i>
                        </Link>
                    </>
                )
            });
        });

        return orders;
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <h1 className='mt-5'>{data?.orders?.length || 0} Orders</h1>
            <MDBDataTable
                data={setOrders()}
                className='px-3'
                bordered
                striped
                hover
            />
        </div>
    );
}
