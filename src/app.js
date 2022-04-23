const express = require('express');
const path = require('path');
const hbs = require('hbs');
const Student = require('./models/students');
require("./models/students")

require("./db/conn")
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.set('view engine', 'hbs');
app.set("views", template_path);
hbs.registerPartials(partials_path);

// console.log(static_path);
// app.use(express.static(static_path));

app.get("", (req, res) => {
  res.render('index')
})

app.get("/register", (req, res) => {
  res.render('register')
})

app.get("/homepage", (req, res) => {
  res.render('homepage')
})

app.get("/login", (req, res) => {
  res.render('login')
})

//registration part in mongoDB

app.post("/register", async(req, res) => {
  try {
    const password = req.body.password
    const cpassword = req.body.cnfpassword
 
    if (password === cpassword) {
      console.log("password match")
      const registerStudent = new Student({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        address: req.body.address,
        phone: req.body.phone,
        password: req.body.password,
        confirmpassword: req.body.cnfpassword,
        course: req.body.course
      })
      console.log(`data coming here , ${registerStudent}`)
      const createStudent = await registerStudent.save();
      res.status(201).render("homepage")
      console.log("successfully added ")
    } else {
      res.send("password are not matching")
    }
  }
  catch (err) {
    res.status(400).render(err)
  }
})

app.listen(port, () => {
  console.log(`listening to the port no at ${port}`);
})