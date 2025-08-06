import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of the product"],
      maxLength: [200, "Product name can be up to 200 characters"]
    },
    price: {
      type: Number,
      required: [true, "Please enter the product price"],
      max: [99999, "Product price can be up to 5 digits only"]
    },
    description: {
      type: String,
      required: [true, "Please enter the product description"]
    },
    rating: {
      type: Number,
      default: 0
    },
    images: [
      {
        public_id: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    ],
    category: {
      type: String,
      required: [true, "Please enter the product category"],
      enum: {
        values: [
          "Electronics",
          "Cameras",
          "Laptops",
          "Accessories",
          "Headphones",
          "Food",
          "Books",
          "Sports",
          "Outdoor",
          "Home"
        ],
        message: "Please select a valid product category"
      }
    },
    seller: {
      type: String,
      required: [true, "Please enter the seller of the product"]
    },
    stock: {
      type: Number,
      required: [true, "Please enter the stock for the product"],
      max: [9999, "Stock cannot exceed 9999"]
    },
    numOfReviews: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        rating: {
          type: Number,
          required: true
        },
        comment: {
          type: String,
          required: true
        }
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
