// christopher Esguerra contact.js

import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  contact: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true},
  }
});

export default mongoose.model('contacts', ContactSchema);