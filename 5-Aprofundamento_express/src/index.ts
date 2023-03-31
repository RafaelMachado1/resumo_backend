import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { COURSE_STACK, TCourse, TStudent } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//End Point para retornar o array courses do database
app.get("/courses", (req: Request, res: Response) => {
    res.status(200).send(courses)
})

//End Point que faz consulta
app.get("/courses/search", (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = q ?
        courses.filter(item => item.name.toLowerCase().includes(q.toLowerCase())
        )
        :
        courses;

    res.status(200).send(result)
})

// End Point que cria um objeto
app.post("courses", (req: Request, res: Response)=> {
    const id: string = req.body.id;
    const name: string = req.body.name;
    const lessons: number = req.body.number;
    const stack: COURSE_STACK = req.body.stack;

    const newCourse: TCourse = {
        id, name, lessons, stack
    }

    courses.push(newCourse)
    console.log("cursos", courses)
    res.status(201).send("Curso criado com sucesso")
})




///////////////////////////////////////////////////////////////////////////////
//Exercício de fixação

//End Point para retornar o array TStudents do database
app.get('/students', (req: Request, res: Response)=>{
    res.status(200).send(students)
})

//End Point que faz consulta
app.get('/students/search', (req: Request, res: Response)=>{
    const q = req.query.q as string

    const result = students.filter((student)=>{
        return student.name.toLowerCase().includes(q.toLowerCase())
    })

    res.status(200).send(result)
})

// End Point que cria um newStudent
app.post('/students', (req: Request, res: Response)=>{
    const {id, name, age} = req.body as TStudent

    const newStudent = {
        id,
        name,
        age
    }

    students.push(newStudent)
    res.status(201).send("Estudante registrado com sucesso")
})