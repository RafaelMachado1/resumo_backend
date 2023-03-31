# Criando endpoints no Express

Para iniciar a criação de endpoints vamos imaginar que temos um sistema de petshop que apenas cadastra os bichinhos de estimação de clientes.

O servidor só precisa armazenar o nome, idade e tamanho do pet. Para iniciar os testes da aplicação foram populados (criados) 4 pets no array mock.

```typescript
## types.ts
export enum PET_SIZE {
	SMALL = "Pequeno porte",
	MEDIUM = "Médio porte",
	LARGE = "Grande porte"
}

export type TPet = {
	id: string,
	name: string,
	age: number,
	size: PET_SIZE
}

Tipagem da entidade Pet
```

```Typescript
database.ts
import { PET_SIZE, TPet } from "./types";

export const pets: TPet[] = [
	{
		id: "p001",
		name: "Thor",
		age: 5,
		size: PET_SIZE.MEDIUM
	},
	{
		id: "p002",
		name: "Lili",
		age: 10,
		size: PET_SIZE.SMALL
	},
	{
		id: "p003",
		name: "Pingo",
		age: 3,
		size: PET_SIZE.LARGE
	},
	{
		id: "p004",
		name: "Luna",
		age: 7,
		size: PET_SIZE.MEDIUM
	}
]
array mock de Pet
```

Com essas informações em mente, partiu criar os endpoints!

# GET sem query

É o mais simples de todos, esse tipo de endpoint é usado para buscar dados sem precisar especificar algum filtro ou consulta.

Aqui vamos devolver todos os pets cadastrados.

```Typescript
import { pets } from "./database.ts"

// config do app express aqui (referencie o material async)

// endpoint GET sem query
// o path é "/pets"
app.get('/pets', (req: Request, res: Response) => {
  res.status(200).send(pets)
})

Configuração de endepoint GET sem query. Fazer no index.ts
```

# GET com query

Possibilita a busca por parte de um recurso através de consultas.

A variável query é determinada pelo servidor (quem recebe a requisição) e o valor da query é enviada pelo cliente (quem faz a requisição) na url da requisição.

Exemplo:

- eu, cliente, quero pesquisar na google por resultados com o termo “**typescript**”
    - logo, faço um GET na url [https://www.google.com/search**?q=typescript**](https://www.google.com/search?q=typescript)
    - o nome da query é “**q**” e seu valor é “**typescript**”
        - a google escolheu o nome “**q**” arbitrariamente (abreviação de query)
        - caso eu tente enviar com um outro nome irá disparar erro
    - o backend da google recebe a requisição e usa o que chegou na query “**q**” para gerar os resultados da pesquisa

No nosso projeto de petshop o endpoint também irá receber o termo de busca na **query params “q”** e filtrará o nome dos pets procurando por semelhanças.

Esse tipo de consulta normalmente é **case insensitive**, ou seja, as letras estarem maiúsculas ou minúsculas não afetam o resultado: AbC é igual a aBc.

```Typescript
import { TPet } from "./database"

// config do app express aqui (referencie o material async)

// endpoint GET com query q
// o path é "/pets/search"
app.get('/pets/search', (req: Request, res: Response) => {
	const q = req.query.q as string // forçamos a tipagem aqui*

	const result: TPet[] = pets.filter(
		(pet) => pet.name.toLowerCase().includes(q.toLowerCase())
	)

  res.status(200).send(result)
})

Configuração de endpoint GET com query
```

***podemos forçar tipagens no typescript utilizando a sintaxe “as”:**

O query params pode ser estruturado de diversas maneiras na requisição e o typescript sabe disso. É por isso que sem o “as” dá erro de tipagem (pode ou não ser string).

Para iniciarmos os estudos vamos considerar que será sempre enviada a forma mais simples de query (string). Já já veremos como lidar com esse problema sem precisar burlar o typescript.

Lembre-se de testar o endpoint no Postman (o app deve estar rodando).

## Exemplo de requisição GET com query params q no Postman

![](https://labenu.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9c71b94c-1f47-4a50-80bb-c996a9f8d47f%2FUntitled.png?id=cba980dc-140c-46ae-8dad-6e1eac4aadae&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&width=2000&userId=&cache=v2)
Print de requisição GET com query params q no Postman

# POST

Usamos esse tipo de endpoint para criar um novo recurso.

Nesse caso iremos cadastrar um novo pet.

```Typescript
import { pets } from "./database.ts"
import { PET_SIZE, TPet } from './types'

// config do app express aqui (referencie o material async)

// endpoint POST
// o path é "/pets"
// podemos repetir o path, desde que o método seja diferente
// temos 1 GET /pets e 1 POST /pets
app.post('/pets', (req: Request, res: Response) => {
	// forçamos novamente a tipagem
	const id = req.body.id as string
	const name = req.body.name as string
	const age = req.body.age as number
	const size = req.body.size as PET_SIZE

	const newPet: TPet = {
		id,
		name,
		age,
		size
	}

	pets.push(newPet)

  res.status(201).send("Cadastro realizado com sucesso")
})
Configuração de endpoint POST
```

Ainda não temos um banco de dados real, então toda vez que o aplicativo reiniciar perderemos o cadastros feitos fora do código do database.ts. Mas não se preocupe, veremos persistência semana que vem!

Lembre-se de testar o endpoint no Postman (o app deve estar rodando).

# Como ficou o código no final
```Typescript
import express, { Request, Response } from 'express'
import cors from 'cors'
import { pets } from './database'
import { PET_SIZE, TPet } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
});

app.get('/pets', (req: Request, res: Response) => {
    res.status(200).send(pets)
})

app.get('/pets/search', (req: Request, res: Response) => {
	const q = req.query.q as string

	const result: TPet[] = pets.filter(
		(pet) => pet.name.toLowerCase().includes(q.toLowerCase())
	)

  res.status(200).send(result)
})

app.post('/pets', (req: Request, res: Response) => {
	const id = req.body.id as string
	const name = req.body.name as string
	const age = req.body.age as number
	const size = req.body.size as PET_SIZE

	const newPet: TPet = {
		id,
		name,
		age,
		size
	}

	pets.push(newPet)

  res.status(201).send("Cadastro realizado com sucesso")
})

Código do src/index.ts
```