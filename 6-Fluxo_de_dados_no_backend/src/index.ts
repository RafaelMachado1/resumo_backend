import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'
import { ACCOUNT_TYPE } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

// 1° Exercício  Refatorar para o uso do bloco try/catch
// validação de resultados
// Caso nenhuma account seja encontrada na pesquisa por id, retornar um erro 404
// Mensagem de erro: "Conta não encontrada. Verifique a 'id."
app.get("/accounts/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id // não precisa verificar o tipo pq path params sempre vem como string
        const result = accounts.find((account) => account.id === id)

        if (!result) {
            res.status(404) // pode ser feito assim -> res.statusCode = 404
            throw new Error("Conta não encontrada. Verifique a 'id'.") //inserindo no erro caso não tenha result
        }
        res.status(200).send(result) //caso encontre o usuário o código conclui aqui com usuário encontrado

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) { // Para erros que não conseguimos prever(É SEMPRE BOM FAZER!!!!)
            res.status(500)
        }
        res.send(error.message)
    }
})


// 2° Exercício Refatorar para o uso do bloco try/catch
// Validação de input
// Caso a id recebida não inicie com a letra 'a' será retornado um erro 400
// Mensagem de erro: "'id' inválido. Deve iniciar com a letra 'a'"
app.delete("/accounts/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (id[0] !== "a") {
            res.status(400)
            throw new Error("'id' inválido. Deve iniciar com a letra 'a'.")

        }
        const accountIndex = accounts.findIndex((account) => account.id === id)

        if (accountIndex >= 0) {
            accounts.splice(accountIndex, 1)
        } else {
            res.status(404).send("Conta não existe. Verifique o 'id'")
        }

        res.status(200).send("Item deletado com sucesso")
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) { // Para erros que não conseguimos prever(É SEMPRE BOM FAZER!!!!)
            res.status(500)
        }
        res.send(error.message)
    }
})


// 3° Exercício Edit account 
// Refatorar para o uso do bloco try/catch
// req.body.balance (newBalance)
//  Deve ser um number 
//  Deve ser maior ou igual a zero

app.put("/accounts/:id", (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const newId = req.body.id
        const newOwnerName = req.body.ownerName
        const newBalance = req.body.balance
        const newType = req.body.type

        // req.body.balance (newBalance)
        // Deve ser number
        // Deve ser maior ou igual a zero
        if (newBalance !== undefined) {
            if (typeof newBalance !== "number") {
                res.status(400)
                throw new Error("'balance' deve ser do tipo number")
            }
            if (newBalance < 0) {
                res.status(400)
                throw new Error("'balance' deve ser maior ou igual a zero")
            }
        }

        // req.body.type (newType)
        // deve valer um dos tipos de conta do enum
        if (newType !== undefined) {
            if (
                newType !== ACCOUNT_TYPE.GOLD &&
                newType !== ACCOUNT_TYPE.BLACK &&
                newType !== ACCOUNT_TYPE.PLATINUM
            ) {
                res.status(400)
                throw new Error("'type' deve ser um tipo válido: Ouro, Platina ou Black");
            }
        }

        //Exercício de fixacao
        // req.body.id (newId)
        // string que inicia com a letra ‘a’
        if (newId !== undefined) {
            if (newId[0] !== "a") {
                res.status(400)
                throw new Error("'id' inválido. Deve iniciar com letra 'a'");
            }
        }
        //Exercício de fixacao
        // req.body.ownerName (newOwnerName)
        // string com no mínimo 2 caracteres
        if (newOwnerName !== undefined) {
            if (typeof newOwnerName !== 'string') {
                throw new Error("'ownerName' deve ser uma string")
            }
            if (newOwnerName.length < 2) {
                throw new Error("'ownerName' deve ser possuir no mínimo 2 caracteres");
            }
        }


        const account = accounts.find((account) => account.id === id)

        if (account) {
            account.id = newId || account.id
            account.ownerName = newOwnerName || account.ownerName
            account.type = newType || account.type

            account.balance = isNaN(newBalance) ? account.balance : newBalance
        }

        res.status(200).send("Atualização realizada com sucesso")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})
