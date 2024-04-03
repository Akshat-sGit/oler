import React, { useState } from "react";
const express = require("express");
const route = express.Router();
const User = require("../model/user");
const nodemailer = require("nodemailer");
require("dotenv").config();

const mainroute = () => {
  const [formState, setState] = useState({}); 

  const config = {
  username: "akshatag107@gmail.com",
  password: "74A74BD6026762EBF812F72C50996BCCF0DF",
  host: "smtp.elasticemail.com",
  port: 2525,
  To : 'them@website.com',
  From : "you@isp.com",
  Subject : "This is the subject",
  Body : "And this is the body", 
  }

};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com", // hostname
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASS}`,
  },
});

route.post("/", (req, res) => {
  console.log(req.body);
  let register = new User(req.body);
  register
    .save()
    .then((docs) => {
      res.send(`Successfully Booked your Ride : ${docs}`);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });

  const mailOptions = {
    from: "akshatag107@gmail.com",
    to: req.body.email,
    subject: `New booking from ${req.body.source} to ${req.body.destination}`,
    html: `
            <div style="padding:10px; border-style: ridge">
            <p>New booking from ${req.body.source} to ${req.body.destination} has been booked succesfully.</p> 
            <p>The minimum time required to reach from ${req.body.source} to ${req.body.destination} is - ${req.body.time} minuites.</p>
            <p>The Price you have to pay is - Rs.${req.body.price}.
            <p>Thank you for choosing our services</p>
            <p>Email: ${req.body.email}</p>
            </div>
            `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500);
    } else {
      console.log("E-mail Sent Succesfully !!");
      res.status(200);
    }
  });
});

module.exports = route;
