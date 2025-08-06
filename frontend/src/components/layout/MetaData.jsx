import React from "react";
import { Helmet } from "react-helmet";

export default function MetaData({ title }) {
    return (
        <Helmet>
            <title>{`${title} - ShopIt`}</title>
            <meta name="description" content="ShopIt is a B2B eCommerce site for sellers and buyers." />
            <link rel="icon" type="image/png" href="/images/invoice-logo.png" />
        </Helmet>
    );
}
