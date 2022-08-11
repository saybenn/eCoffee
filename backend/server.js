import express from "express";
import Stripe from "stripe";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
import Order from "./models/orderModel.js";
import { google } from "googleapis";
import { notFound, errorHandler } from "./middle/errorMiddleware.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//Image Uploading
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//Node Mailer
//Google Api/OAuth Setup
const OAuth2 = google.auth.OAuth2;
const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.GOOGLE_P,
      accessToken,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });

  return transporter;
};

//Client Email
app.post("/send_mail", cors(), async (req, res) => {
  const sendEmail = async (emailOptions) => {
    try {
      let emailTransporter = await createTransporter();
      await emailTransporter.sendMail(emailOptions);
    } catch (error) {
      console.log(error);
    }
  };

  sendEmail({
    subject: req.body.subject,
    to: process.env.EMAIL,
    from: req.body.email,
    html: `<div class="email">
  <div style="background: #333; padding: 1.5rem; color: white;"class="heading"><h2>${req.body.name} has sent you a message form eCo Coffee Shop</h2></div>
  <div style="padding: .5rem 2rem 2rem; border: 1px solid #333; background: white;" class="body"><p>${req.body.text}</p>
  <p>${req.body.email}</p></div></div>`,
  });
});

//Receipt/Thank You Email
app.post("/send_thankyou", cors(), async (req, res) => {
  const sendEmail = async (emailOptions) => {
    try {
      let emailTransporter = await createTransporter();
      await emailTransporter.sendMail(emailOptions);
    } catch (error) {
      console.log(error);
    }
  };

  let content = req.body.order.orderItems.reduce(function (a, b) {
    return (
      a +
      '<tr style="border-collapse: collapse; border-bottom: 1px solid #333; border-top: 1px solid #333;"> <td style="padding: .2rem; border-right: 1px solid #333;">' +
      b.name +
      '</td> <td style="padding: .2rem; border-right: 1px solid #333;"> ' +
      b.qty +
      '</td><td style="padding: .2rem; border-right: 1px solid #333;"> $' +
      (b.qty * b.price).toFixed(2) +
      "</td></tr>"
    );
  }, "");

  sendEmail({
    subject: "Your eCo order has been received!",
    to: process.env.EMAIL,
    from: process.env.EMAIL,
    html:
      `<div class="email">
  <div style="background: #333; padding: 1.5rem; color: white;"class="heading"><h2>Thanks for shopping with us!</h2></div>
  <div style="padding: .5rem 2rem 2rem; border: 1px solid #333; background: white;" class="body"><h4>Hi ${req.body.order.user.name},</h4>
    <p>We've received your order and it's now being processed.</p>
  <h3 style="color: #333">Order #${req.body.order._id}</h3>
<table style="width:65%; border: 1px solid #333; border-collapse: collapse;">
  <tr style="padding:.5rem;">
    <th style="border: 1px solid #333; border-collapse: collapse;">Product</th>
    <th style="border: 1px solid #333; border-collapse: collapse;">Quantity</th>
    <th style="border: 1px solid #333; border-collapse: collapse;">Price</th>
    
  </tr>` +
      content +
      ` 
  <tr style="border-bottom: 1px solid #333;">
    <td colspan="2" style="border-right: 1px solid #333; padding: .2rem;"><strong>Tax:</strong></td>
    <td>$${req.body.order.taxPrice.toFixed(2)}</td>
  </tr>
  <tr style="border-bottom: 1px solid #333;">
    <td colspan="2" style="border-right: 1px solid #333; padding: .2rem;"><strong>Shipping:</strong></td>
    <td>$${req.body.order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr style="border-bottom: 1px solid #333;">
    <td colspan="2" style="padding: .2rem; border-right: 1px solid #333; "><strong>Subtotal:</strong></td>
    <td>$${req.body.order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
    <td colspan="2" style="border-right: 1px solid #333; padding: .2rem;"><strong>Total:</strong></td>
    <td>$${req.body.order.totalPrice}</td>
  </tr>
</table>
<div class="footer">
  <div class="shipping">
    <h3>Shipping Address</h3>
    <div style="border: 1px solid #333; padding: .1rem;">
      <p>${req.body.order.user.name}<br>${
        req.body.order.shippingAddress.address
      }<br>${req.body.order.shippingAddress.city}, ${
        req.body.order.shippingAddress.state
      } ${req.body.order.shippingAddress.postalCode}<br>${
        req.body.order.user.email
      }</p>
    </div>
  </div>
  <p>Thanks for shopping with eCo!</p>
</div>
</div>
</div>`,
  });
});

//Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = async (id) => {
  const order = await Order.findById(id);
  return +(order.totalPrice * 100).toFixed(2);
};

app.post("/create-payment-intent", async (req, res) => {
  const { id, name, email } = req.body;
  const customer = await stripe.customers.create({
    name,
    email,
  });

  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    amount: await calculateOrderAmount(id),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    customer: paymentIntent.customer,
    paymentIntent: paymentIntent,
  });
});

//Build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

//Error Routes
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} port ${PORT}`)
);
