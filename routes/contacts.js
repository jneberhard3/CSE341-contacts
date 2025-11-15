const express = require("express");
const router = express.Router();
const { validateContact } = require('../middleware/contactValidation');
const handleValidationErrors = require('../middleware/handleValidationErrors');
const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getSingle);

router.post("/", validateContact, handleValidationErrors, contactsController.createContact);
router.put("/:id", validateContact, handleValidationErrors, contactsController.updateContact);//update contact
router.delete("/:id", contactsController.deleteContact);   //delete contact

module.exports = router;
