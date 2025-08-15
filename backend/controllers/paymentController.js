import catchAsyncError from "../middleware/catchAsyncError.js";
import Stripe from "stripe";
import Order from "../models/order.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ==========================
// Create Checkout Session
// Path: /api/v1/payment/checkout_session
// ==========================
export const stripeCheckoutSession = catchAsyncError(async (req, res, next) => {
    const body = req.body;

    const line_items = body?.orderItems?.map((item) => ({
        price_data: {
            currency: "cad",
            product_data: {
                name: item?.name,
                images: [item?.image],
                metadata: { productId: item?.product }
            },
            unit_amount: Math.round(item?.price * 100)
        },
        tax_rates: ["txr_1RuRT4BDWmzRleobPYLlyRj8"], // example tax rate ID
        quantity: item?.quantity
    }));

    const shippingInfo = body?.shippingInfo;

    const shipping_rate = body?.itemsPrice >= 200
        ? "shr_1RuRGxBDWmzRleobXhrnOxTr" // free shipping
        : "shr_1RuRHyBDWmzRleoblpzVKUdm"; // paid shipping

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/me/orders?order_success==true`,
        cancel_url: `${process.env.FRONTEND_URL}`,
        customer_email: req?.user?.email,
        client_reference_id: req?.user?._id?.toString(),
        metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
        shipping_options: [{ shipping_rate }],
        line_items
    });

    res.status(200).json({ url: session.url });
});

// ==========================
// Helper: Get Order Items
// ==========================
const getOrderItems = async (lineItems) => {
    const cartItems = [];

    for (const item of lineItems.data) {
        const price = await stripe.prices.retrieve(item.price.id);
        const product = await stripe.products.retrieve(price.product);

        cartItems.push({
            product: product.metadata.productId,
            name: product.name,
            price: price.unit_amount / 100,
            quantity: item.quantity,
            image: product.images[0]
        });
    }

    return cartItems;
};

// ==========================
// Webhook Endpoint
// Path: /api/v1/payment/webhook
// ==========================
export const stripeWebhook = catchAsyncError(async (req, res, next) => {
    const signature = req.headers["stripe-signature"];

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
            expand: ["data.price.product"]
        });

        const orderItems = await getOrderItems(lineItems);
        const user = session.client_reference_id;

        const totalAmount = session.amount_total / 100;
        const taxAmount = session.total_details.amount_tax / 100;
        const shippingAmount = session.total_details.amount_shipping / 100;
        const itemPrice = Number(session.metadata.itemsPrice) || 0; // match schema name exactly

        const shippingInfo = {
            address: session.metadata.address,
            city: session.metadata.city,
            phoneNo: session.metadata.phoneNo,
            zipCode: session.metadata.zipCode,
            country: session.metadata.country,
        };

        const paymentInfo = {
            id: session.payment_intent,
            status: session.payment_status
        };

        const orderData = {
            shippingInfo,
            orderItems,
            itemPrice, // ✅ fixed: match schema name
            taxAmount,
            shippingAmount,
            totalAmount,
            paymentInfo,
            paymentMethod: "CARD", // ✅ fixed: match enum exactly
            user
        };

        try {
            await Order.create(orderData);
            console.log(`✅ Order created for user ${user}`);
        } catch (dbErr) {
            console.error("❌ Failed to create order:", dbErr);
            return res.status(500).send("Order creation failed");
        }
    }

    res.json({ received: true });
});

