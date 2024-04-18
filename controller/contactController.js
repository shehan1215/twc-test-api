const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel");

//@route GET /api/contacts
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  console.log(contacts);
  console.log(req.user.id);
  res.status(200).json(contacts);
});

//@route GET /api/contacts/:id
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Unavailable");
  }
  res.status(200).json(contact);
});

//@route POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
  console.log("body of:", req.body);
  const { name, email, phone, gender } = req.body;
  if (!name || !email || !phone || !gender) {
    res.status(400);
    throw new Error("Fill the all fields");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    gender,
    user_id: req.user.id,
  });
  const contacts = await Contact.find({ user_id: req.user.id });
  console.log(contacts);

  res.status(201).json(contact);
});

//@route PUT /api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Unavailable");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("you can't Update other user Contacts!");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//@route DELETE /api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Unavailable");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("you can't Delete other user Contacts!");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {getContacts,createContact,getContact,updateContact,deleteContact,};
