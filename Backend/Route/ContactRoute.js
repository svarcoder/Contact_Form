/** @format */

const express = require("express");
const { addContact, contactView } = require("../Controller/ContactController");
const { myValidations } = require("../Validator/Validator");
const router = express.Router();

router.post("/api-add-user", myValidations, addContact);
router.get("/api-view-user", contactView);

module.exports = router;
