/** @format */

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			default: "",
			required: true,
		},
		lastName: {
			type: String,
			default: "",
			required: true,
		},
		email: {
			type: String,
			default: "",
			required: true,
		},
		phone: {
			type: String,
			default: "",
			required: true,
		},
		subject: {
			type: String,
			default: "",
			required: true,
		},
		description: {
			type: String,
			default: "",
			requird: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("contact", contactSchema);
