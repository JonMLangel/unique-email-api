"use strict";

const createError = require('http-errors');
const invariant = require('invariant');
const _ = require('underscore');
const IGNORED_EMAIL_VALUES_REGEX = /(?:\.|\+.*)(?=.*?@gmail\.com)/g; 
/**
 * Returns array of emails that have been transformed to remove characters that we will ignore
 * 
 * @param {Array} emails the emails array
 */
const transformEmailArray = (emails) => {
  let transformedArray = emails.map(email => { 
    return email.replace(IGNORED_EMAIL_VALUES_REGEX, ""); 
  });
  return transformedArray;
};

/**
 * Returns number of unique values, items added to set are always unique
 * @param {Array} array of values to add to set
 */
const countUnique = (array) => {
  return new Set(array).size;
}

/**
 * Returns the number of unique emails.
 *  
 * unique emails in this case are email addresses that will be delivered
 * to the same account using Gmail account matching. Specifically: Gmail
 * will ignore the placement of "." in the username. And it will ignore 
 * any portion of the username after a "+".
 * 
 * @param {Array} emails a list of emails
 */
const filterUniqueEmails = async (emails) => {
  let uniqueEmailCount = 0;
  if (!_.isNull(emails) && !_.isUndefined(emails)) {
    let emailLength = emails.length;
    if (emailLength <= 1) {
      uniqueEmailCount = emailLength;
    } else {
      let transformedEmailArray = transformEmailArray(emails)
      
      uniqueEmailCount = countUnique(transformedEmailArray);
    }
  } else {
    throw new createError('We should not ever get here. Woof');
  }
  return uniqueEmailCount;
};

module.exports = { filterUniqueEmails };
