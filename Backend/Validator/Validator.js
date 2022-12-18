const { body } = require("express-validator");

exports.myValidations = [
	body("firstName", "Please Provide First Name").isString(),
	body("lastName", "Please Provide Last Name").isString(),
	body("email", "Please Provide Right Email").isEmail(),
	body("phone", "Please Provide Phone No. in 10 Digit").isLength({
		min: 9,
		max: 10,
	}),
	body("subject", "Please Provide Subject").isString(),
	body("description", "Please Provide Description").isString(),
];
