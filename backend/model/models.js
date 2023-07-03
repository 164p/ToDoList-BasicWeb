const mongoose = require('mongoose');

const TdlSchema = new mongoose.Schema({
  name: {
    type: String,
  }
});

module.exports = tdl = mongoose.model('tdl', TdlSchema);