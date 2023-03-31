"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.get("/courses", (req, res) => {
    res.status(200).send(database_1.courses);
});
app.get("/courses/search", (req, res) => {
    const q = req.query.q;
    const result = q ?
        database_1.courses.filter(item => item.name.toLowerCase().includes(q.toLowerCase()))
        :
            database_1.courses;
    res.status(200).send(result);
});
app.post("courses", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const lessons = req.body.number;
    const stack = req.body.stack;
    const newCourse = {
        id, name, lessons, stack
    };
    database_1.courses.push(newCourse);
    console.log("cursos", database_1.courses);
    res.status(201).send("Curso criado com sucesso");
});
app.get('/students', (req, res) => {
    res.status(200).send(database_1.students);
});
app.get('/students/search', (req, res) => {
    const q = req.query.q;
    const result = database_1.students.filter((student) => {
        return student.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(result);
});
app.post('/students', (req, res) => {
    const { id, name, age } = req.body;
    const newStudent = {
        id,
        name,
        age
    };
    database_1.students.push(newStudent);
    res.status(201).send("Estudante registrado com sucesso");
});
//# sourceMappingURL=index.js.map