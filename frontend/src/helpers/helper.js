export const getPriceQueryParams = (searchParams, key, value) => {
    const newParams = new URLSearchParams(searchParams); // clone the original

    if (value) {
        newParams.set(key, value);
    } else {
        newParams.delete(key);
    }

    return newParams;
};


export const calculatorOrderCost = (cartItems) => {
    if (!Array.isArray(cartItems)) return { itemPrice: 0, shippingPrice: 0, taxPrice: 0, totalPrice: 0 };

    const itemPrice = cartItems.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
    );

    const shippingPrice = itemPrice > 200 ? 0 : 25;
    const taxPrice = +(0.15 * itemPrice).toFixed(2);
    const totalPrice = +(itemPrice + shippingPrice + taxPrice).toFixed(2);

    return {
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    };
};
