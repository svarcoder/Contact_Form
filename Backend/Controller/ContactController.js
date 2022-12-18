/** @format */

const express = require("express");
const router = express.Router();
const Contact = require("../Model/Contact");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "Mail",
		pass: "Password",
	},
});

exports.contactView = async (req, res) => {
	await Contact.find()
		.then((result) => {
			return res.status(201).json({
				success: true,
				messege: "Done",
				contactData: result,
			});
		})
		.catch((err) => {
			console.log(err);
			return res.status(404).json({
				success: false,
				messege: "Error in APi",
				error: err,
			});
		});
};

exports.addContact = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			messege: errors.array(),
		});
	}

	const { firstName, lastName, email, phone, subject, description } = req.body;

	let newContact = new Contact({
		firstName,
		lastName,
		email,
		phone,
		subject,
		description,
	});

	await newContact
		.save()
		.then(async (result) => {
			await transporter
				.sendMail({
					to: result.email,
					from: "",
					subject: "User's Query",
					html: `
        <p>Dear Sir,&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>
         
       
		<p><span style="color: #3366ff;"><strong>Thank You for conecting ${
			result.firstName + " " + result.lastName
		}.</strong></span></p>
		<p><span style="color: #3366ff;"><strong>User's Details </strong></span></p>
		<p><span style="color: #3366ff;"><strong>Email: ${
			result.email
		} </strong></span></p>
		<p><span style="color: #3366ff;"><strong>Phone: ${
			result.phone
		} </strong></span></p>
		<p><span style="color: #3366ff;"><strong>Subject: ${
			result.subject
		} </strong></span></p>
		<p><span style="color: #3366ff;"><strong>Description:${
			result.description
		} </strong></span></p>
	
                
                  `,
				})
				.then((save) => {
					console.log("Mail", save);
				})
				.catch((err) => {
					console.log("Error in Mail", err);
				});

			return res.status(201).json({
				success: true,
				messege: "Done",
			});
		})
		.catch((err) => {
			console.log("error", err);
			return res.status(400).json({
				success: false,
				messege: "Error in APi",
				error: err,
			});
		});
};
