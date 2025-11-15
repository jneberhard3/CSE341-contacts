const { body } = require('express-validator');

exports.validateContact = [
  body('firstName')
    .notEmpty().withMessage('First name is required')
    .isString().withMessage('First name must be a string'),

  body('lastName')
    .notEmpty().withMessage('Last name is required')
    .isString().withMessage('Last name must be a string'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid'),

  body('favoriteColor')
    .optional()
    .isString().withMessage('Favorite color must be a string'),

  body('birthday')
    .notEmpty().withMessage('Birthday is required')
    .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/)   //using US date format MM/DD/YYYY
    .withMessage('Birthday must be in MM/DD/YYYY format')
    .customSanitizer(value => {
      // convert to ISO string before saving (optional)
      const [month, day, year] = value.split('/');
      return `${year}-${month}-${day}`;  // "YYYY-MM-DD"
    })
];