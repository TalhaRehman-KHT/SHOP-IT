import React, { useEffect } from 'react';
import './invoice.css';
import { useOrdersDetailsQuery } from '../../redux/api/orderApi';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader';
import toast from 'react-hot-toast';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function Invoice() {
    const { id } = useParams();
    const { data, isLoading, error } = useOrdersDetailsQuery(id);
    const order = data?.order;

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    }, [error]);

    if (isLoading) return <Loader />;
    if (!order) return <p className="text-center mt-5">Order not found</p>;

    const {
        shippingInfo = {},
        orderItems = [],
        paymentInfo = {},
        user = {},
        totalPrice = 0,
        orderStatus,
        createdAt,
        _id,
        shippingPrice = 0
    } = order;

    const handleDocument = () => {
        const input = document.getElementById("order_invoice");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`invoice_${order?._id}.pdf`);
        });
    };


    return (
        <div className="order-invoice my-5">
            <div className="row d-flex justify-content-center mb-5">
                <button className="btn btn-success col-md-5" onClick={handleDocument}>
                    <i className="fa fa-print"></i> Download Invoice
                </button>
            </div>
            <div id="order_invoice" className="p-3 border border-secondary">
                <header className="clearfix">
                    <div id="logo">
                        <img src="/images/invoice-logo.png" alt="Company Logo" />
                    </div>
                    <h1>INVOICE # {_id}</h1>
                    <div id="company" className="clearfix">
                        <div>ShopIT</div>
                        <div>455 Foggy Heights, AZ 85004, US</div>
                        <div>(602) 519-0450</div>
                        <div><a href="mailto:info@shopit.com">info@shopit.com</a></div>
                    </div>
                    <div id="project">
                        <div><span>Name</span> {user?.name}</div>
                        <div><span>EMAIL</span> {user?.email}</div>
                        <div><span>PHONE</span> {shippingInfo?.phoneNo}</div>
                        <div>
                            <span>ADDRESS</span> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.postalCode}, {shippingInfo?.country}
                        </div>
                        <div><span>DATE</span> {createdAt ? new Date(createdAt).toLocaleDateString() : ''}</div>
                        <div><span>Status</span> {paymentInfo?.status || 'Unpaid'}</div>
                    </div>
                </header>
                <main>
                    <table className="mt-5">
                        <thead>
                            <tr>
                                <th className="service">ID</th>
                                <th className="desc">NAME</th>
                                <th>PRICE</th>
                                <th>QTY</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((item, index) => (
                                <tr key={item?.product || index}>
                                    <td className="service">{index + 1}</td>
                                    <td className="desc">{item?.name}</td>
                                    <td className="unit">${item?.price?.toFixed(2)}</td>
                                    <td className="qty">{item?.quantity}</td>
                                    <td className="total">${(item?.price * item?.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="4"><b>SUBTOTAL</b></td>
                                <td className="total">${(totalPrice - shippingPrice).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="4"><b>SHIPPING</b></td>
                                <td className="total">${shippingPrice.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="grand total"><b>GRAND TOTAL</b></td>
                                <td className="grand total">${totalPrice.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div id="notices">
                        <div>NOTICE:</div>
                        <div className="notice">
                            A finance charge of 1.5% will be made on unpaid balances after 30 days.
                        </div>
                    </div>
                </main>
                <footer>
                    Invoice was created on a computer and is valid without the signature.
                </footer>
            </div>
        </div>
    );
}
