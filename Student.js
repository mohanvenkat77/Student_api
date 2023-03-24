const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  id:{
    type:Number,
  },
  name: {
    type: "string",
  },
  currentClass: {
    type: Number,
  },
  division: {
    type: "string",
  },
});
module.exports = mongoose.model("Student", StudentSchema);
