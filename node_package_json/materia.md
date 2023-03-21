# Node.js e package.json

# Introdução

Quando estamos no front-end, todo nosso código Javascript é **executado pelo navegador**. Isto é, dentro do navegador há um **interpretador de JS** que **executa** nosso código enquanto o navegador está aberto. Isso acontece tanto nos códigos de Javascript “puro”, quanto nos códigos em React. Para rodar e instalar o React usamos o `npm run dev`, mas o que realmente acontece quando rodamos o **************npm run start**************? Para entender isso, vamos falar de ********Node********.

## Node.js

O Node é um **motor de execução de Javascript** que funciona de forma **independente do navegador**. É como se tivéssemos removido apenas o motor de um carro para usá-lo em qualquer outra construção. O Node utiliza a *engine* V8 criada pelo Google para interpretar o código JS e teve rápido crescimento e adoção pela comunidade dada sua performance e facilidade de uso. Para **gerenciar as bibliotecas** do Node, utilizamos o ******npm****** (Node Package Manager, ou Gerenciador de Pacotes do Node).

O NPM vem junto com o Node e sua principal função é **gerenciar as dependências** do projeto. Além disso, o NPM permite a criação e execução de instruções ou conjuntos de instruções (scripts).

Todas essas funções são geradas por um arquivo que já vimos durante os projetos de React: o famoso ************************`package.json`************************

## package.json

O package.json fica **na pasta raiz** do projeto e é utilizado pelo NPM como **guia de dependências**. Ele é um arquivo que guarda informações e configurações, tais como:

- o nome do projeto;
- quem o criou;
- as **dependências** do projeto (quais bibliotecas precisam estar instaladas);
- os scripts (como start, test, build e afins).

Os scripts podem ser executados com o comando:

### Dependências do projeto

As dependências do projeto são divididas em dois tipos:

- **[Dependencies](https://docs.npmjs.com/files/package.json#dependencies)**
    - Dependências para que o projeto **seja executado** (ou seja, dependências que **precisam** estar na versão final do projeto que o cliente irá usar)
- ******************************[devDependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#devdependencies)******************************
    - Dependências para que o projeto **seja desenvolvido** (ou seja, dependências que **não precisam** estar na versão final do projeto, pois somente devs as utilizam)

# Criando um package.json

No front-end, quando criamos uma aplicação React usando o `create-react-app` ou o `vite`, o arquivo `package.json` é criado automaticamente. No entanto, também podemos criá-lo manualmente utilizando o ******npm (******útil caso o projeto não tenha um template pronto como o create-react-app).

As duas formas mais simples de fazer isso são utilizando os comandos abaixo:  
`npm init`

**👆🏾** cria um package.json (com valores padrão)

Funciona em todos os SO.

# Rodando um back-end com Node **⚙️**

No back-end nós **não estamos mais no navegador** e por isso **não temos acesso** aos métodos nativos do mesmo, tais como: *`alert`*, *`confirm`*, *`prompt`* e *`localStorage`.* Tudo que rodaremos agora acontecerá diretamente no terminal.

Nesse início de back, os dados serão salvos na memória dos processos enquanto a aplicação estiver rodando, como se fosse um state do React. Em breve aprenderemos a ********************************************persistir informações******************************************** utilizando Banco de Dados. **🤓**

Nesse primeiro momento nosso back-end pode receber argumentos utilizando uma propriedade do Node chamada ************************process.argv************************.

O **process.argv** é nativo do Node e consiste em um **array de strings** recebidas como argumentos do comando.

Os dois primeiros argumentos são fixos:

- **`process.argv[0]`**: o primeiro argumento é o **próprio Node**
- **`process.argv[1]`**: o segundo argumento é o **arquivo** que vamos executar
- A partir do **`process.argv[2]`**, nós podemos atribuir valores

Abaixo, dois exemplos:

`node nomeDoArquivo valor1`

👆🏾 process.argv[0] é o Node, process.argv[1] é nomeDoArquivo e process.argv[2] é valor1.

`node index.js Labenu`

👆🏾 Neste caso, se pedirmos um console.log do process.argv[2], o terminal exibirá a string Labenu.

Essa lógica também é utilizada nos comandos bash, tais como: cd, ls, mkdir, touch, etc.

Quando lançamos o famoso `**git clone url-do-repo**` o terminal entende o que deve ser feito baseado na posição dos argumentos. **[0]** é **git, [1]** é **clone** e **[2]** é **url-do-repo**.

Começamos a entender agora como os comandos são interpretados nas CLI (*command line interface*).

❗ ***Atenção:** o `process.argv` é um **array de STRINGS**, então, mesmo que você digite um número, no comando ele sempre vai chegar como string. Bem parecido com o `<input />` no front.*

# Criando scripts personalizados

Durante o front-end nós utilizamos o comando **npm run start** para executar os projetos. Mas quem criou esse script?

O comando `create-react-app` baixa um template totalmente configurado que traz alguns scripts já prontos.

Mas agora que estamos no back, precisamos entender como **configurar nossos próprios scripts**, pois o `package.json` criado manualmente vem apenas com um chamado **test** (que não faz nada além de imprimir no terminal uma mensagem genérica de erro).

Por padrão, a área de scripts vem preenchida desta forma **👇🏾**:

```
{
   "name": "exemplo",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
   },
   "keywords": [],
   "author": "",
   "license": "ISC"
  }
```

Podemos adicionar múltiplos scripts, com comandos personalizados 👇🏾:

```
{
   "name": "exemplo",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
    "start": "clear && node ./index.js",
		"dev": "comando a ser executado no terminal",
		"build": "comando a ser executado no terminal",
		"bananinha": "comando a ser executado no terminal",
   	"serve": "comando a ser executado no terminal",
		"test": "comando a ser executado no terminal"
   },
   "keywords": [],
   "author": "",
   "license": "ISC"
  }
```

Assim, é possível criar sequências de comandos (sem necessariamente lembrar de todos eles) e chamar essas sequências por um nome reduzido e fácil de ser memorizado (que é o tal do script 😉).

Se executarmos **npm run start** (ou **npm start**), o terminal irá automaticamente executar o que foi escrito no package.json: **`clear && node ./index.js`**

A forma abreviada (**npm start**) só funciona para o **start**. Nos outros scripts é necessário utilizar a forma completa: `**npm run nome-do-script**`.

Existe uma convenção de nomes importantes:

- **dev** é para iniciar a aplicação em modo de desenvolvimento (facilita para codar)
- **test** é para testar a aplicação
- **build** é para montar a versão que será disponibilizada
- **start** é para iniciar o aplicativo na versão que será disponibilizada
- **serve** é para deployar

Mas também podemos dar nomes arbitrários, afinal, quem define os scripts é **você**, dev. 🤩

# Módulos

Caso queira realizar *imports* e *exports* no Javascript, é necessário adicionar a propriedade “type” valendo “module” no `package.json`! **👇🏾**

```
{
   "name": "exemplo",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "type": "module",
   "scripts": {
    "start": "clear && node ./index.js"
   },
   "keywords": [],
   "author": "",
   "license": "ISC"
}
```
Olhe acima a propriedade “type”. Com ela podemos usar *imports* e *exports* no back-end.

Lá no React essa configuração é ativada debaixo dos panos pelo template do **create-react-app** (mesmo não aparecendo no **package.json** dele).