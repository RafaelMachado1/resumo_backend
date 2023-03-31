# Status code com Error

Só prossiga caso já tenha visto o material assíncrono ‘Validação de dados no Backend’.

# O atributo .statusCode

O parâmetro `**res`** do Express ****possui um atributo chamado `**.statusCode**`.

Ele começa valendo 200 e é por isso que quando enviamos uma resposta com **`res.send()`** o código já vai como 200 automaticamente.

Agora que temos o fluxo de validação de dados e não estamos mais utilizando o `**res.status().send()**` para responder o erro no **bloco try**, perdemos a possibilidade de enviar um status code para cada tipo de erro.

Temos abaixo um exemplo de um endpoint que busca uma task via id.

```Typescript
app.get("/tasks/:id", (req: Request, res: Response) => {
	try {
    const id = req.params.id // sempre string, então não precisa validar o tipo

		const task = tasks.find((task) => task.id === id)

		if (!task) {
			throw new Error("Task não encontrada") // não conseguimos editar o status code
		}

    res.status(200).send(task)

	} catch(error: any) {
		console.log(error)
		res.status(400).send(error.message) // status code é sempre o 400 genérico
	}
})
```
## Solução

Agora que sabemos que existe a propriedade (atributo) **`.statusCode`**, podemos alterá-la quando detectamos um erro e acessá-la no bloco **catch**.

```Typescript
app.get("/tasks/:id", (req: Request, res: Response) => {
	try {
    const id = req.params.id // sempre string, então não precisa validar o tipo

		const task = tasks.find((task) => task.id === id)

		if (!task) {
			res.statusCode = 404 // definimos um status code apropriado antes do disparo
			throw new Error("Task não encontrada")
		}

    res.status(200).send(task)

	} catch(error: any) {
		console.log(error)
		res.send(error.message) // status code agora varia conforme o atributo .statusCode
	}
})
```

## Também funciona com o res.status()
```Typescript
app.get("/tasks/:id", (req: Request, res: Response) => {
	try {
    const id = req.params.id // sempre string, então não precisa validar o tipo

		const task = tasks.find((task) => task.id === id)

		if (!task) {
			res.status(404) // definimos um status code apropriado antes do disparo
			throw new Error("Task não encontrada")
		}

    res.status(200).send(task)

	} catch(error: any) {
		console.log(error)
		res.send(error.message) // status code agora varia conforme o atributo .statusCode
	}
})
```

## Qual a diferença entre .statusCode e .status()?

O `**.statusCode**` é um atributo numérico do status atual de resposta.

O **`.status()`** é um método que altera o valor do atributo **`.statusCode`**.

# Evitando que erros inesperados devolvam resposta padrão (200)

É só criar uma lógica dentro do catch para que caso o .statusCode ainda esteja valendo 200 ele altere para 400 ou 500. O recomendado é que seja 500 por se tratar de algo que o backend não previu.

```Typescript
app.get("/tasks/:id", (req: Request, res: Response) => {
	try {
    const id = req.params.id // sempre string, então não precisa validar o tipo

		const task = tasks.find((task) => task.id === id)

		throw new Error() // simulando um erro inesperado

		if (!task) {
			res.status(404)
			throw new Error("Task não encontrada")
		}

    res.status(200).send(task)

	} catch(error: any) {
		console.log(error)

		// se chegar ainda valendo 200 sabemos que foi um erro inesperado
		if (res.statusCode === 200) {
			res.status(500) // definimos 500 porque é algo que o servidor não previu
		}

		res.send(error.message)
	}
})
```

# Concluindo

Conforme as validações forem crescendo, o código irá parecer poluído. Mas não se preocupe, pois mais pra frente veremos como lidar com isso. Vamos de passo em passo para entender a evolução do código.