# Validação de dados no backend

Agora que já vimos o essencial da sintaxe do Express, podemos dar mais atenção à *lógica* dos nossos endpoints. Por exemplo:

- O que acontece quando um **id inválido** é enviado no path params?
- O que acontece quando **dados do body** são inválidos ou não são informados?
- O que acontece quando o **termo de busca** não é enviado no query params?

Essas perguntas ilustram momentos importantes que ainda estamos ignorando no fluxo da nossa aplicação:

1. **Validação dos dados de entrada da requisição**
2. Consulta à base de dados (por enquanto é o nosso database.ts)
3. **Validação dos resultados da consulta**
4. Envio da resposta

# typeof

Podemos utilizar o typeof para verificar o tipo de um valor.

```Typescript
const name = "Astrodev"
console.log(typeof name) // retorna "string"
console.log(typeof name !== "number") // retorna true
```
Com isso é possível validarmos os tipos dos dados de entrada!

```Typescript
app.post("/tasks", (req: Request, res: Response) => {
    const id = req.body.id
		const description = req.body.description

		// esperamos que 'id' seja uma string,
		// então caso venha diferente nós criamos um fluxo de resposta de erro
    if (typeof id !== "string") {
			// usamos o return porque senão o código continuará executando após o if
			// o res.send() não encerra o código, mas o return sim
			return res.status(400).send("'id' deve ser uma string")
		}
   
		// cada validação necessita de um if, por isso é comum que o código cresça
		// quanto mais dados de entrada, mais validações
    if (typeof description !== "string") {
			return res.status(400).send("'description' deve ser uma string")
		}

		const newTask: TTask= {
			id: Date.now(),
			description
		}

		tasks.push(newTask)

		// aqui não precisamos do return porque é a última linha de código
    res.status(200).send("Registro realizado com sucesso")
})
```

# Disparando erros no bloco try/catch

Você pode perceber no código acima que estamos retornando uma resposta para cada bloco if de validação. Chega uma hora que o código fica visivelmente poluído, dificultando a análise do que é resposta de sucesso e o que é resposta de erro.

Uma maneira de contornar esse problema é disparar erros dentro de um bloco try/catch para centralizar a manipulação dos erros. No bloco try temos o caso de sucesso, onde tudo deu certo (caminho feliz) e no bloco catch temos a resposta do erro.

```Typescript
app.post("/tasks", (req: Request, res: Response) => {
	try {
    const id = req.body.id
		const description = req.body.description

    if (typeof id!== "string") {
			// disparando um erro e mandando uma mensagem como argumento
			// não precisamos do return porque o disparo já encerra a execução do try
			// quando o bloco try é encerrado com um disparo de erro, o catch é acionado
			throw new Error("'id' deve ser uma string")
		}
   
    if (typeof description !== "string") {
			throw new Error("'description' deve ser uma string")
		}

		const newTask: TTask= {
			id: Date.now(),
			description
		}

		tasks.push(newTask)

    res.status(200).send("Registro realizado com sucesso")

	// por enquanto tipamos o error como any para evitar problemas de tipagem
	} catch(error: any) {
		console.log(error) // print do erro no terminal para facilitar o debug
		res.status(400).send(error.message)
	}
})
```

Perceba que o código fica mais legível, com os fluxos de sucesso e erro bem distintos.

Quando atiramos um erro dentro de um bloco **try**, a execução do bloco é interrompida e retomada no bloco **catch**, dentro do qual teremos acesso ao erro. A classe `**Error**`, assim como a classe **`Date`**, é nativa do JS. Ela também recebe um parâmetro (opcional) ao ser instanciada: uma mensagem (string) que podemos utilizar para personalizar a resposta de erro.

Um bom back-end prevê a grande maioria dos erros, então é comum que a validação dos dados fique bem extensa no código, não se preocupe caso sinta isso.

# Validação das regras de negócio

Toda aplicação possui suas **regras de negócio**, que são decisões estratégicas que garantem o sucesso do projeto.

Por exemplo: visando a segurança dos dados, podemos pedir às pessoas que se cadastrarem no nosso site para criarem senhas com pelo menos 8 caracteres com letras maiúsculas e minúsculas ao mesmo tempo, além de no mínimo um número e também um caractere especial.

Outro exemplo: para estar de acordo com a lei, devemos verificar a idade de clientes, pois bebidas alcóolicas só podem ser vendidas para maiores de idade.

Mais um: para não estressar nosso banco de dados desnecessariamente, forçamos que a criação de um post deve sempre possuir pelo menos um caractere.

As regras de negócio têm potencial para serem muito numerosas, então é aqui que se concentra a maior parte das validações.

Trouxemos alguns exemplos abaixo para te inspirar:

## Senhas com pelo menos 8 caracteres e no máximo 12, com letras maiúsculas e minúsculas ao mesmo tempo, além de no mínimo um número e também um caractere especial

Esse tipo de validação utiliza REGEX (expressões regulares).

[https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions)
Normalmente não criamos elas, apenas referenciamos na internet.

Para esse exemplo estamos utilizando uma encontrada no stack overflow:
[https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a](https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a)

```Typescript
// endpoint de mudança de password
try {
  const password = req.body.password 

	// se envio no body é opcional (como no PUT por exemplo), precisamos desse primeiro if
	if (password !== undefined) {

		// validamos que é uma string
	  if (typeof password == "string") {
			throw new Error("'password ' deve ser uma string")
		}
	
		// o método de string .match() verifica se existe o padrão,
		// caso exista ele retorna um array com os valores encontrados
		// caso não exista ele retorna null (por isso o !)
		if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
			throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
		}
	}

	// continuação do código...

} catch(error: any) {
	console.log(error) // print do erro no terminal para facilitar o debug
	res.status(400).send(error.message)
}
```

## Somente maiores de idade podem comprar bebidas alcóolicas
```Typescript
// endpoint de compra de bebidas alcóolicas
try {
  const age = req.body.age

	// se envio no body é opcional (como no PUT por exemplo), precisamos desse primeiro if
	if (age !== undefined) {

		// validamos que é um number
	  if (typeof age !== "number") {
			throw new Error("'age' deve ser um number")
		}
	
		if (age < 18) {
			throw new Error("Somente maiores de idade podem comprar bebidas alcóolicas")
		}
	}
	
	// continuação do código...

} catch(error: any) {
	console.log(error) // print do erro no terminal para facilitar o debug
	res.status(400).send(error.message)
}
```

## Posts devem possuir pelo menos um caractere em seu texto

```Typescript
// endpoint de criação de post
try {
  const text = req.body.text

	// se envio no body é opcional (como no PUT por exemplo), precisamos desse primeiro if
	if (text !== undefined) {

		// validamos que é uma string
	  if (typeof text !== "string") {
			throw new Error("'text' deve ser uma string")
		}
	
		if (text.length < 1) {
			throw new Error("'text' deve possuir no mínimo 1 caractere")
		}
	}

	// continuação do código...

} catch(error: any) {
	console.log(error) // print do erro no terminal para facilitar o debug
	res.status(400).send(error.message)
}
```

## Contas não devem repetir cpf (um cpf por conta)

```Typescript
// endpoint de cadastro de cliente
try {
  const cpf = req.body.cpf

	// se envio no body é opcional (como no PUT por exemplo), precisamos desse primeiro if
	if (cpf !== undefined) {

		// validamos que é uma string
	  if (typeof cpf !== "string") {
			throw new Error("'cpf' deve ser uma string")
		}
	
		// verificamos no array clients se já existe esse cpf cadastrado
		const clientExists = clients.find((client) => client.cpf === cpf)
	
		if (clientExists) {
			throw new Error("'cpf' já cadastrado") // se já existir quebramos o fluxo com erro
		}
	}

	// continuação do código...

} catch(error: any) {
	console.log(error) // print do erro no terminal para facilitar o debug
	res.status(400).send(error.message)
}
```

Nesses exemplos utilizamos o body como entrada, mas a ideia é a mesma para qualquer dado de input (query params, path params, etc). Aqui vai algumas dicas:

- no body sempre devemos duvidar do que chega (quem fez a requisição pode ter enviado qualquer tipo de dado)
- no path params sempre receberemos uma string
- no query params sempre receberemos uma ou mais strings (por enquanto)

Mais pra frente veremos autenticação e como validar tokens.