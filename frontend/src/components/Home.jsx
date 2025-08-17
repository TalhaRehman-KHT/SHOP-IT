import React, { useEffect } from 'react';
import MetaData from './layout/MetaData.jsx';
import { useGetProductsQuery } from '../redux/api/productApi.js';
import ProductItem from './products/ProductItem.jsx';
import Loader from './layout/Loader.jsx';
import toast from 'react-hot-toast';
import CoustomPagination from './layout/CoustomPagination.jsx';
import { useSearchParams } from 'react-router-dom';
import Filter from './layout/Filter.jsx';

export default function Home() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const keyword = searchParams.get("keyword") || "";
    const min = searchParams.get("min");
    const max = searchParams.get("max");


    const params = { page, keyword };
    min !== null && (params.min = min);
    max !== null && (params.max = max);

    // console.log("=================");
    // console.log(params);
    // console.log("=================");

    const { data, isLoading, isError, error } = useGetProductsQuery(params);

    useEffect(() => {
        if (data?.products?.length > 0) {
            toast.success(`${data.products.length} products loaded successfully!`);
        }

        if (isError) {
            const errorMsg = error?.data?.message || error?.error || 'Failed to load products.';
            toast.error(`Error: ${errorMsg}`);
        }
    }, [data, isError, error]);

    if (isLoading) return <Loader />;

    return (
        <>
            <MetaData title="ShopIt Officials" />

            <div className="container">
                <div className="row">
                    {keyword && (
                        <div className="col-md-3 mt-5">
                            <Filter />
                            {/* You can add actual filter UI here later */}
                        </div>
                    )}

                    <div className={keyword ? "col-12 col-sm-6 col-md-9" : "col-12 col-sm-6 col-md-12"}>
                        <h1 id="products_heading" className="text-secondary">
                            {keyword
                                ? `${data?.products?.length} Products found with keyword "${keyword}"`
                                : "Latest Products"}
                        </h1>

                        <section id="products" className="mt-5">
                            <div className="row">
                                {data?.products?.map((product) => (
                                    // <ProductItem key={product._id} product={product} />
                                    <ProductItem
                                        key={product._id}
                                        product={{
                                            ...product,
                                            imageUrl: product?.images?.[0]?.url || product?.images?.[0] || "/images/default_product.png"
                                        }}
                                    />
                                ))}
                            </div>
                        </section>

                        <CoustomPagination
                            resPerPage={data?.resPerPage}
                            filterProductsCount={data?.filterProductsCount}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
