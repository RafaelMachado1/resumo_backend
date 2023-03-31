# Ordenação de rotas

# Relembrando o Express

![](https://labenu.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0cd52e12-160b-4084-bff1-28b9a95b08ae%2FUntitled.png?id=0c8a54c5-fe43-4975-8943-f931958ff130&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&width=2000&userId=&cache=v2)

**Path Parâmetro** =  Identifica recursos específicos - Obrigatório

**Query Parâmetro** = É um parâmetro de consulta, que é utilizado para  classificar/filtrar determinados recursos  - Opcional

Com o express instalado e configurado, podemos criar nosso primeiro endpoint, seguindo o padrão:

```Typescript
app.method(path, handler);
```
Onde:

### **app**

- constante criada para acessar os recursos do express

### method

- método HTTP utilizado (GET, POST, PUT, DELETE);

### path

- rota/caminho que será utilizado para chegar ao endpoint

### handler

- função que será acionada ao bater no endpoint

# Ordenação das Rotas

Observe os endpoints a seguir e tente imaginar: qual seria a resposta da requisição
**`GET http://localhost:3003/test/hello`**

```Typescript
app.get('/test/:number', (req: Request, res: Response) => {
	res.send(
		`Seu número da sorte é ${Number(req.params.number) + 3}!
	`)
});

app.get('/test/hello', (req: Request, res: Response) => {
	res.send(`Olá, mundo!`);
});
```

Embora a resposta desejada seja "Olá, mundo", o que recebemos no lugar é "Seu número da sorte é NaN!"

Se estivéssemos desenvolvendo uma API complexa, poderíamos demorar muito tempo para perceber que nossa requisição está sendo respondida pela função errada.

Isso acontece porque o **nosso servidor, ao receber uma requisição, percorre todos os endpoints, na ordem em que foram declarados, procurando por uma correspondência.**

Para evitar erros como esse, devemos simplesmente priorizar a declaração de endpoints cujos caminhos possam ser confundidos com ***path parameters***

```Typescript
app.get('/test/hello', (req: Request, res: Response) => {
	res.send(`Olá, mundo!`)
});

app.get('/test/:number', (req: Request, res: Response) => {
	res.send(
		`Seu número da sorte é ${Number(req.params.number) + 3}!
	`);
});
```