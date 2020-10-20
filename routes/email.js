"use strict";

const express = require("express");
const router = express.Router();
const createError = require('http-errors');

const Joi = require('Joi');
const EmailService = require("../services/email");

const uniqueEmailInputSchema = Joi.object().keys({
    emails: Joi.array().items(
        Joi.string().email()
    )
})

router.post("/api/emails/unique", async (req, res, next) => {
    try {
        let value;
        try {
            value = await uniqueEmailInputSchema.validateAsync(req.body);
        } catch (error) {
            throw new createError(400, error);
        }

        const uniqueEmailResponse = {
            uniqueEmailAddressCount: EmailService.filterUniqueEmails(value.emails)
        }

        res.json(uniqueEmailResponse);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
