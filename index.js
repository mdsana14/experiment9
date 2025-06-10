const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let students = [];
let idCounter = 1;

// CREATE
app.post('/students', (req, res) => {
  const student = {
    id: idCounter++,
    name: req.body.name,
    age: req.body.age
  };
  students.push(student);
  res.json(student);
});

// READ ALL
app.get('/students', (req, res) => {
  res.json(students);
});

// READ ONE
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send("Student not found");
  }
});

// UPDATE
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (student) {
    student.name = req.body.name;
    student.age = req.body.age;
    res.json(student);
  } else {
    res.status(404).send("Student not found");
  }
});

// DELETE
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    res.send("Deleted");
  } else {
    res.status(404).send("Student not found");
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the express- Student API!');
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
