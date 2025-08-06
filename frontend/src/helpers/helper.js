export const getPriceQueryParams = (searchParams, key, value) => {
    const newParams = new URLSearchParams(searchParams); // clone the original

    if (value) {
        newParams.set(key, value);
    } else {
        newParams.delete(key);
    }

    return newParams;
};
