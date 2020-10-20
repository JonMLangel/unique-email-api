"use strict";

const get = require("lodash/get");
const EmailService = require("../services/email");
const express = require("express");
const router = express.Router();
const createError = require('http-errors');
const invariant = require('invariant');

router.post("/api/emails/unique", async (req, res, next) => {
  try {
    try {
        // since it's a simple service, we'll use invariant, normally Joi or express-validator would be my first options
        invariant(!!req.body.emails, 'emails array is required for this operation');
    } catch (error) {
      throw new createError(400, error);
    }

    const uniqueEmailResponse = await EmailService.filterUniqueEmails(req.body.emails);
    
    res.json(uniqueEmailResponse);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
