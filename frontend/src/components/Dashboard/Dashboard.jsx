import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import DatePicker from "react-date-picker";
import toast from "react-hot-toast";
import "react-date-picker/dist/DatePicker.css";
import SalesChart from "../Charts/SalesChart.jsx";
import { useLazyGetDashboardSalesQuery } from "../../redux/api/orderApi.js";

export default function Dashboard() {
    const [startDate, setStartDate] = useState(() => {
        const d = new Date();
        d.setDate(1); // first day of month
        return d;
    });
    const [endDate, setEndDate] = useState(new Date());

    const [getDashboardSales, { error, isLoading, data }] =
        useLazyGetDashboardSalesQuery();

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "Failed to fetch sales");
        }
    }, [error]);

    const submitHandler = () => {
        getDashboardSales({
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        });
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-start align-items-center">
                <div className="mb-3 me-4">
                    <label className="form-label d-block">Start Date</label>
                    <DatePicker
                        onChange={setStartDate}
                        value={startDate}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label d-block">End Date</label>
                    <DatePicker
                        onChange={setEndDate}
                        value={endDate}
                        className="form-control"
                    />
                </div>
                <button
                    className="btn fetch-btn ms-4 mt-3 px-5"
                    onClick={submitHandler}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Fetch"}
                </button>
            </div>

            <div className="row pr-4 my-5">
                <div className="col-xl-6 col-sm-12 mb-3">
                    <div className="card text-white bg-success o-hidden h-100">
                        <div className="card-body">
                            <div className="text-center card-font-size">
                                Sales
                                <br />
                                <b>${data?.totalSales || 0}</b>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-6 col-sm-12 mb-3">
                    <div className="card text-white bg-danger o-hidden h-100">
                        <div className="card-body">
                            <div className="text-center card-font-size">
                                Orders
                                <br />
                                <b>{data?.totalNumOrders || 0}</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart with sales data */}
            {data?.salesByDate && <SalesChart salesData={data.salesByDate} />}

            <div className="mb-5"></div>
        </AdminLayout>
    );
}
