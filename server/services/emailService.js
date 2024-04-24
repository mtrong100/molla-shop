import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_ACCOUNT,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendConfirmationEmail = async (email, token) => {
  const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333333;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff ;
            text-decoration: none ;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }
          .btn:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thanks for creating a Molla shop account!</h1>
          <p>Verify your email so you can get up and running quickly.</p>
          <a href="${verificationLink}" class="btn">Verify Email</a>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: '"Molla shop 👻" <MollaShop@gmail.com>',
    to: email,
    subject: "Verify your email",
    text: `Thanks for creating a account. Verify your email so you can get up and running quickly.`,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const sendOtpResetPassword = async (email, otp) => {
  const mailOptions = {
    from: '"ZenWander 👻" <ZenWander99@gmail.com>',
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is`,
    html: `<h1>${otp}</h1>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Failed to send email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const sendEmailCompletePurchase = async (
  orderItems,
  shippingAddress,
  shippingType,
  details
) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 20px;
          }

          h2 {
            color: #4CAF50;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          th {
            background-color: #f2f2f2;
          }

          img {
            max-width: 100px;
            max-height: 100px;
          }

          p {
            line-height: 1.6;
          }

          strong {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>Thank you ${shippingAddress?.fullName} for your purchase!</h1>
        <p>Hello, We are thrilled to let you know that your order has been successfully placed. Below are the details of your purchase:</p>
        
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            ${orderItems
              .map(
                (item) => `
              <tr>
                <td>
                  <div style="margin: 0 auto;">
                    <img src="${item?.image}" alt="${item?.name}">
                  </div>
                </td>
                <td>${item?.name}</td>
                <td>${item?.quantity}</td>
                <td>$${(item?.price * item?.quantity).toFixed(2)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div>Payment Method: ${details?.paymentMethod}</div>
        <div>Shipping Type: ${shippingType?.type} : ${
    shippingType?.price
  }$</div>
        <div>Coupon Code Apply: ${details?.couponCodeApply}</div>

        <h2>Total: $${details?.totalCost}</h2>
        
        <p>Thank you for choosing our products. If you have any questions or concerns, feel free to contact us.</p>
        
        <p>Best Regards,<br>Molla Shop Team</p>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: '"Molla Shop 👻" <shop-e-commerce@gmail.com>',
    to: shippingAddress?.email,
    subject: "Order Confirmation",
    text: "Thank you for your purchase! Your order details are attached.",
    html: htmlContent,
  });
};
