//  Create token and save cookies

export default (user, statusCode, res) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIES_EXPIRE_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        // sameSite: "Lax", // optional, good for basic CSRF protection
        // secure: process.env.NODE_ENV === "PRODUCTION" // cookie sent only on HTTPS in production
    };

    res.status(statusCode)
       .cookie("token", token, options)
       .json({
            success: true,
            token,
            user
        });
};
