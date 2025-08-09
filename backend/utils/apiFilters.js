class ApiFilters {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i', // FIXED
                },
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    //
    // filter() {

    //     const queryCopy = { ...this.queryStr };

    //     // Removing fields from the query
    //     const removeFields = ['keyword', 'limit', 'page']
    //     removeFields.forEach(el => delete queryCopy[el]);

    //     // Advance filter for price, ratings etc
    //     let queryStr = JSON.stringify(queryCopy)
    //     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


    //     this.query = this.query.find(JSON.parse(queryStr));
    //     return this;
    // }


    // filter() {
    //     const queryCopy = { ...this.queryStr };

    //     // Remove fields that are not filters
    //     const removeFields = ['keyword', 'limit', 'page'];
    //     removeFields.forEach(el => delete queryCopy[el]);

    //     // Manually convert price filters into proper Mongo syntax
    //     let filters = {};

    //     if (queryCopy['price[gte]']) {
    //         filters.price = { ...filters.price, $gte: Number(queryCopy['price[gte]']) };
    //     }

    //     if (queryCopy['price[lte]']) {
    //         filters.price = { ...filters.price, $lte: Number(queryCopy['price[lte]']) };
    //     }

    //     // Add more filters here if needed (e.g., ratings)

    //     // console.log("✅ Final Filters for Mongo:", filters);

    //     this.query = this.query.find(filters);
    //     return this;
    // }


    filter() {
        const queryCopy = { ...this.queryStr };

        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);

        let filters = {};

        // ✅ Dynamically handle price filters
        if (queryCopy['price[gte]'] || queryCopy['price[lte]']) {
            filters.price = {};
            if (queryCopy['price[gte]']) {
                filters.price.$gte = Number(queryCopy['price[gte]']);
            }
            if (queryCopy['price[lte]']) {
                filters.price.$lte = Number(queryCopy['price[lte]']);
            }
        }

        // ✅ Category
        if (queryCopy.category) {
            filters.category = {
                $in: Array.isArray(queryCopy.category)
                    ? queryCopy.category
                    : [queryCopy.category],
            };
        }

        // ✅ Ratings
        if (queryCopy.ratings) {
            filters.ratings = {
                $in: (Array.isArray(queryCopy.ratings)
                    ? queryCopy.ratings
                    : [queryCopy.ratings]
                ).map(Number),
            };
        }

        console.log("🧪 Applied Mongo Filters:", filters);

        this.query = this.query.find(filters);
        return this;
    }



    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
    // 

}

export default ApiFilters;
