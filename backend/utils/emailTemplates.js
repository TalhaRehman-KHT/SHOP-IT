export const getResetPasswordTemplate = (username, resetUrl) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            color: #333;
          }
          .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .button {
            background-color: #3498db;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
          }
          .footer {
            margin-top: 40px;
            font-size: 12px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h2>Hello, ${username}</h2>
          <p>You have requested to reset your password for your ShopIt account.</p>
          <p>Please click the button below to reset your password. This link will expire soon for your security.</p>
          <a class="button" href="${resetUrl}" target="_blank">Reset Password</a>
          <p>If the button doesn’t work, copy and paste the following link into your browser:</p>
          <p><a href="${resetUrl}" target="_blank">${resetUrl}</a></p>
          <p>If you didn’t request this, you can safely ignore this email.</p>
  
          <div class="footer">
            &copy; ${new Date().getFullYear()} ShopIt. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;
  };
  