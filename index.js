const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Student = require("./Student");
app.use(express.json());
app.use(bodyParser.json());
const mongoose = require("mongoose");
const { application } = require("express");
mongoose
  .connect("mongodb://localhost:27017/Student")
  .then(() => console.log("mongoDB connectedddd"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hiii");
});

app.get("/api/student", async (req, res) => {
  try {
    const data = await Student.find();
    console.log(data.length);
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/student/:id", async (req, res) => {
  const Id = req.params;
  try {
    const data = await Student.find({ id: Id.id });
    // console.log(data.length,data.length <= 0)
    if (data.length === 0) {
      return res.status(404).send("Inavlid Id");
    }
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/student/:id", async (req, res) => {
  const Id = req.params;
  try {
    const data = await Student.findOneAndDelete({ id: Id.id });
    if (data === null) {
      return res.status(404).send("Inavlid Id");
    }
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/student", async (req, res) => {
  const { name, currentclass, division } = req.headers;
  console.log(currentclass, division);
  if (!name || !currentclass || !division) {
    return res.status(400).send("Invalid data");
  }
  const data = await Student.find();

  const id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  try {
    const ndata = new Student({
      id,
      name,
      currentClass: currentclass,
      division,
    });
    await ndata.save();
    return res.status(200).send({ id });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/api/student/:id", async (req, res) => {
  const { name, currentclass, division } = req.headers;

  if (!name || !currentclass || !division) {
    return res.status(400).send("Invalid data");
  }
  const Id = req.params;
  try {
    console.log("jii");
    const dat = await Student.findOneAndUpdate(
      { id: Id.id },
      { id: Id.id, name, currentClass: currentclass, division },
      { new: true }
    );
        if(dat === null ){
            return res.status(404).send("Inavlid Id")
        }
    return res.status(200).send(dat);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5001, (err) => {
  if (!err) {
    console.log("server running");
  } else {
    console.log("error", err);
  }
});
