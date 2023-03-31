## Instalando e configurando o Express

*Express* é uma biblioteca de código JS, adotada para simplificar a construção de APIs.

Para adicionar o *Express* como dependência, usamos o comando:

```Bash 
npm install express 
```

Devemos também adicionar a versão tipada dessa biblioteca como dependência de desenvolvimento  - afinal, estamos usando o Typescript:

``` Bash
npm install @types/express -D
 ```

O próximo passo é inicializar o servidor. Fazemos isso importando e invocando, no nosso index.ts, a função que a biblioteca exporta por padrão.

```tsx
//importando o express 👇🏽

import express from 'express';

//invocando a função express() dentro da variável app 👇🏽
const app = express();

```


### CORS

Instalaremos, também, uma *lib* auxiliar chamada ***CORS*** (*Cross-Origin Resource Sharing*) que nos permite enviar requisições de uma página estática (front), hospedada localmente, para um servidor HTTP (back), também executado localmente.
```Bash
npm install cors
npm install @types/cors -D
```
Acima, os comandos para instalar as bibliotecas CORS e também sua versão tipada(lembre-se de instalar a vesão tipada como dependências de desenvolvimento!).


### TS NODE DEV

Instale a lib **ts-node-dev** e crie um script chamado **dev** que executa o arquivo **index.ts** diretamente.
```Bash
npm install ts-node-dev -D
```
Instalação do ts-node-dev como dependência de desenvolvimento

Configure o script no arquivo package.json:

```JSON
"scripts": {
    "start": "tsc && node build/index.js",
    "dev": "ts-node-dev src/index.ts"
},
```
script do arquivo package.json

Agora é só executar o script e aproveitar.

Toda vez que o código for modificado e salvo, o terminal irá automaticamente reiniciar o aplicativo. Bem parecido com o Live Server e o React, mas agora lidando com servidor backend.

## Configurando o Express

### Atenção!

Antes de prosseguir, adicione a linha destacada a seguir no arquivo tsconfig.json:
```JSON
{
    "compilerOptions": {
        "target": "ES6", /* Specify ECMAScript target version */
        "module": "commonjs", /* Specify module code generation */
        "sourceMap": true, /* Generates corresponding '.map' file. */
        "outDir": "./build", /* Redirect output structure to the directory. */
        "rootDir": "./src", /* Specify the root directory of input files. */
        "removeComments": true, /* Do not emit comments to output. */
        "noImplicitAny": true, /* Raise error on declarations with an implied 'any' type. */
        "noEmitOnError": true, /* Disable emitting files if any type checking errors are reported. */
        "esModuleInterop": true /* Adicione essa linha < */
    }
}
```
A flag esModuleInterop nos permite importar módulos com o mesmo padrão utilizado no React.

### Middlewares no Express

São as funções que podemos configurar o funcionamento do “como” os dados vão entrar e sair da API.

### Configurando os middlewares

Agora precisamos configurar dois serviços (ou *middlewares*): um para converter o body das nossas respostas para o formato json (usando o próprio express), e outro para habilitar o CORS:

```tsx
//além de importar o express, também precisamos importar os objetos Request
//e Response, sempre entre chaves {} 👇🏽
import  express, { Request, Response} from 'express'

//import do CORS 👇🏽
import cors from 'cors';

//criação do servidor express 👇🏽
const app = express();

//configuração do middleware que garante que nossas respostas estejam sempre
//no formato json 👇🏽
app.use(express.json());

//configuração do middleware que habilita o CORS 👇🏽
app.use(cors());
```

Finalmente, faremos o servidor escutar alguma porta da nossa máquina. O método que usamos para isso recebe, como segundo parâmetro, um callback que podemos utilizar para sinalizar que a aplicação está pronta

```tsx
//colocando nosso servidor para escutar a porta 3003 da nossa máquina (primeiro 
//parâmetro da função listen)
//a função de callback (segundo parâmetro da função listen) serve para sabermos 
//que o servidor está de pé, através do console.log que imprimirá a mensagem no 
//terminal 👇🏽
 
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

```

## Sintaxe de Criação de endpoints

Com o express instalado e configurado, podemos criar nosso primeiro endpoint, seguindo o padrão:

```tsx
app.method(path, handler);
```
Onde:

### **app**

- constante criada para acessar os recursos do express

### method

- método HTTP utilizado (GET, POST, PUT, DELETE)

### path

- caminho, ou url, que será utilizado para chegar ao endpoint (sempre entre aspas!)

### handler

- callback que será acionado ao bater no endpoint

O *handler* recebe dois parâmetros que representam, respectivamente, a ***requisição*** recebida do front e a ***resposta*** enviada pelo back.

## Criando um endpoint de teste

Veja um exemplo de endpoint abaixo:

```tsx
app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong!')
});
```
Utilizamos o app, escolhemos o método get, indicamos o path ‘/ping’ e declaramos a função handler (que recebe nossos parâmetros req e res, respectivamente tipados como Request e Response)

# Como ficou no final
```tsx
import express, { Request, Response} from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});
```
## Iniciando o servidor

É só executar o script de start.

**Enquanto a aplicação estiver rodando**, podemos verificar o resultado no **Postman**!

**GET http://localhost:3003/ping**

Ou então **abrir direto no navegador**, pois toda página carregada é um **GET**.

[**http://localhost:3003/ping**](http://localhost:3003/ping)

