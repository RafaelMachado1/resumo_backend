# Express: Request e Response

Agora vamos conversar sobre ***Request*** e ***Response*** com mais profundidade.

Esses dois objetos são fornecidos pela biblioteca Express.js, como vimos anteriormente, e reúnem as informações da **requisição recebida** (req) e a **resposta que será devolvida** (res).

**Obs:** é importante que sempre tipemos **req** e **res** como *Request* e *Response do ‘express’*, **respectivamente, para termos a inteliSense do VSCode e evitar disparos de erro do Typescript.

# Request

As principais propriedades do parâmetro ***req*** representam as diferentes formas que o front pode enviar dados. Repare que acessamos essas propriedades com a notação de `.`:

- **req.headers** - Parâmetros de cabeçalho
- **req.body** - Parâmetros de corpo
- **req.query** - Parâmetros de consulta
- **req.params** - Parâmetros de caminho

Você já praticou o envio de todas essas formas no React como cliente (quem faz a requisição e espera a resposta).

- no cabeçalho enviamos o token
- no corpo enviamos os dados do formulário
- nas urls enviamos os parâmetros de consulta e também de caminho (path params e query params).

Aqui no backend mudaremos a perspectiva e você será o servidor (quem recebe a requisição, processa os dados e devolve a resposta)!

## req.headers

A propriedade **headers** acessa **chaves** passadas no **cabeçalho da requisição. Veremos mais sobre ela futuramente.**

```tsx
app.get('/users', (req: Request, res: Response) => {
	const token = req.headers.authorization
	// continuação do código...
})

```

## req.body

A propriedade **body** acessa **chaves** passadas no **corpo da requisição**:
```JSON
// um exemplo de body JSON em uma requisição de login
{
	"email": "astrodev@email.com",
	"password": "astrodev123"
}
```

## req.query

A propriedade **query** acessa **chaves** passadas por ***query parameters**:*

**`http//localhost:3003/users/search?chave**=**valor**`
```tsx
// no Postman, batendo na url GET http://localhost:3003/users/search?q=fulano

app.get('/users/search', (req: Request, res: Response) => {
		const q = req.query.q
		console.log(q) // "fulano"
		// continuação do código...
});
```

## req.params

A propriedade **params** acessa valores passados por ***path parameters***. Assim como a query params, o valor fica **direto na URL, porém** a chave é descrita no **endpoint**:

```tsx
// no Postman, batendo na url GET http://localhost:3003/users/22

app.get('/users/:age', (req: Request, res: Response) => {
		const age = req.params.age
		console.log(age) // "22" em string, pois todo path params retorna sempre em string
		
		// continuação do código...
});
```

# Response

Os métodos do parâmetro **res**, dadas a ele através da tipagem como *Response*, são responsáveis pelas **informações** que o **back envia para o front**, respondendo à solicitação feita.

Veja os principais abaixo:

- **res.status(n) -** envia uma resposta com status **n**
- **res.send(x)** - responde a requisição com o ****objeto **x**
- **res.end()** -  encerra a requisição sem um *body* na resposta