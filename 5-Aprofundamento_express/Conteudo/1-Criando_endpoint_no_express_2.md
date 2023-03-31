# Criando endpoints no Express 2

Continuamos os estudos de criação de endpoints com o cenário de sistema de petshop.

## types.ts

```Typescript
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
## database.ts
```Typescript
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

# GET com path params

Esse tipo de endpoint é utilizado para acessar um recurso específico, sem a semântica de pesquisa com resultados múltiplos. Aqui ou existe um único item ou ele não existe, e é por isso que usamos um dado de identificação no path params (id).

Em resumo, o GET com **path params** é: “quero acessar os dados do pet com id ‘**p001**’”.

- GET http://localhost:3003**/pets/p001**

Já o GET com **query params** que vimos ontem é: “quero pesquisar entre os pets para saber quais possuem o nome ‘Luna’”.

- GET http://localhost:3003**/pets/search?q=luna**

No exemplo a seguir iremos criar o endpoint que busca dados de um pet baseado em sua id, que recebemos via path params.

```Typescript
import { pets } from "./database.ts"

// config do app express aqui (referencie o material async)

app.get('/pets/:id', (req: Request, res: Response) => {
	const id = req.params.id // não precisamos forçar a tipagem aqui, porque todo path params é string

	const result = pets.find((pet) => pet.id === id)

  res.status(200).send(result)
})
src/index.ts
```
## Atenção

Os endpoints que possuem path params precisam ser ordenados no código para não gerar conflito.

Ontem nós desenvolvemos o endpoint **GET com query params** na rota **/pets/search**. Olha só o problema caso a rota com path params seja declarada antes no Express:

- GET **/pets/:id**                            configurado primeiro
- GET **/pets/search**                      configurado por último

Quando uma requisição chegar no servidor:

- GET http://localhost:3003**/pets/p001**
    
    O Express vai identificar que o que vem depois de /pets é um path params (porque ele confere a primeira configuração), logo acionará o handler do GET com path params. Até aqui tudo bem, porque a requisição realmente enviou um valor de id (p001 é a id do Thor).
    
- mas quando quisermos pesquisar com GET http://localhost:3003**/pets/search**?q=luna
    
    O Express vai novamente identificar que o que vem depois de /pets é um path params, logo acionará novamente o handler do GET com path params (a string “search” será usada como o id na busca pelo recurso específico, e sabemos que não era essa a intenção).
    

Para resolver isso, é só detectar se existe chance de conflito (rotas com métodos e caminhos parecidos) e colocar os endpoints com path params no final do código.

## Exemplo de requisição GET com path params

![](https://labenu.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F67b62653-b261-42d5-b79e-79238b4d1e6e%2FUntitled.png?id=04683661-4066-4b2e-9664-eb446e8e43dd&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&width=2000&userId=&cache=v2)
requisição  com path params no POstman

# PUT

Esse tipo de endpoint é utilizado para atualizar (editar) um recurso específico já existente.

Utilizamos o path params para selecionar o item (normalmente via id, porque é único) e usamos o body para receber os dados que serão alterados.

Temos abaixo um endpoint de edição de pet, sendo possível editar a cada requisição todos os campos, alguns deles ou apenas um:

```Typescript
import { pets } from "./database.ts"

// config do app express aqui (referencie o material async)

app.put('/pets/:id', (req: Request, res: Response) => {
		// id do pet que será atualizado chega via path params
    const id = req.params.id

	  // recebemos do body o que será atualizado
	  // todos os dados que podem ser atualizados são opcionais
	  // se precisarmos atualizar só o age por exemplo,
		// não é necessário reenviar os outros (melhor experiência)
		// mas caso precisarmos atualizar mais de um, também é possível
		const newId = req.body.id as string | undefined         // cliente pode ou não enviar id
		const newName = req.body.name as string | undefined     // cliente pode ou não enviar name
		const newAge = req.body.age as number | undefined       // cliente pode ou não enviar age
		const newSize = req.body.size as PET_SIZE | undefined   // cliente pode ou não enviar size

    const pet = pets.find((pet) => pet.id === id)

		// pode ser que o pet não exista com a id informada no path params
		// só é possível editá-lo caso ele exista
    if (pet) {
        // se o novo dado não foi definido, então mantém o que já existe
        pet.id = newId || pet.id
        pet.name = newName || pet.name
        pet.size = newSize || pet.size

				// quando o valor for um número, é possível que seja 0 (que também é falsy)
				// então para possibilitar que venha 0, podemos fazer um ternário
				// o isNaN é uma função que checa se o argumento é um número ou não
				// caso não seja um número o isNaN retorna true, caso contrário false
				// por isso mantemos o antigo (pet.age) no true e atualizamos no false
				pet.age = isNaN(newAge) ? pet.age: newAge
    }

    res.status(200).send("Atualização realizada com sucesso")
})
```

Por enquanto não se preocupe em validar e devolver respostas de erro (”pet não existe com essa id”). Veremos isso amanhã.

Exemplo de requisição no Postman
![](https://labenu.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F7d878ba2-51d2-4f67-9f1d-8be99668a3f7%2FUntitled.png?id=ac11ef23-2c5f-4fe2-a7e9-bc087361246b&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&width=2000&userId=&cache=v2)
print de requisição PUT no Postman


# DELETE

É utilizado para remover um recurso específico. Também utiliza path params para identificar o item a ser deletado.

```Typescript
import { pets } from "./database.ts"

// config do app express aqui (referencie o material async)

app.delete('/pets/:id', (req: Request, res: Response) => {
		// identificação do que será deletado via path params
    const id = req.params.id

		// encontrar o index do item que será removido
    const petIndex = pets.findIndex((pet) => pet.id === id)

		// caso o item exista, o index será maior ou igual a 0
    if (petIndex >= 0) {
				// remoção do item através de sua posição
        pets.splice(petIndex, 1)
    }

    res.status(200).send("Item deletado com sucesso")
})
```

Exemplo de requisição no Postman
![](https://labenu.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9232cebe-d100-4aeb-8b6e-e0105a764136%2FUntitled.png?id=7ff4c6f8-578f-4252-822c-8793145c9e79&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&width=2000&userId=&cache=v2)
print de requisição DELETE no Postman

## Como ficou o código no final
```Typescript
import express, { Request, Response } from 'express';
import cors from 'cors';
import { pets } from './database';
import { PET_SIZE, TPet } from './types';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong!');
});

app.get('/pets', (req: Request, res: Response) => {
  res.send(pets)
})

app.get('/pets/search', (req: Request, res: Response) => {
	const q = req.query.q as string

	const result: TPet[] = pets.filter(
		(pet) => pet.name.toLowerCase().includes(q.toLowerCase())
	)

  res.send(result)
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

// ONTEM FOI FEITO ATÉ AQUI

app.get('/pets/:id', (req: Request, res: Response) => {
	const id = req.params.id 

	const result = pets.find((pet) => pet.id === id)

  res.status(200).send(result)
})

app.put('/pets/:id', (req: Request, res: Response) => {
  const id = req.params.id
    
	const newId = req.body.id as string | undefined         
	const newName = req.body.name as string | undefined    
	const newAge = req.body.age as number | undefined      
	const newSize = req.body.size as PET_SIZE | undefined  

  const pet = pets.find((pet) => pet.id === id)

  if (pet) {
      pet.id = newId || pet.id
      pet.name = newName || pet.name
      pet.age = newAge || pet.age
      pet.size = newSize || pet.size
  }

  res.status(200).send("Atualização realizada com sucesso")
})

app.delete('/pets/:id', (req: Request, res: Response) => {
  const id = req.params.id

  const petIndex = pets.findIndex((pet) => pet.id === id)

  if (petIndex >= 0) {
      pets.splice(petIndex, 1)
  }

  res.status(200).send("Item deletado com sucesso")
})
src/index.ts
```
