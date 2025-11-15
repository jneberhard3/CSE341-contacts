const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = (req, res) => {
    //#swagger.tags=["Contacts"]
  mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
    //#swagger.tags=["Contacts"]
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid contact id to find a contact.' });
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDatabase()
    .db()
    .collection('contacts')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid contact id to update a contact.' });
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);

    if (response.modifiedCount > 0) {
      return res.status(204).send(); 
    } else if (response.matchedCount === 0) {
      // no contact found with id
      return res.status(404).json({ message: 'Contact not found.' });
    } else {
      // no changes made
      return res.status(200).json({ message: 'No fields were modified.' });
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    return res.status(500).json({ message: 'Error updating contact.', error: error.message });
  }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=["Contacts"]
    if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid contact id to delete a contact.' });
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};