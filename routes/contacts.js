const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getSingle);

router.post("/", contactsController.createContact);  //create contact
router.put("/:id", contactsController.updateContact);  //update contact
router.delete("/:id", contactsController.deleteContact);   //delete contact

module.exports = router;
