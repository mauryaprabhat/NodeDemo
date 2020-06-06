const express = require('express');
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is started at ${port}`));

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },
    { id: 5, name: 'course5' }
];

/// Get base request to test the api end point
app.get('/', (req, res) => {
    res.send('Welcome to Node JS demo!');
});

/// Get all the courses 
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

/// Get request for courses by id
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(i => i.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Given Id for course NOT found!');
    res.send(course);
    //  res.send(req.params.id);
});

/// POST request to update the courses

app.post('/api/courses', (req, res) => {

    //get the resouce
    const id = parseInt(req.body.id);
    if (!id) return res.status(400).send('Given course Id is not valid');
    const course = courses.find(index => index.id === id);
    if (!course) return res.status(404).send('Given course is NOT found!');

    course.name = req.body.name;
    res.status(200).send(`Course ${course.name} is with id ${id}  updated successfully `);
});

/// Delete request to delete the courses
app.delete('/api/courses', (req, res) => {

    //get the resouce
    const id = parseInt(req.body.id);
    if (!id) return res.status(400).send('Given course Id is not valid');
    const course = courses.find(index => index.id === id);
    const index = courses.indexOf(course);
    if (!course) return res.status(404).send('Given course is NOT found!');
    //delete the course by index
    courses.splice(index, 1);
    res.status(200).send(`Course ${course.name} is with id ${id}  deleted successfully `);
});