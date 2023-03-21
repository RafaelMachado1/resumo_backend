# Relembrando Linguagens de Programação

Antes de conhecermos o **Typescript**, vamos falar um pouco sobre ****************************************************linguagens de programação****************************************************!

# Linguagens de programação

As linguagens de programação são um **conjunto de sintaxes** que permitem a **comunicação humana com a máquina**. Foram feitas para que o ser humano conseguisse se comunicar diretamente com o computador **sem precisar conhecer cada detalhe** de seu funcionamento.
Elas acessam cada posição de memória e solicitam que o processador realize ações que nós não precisamos nos preocupar em detalhar.

Computadores como os nossos utilizam majoritariamente valores binários e hexadecimais; chamamos esta forma de comunicação de **linguagem de máquina**. A linguagem de máquina trata diretamente de endereços de memória e impulsos elétricos.

![Exemplo de linguagem de máquina](https://labenu.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0addbfec-bee3-4383-aecf-56ae4e60a141%2FUntitled.png?id=65a57869-0b7b-4772-8873-2ce2d6b80690&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&width=1340&userId=&cache=v2)

Exemplo de linguagem de máquina

As linguagens de programação podem ser classificadas de acordo com o seu **nível de abstração**. Abaixo as formas mais comuns:

- **Baixo nível** (**LLL** - *Low Level Language*): linguagens de programação que se aproximam da **linguagem de máquina**, sendo menos amigáveis a humanos. Exemplo: **Assembly**

![Exemplo de código ********Assembly 👆🏾********](https://labenu.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0aae7830-a58c-4292-aeb0-f25f6f4b4a52%2FUntitled.png?id=756cf5bd-a697-4a63-99ff-a42bca85182b&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&width=1340&userId=&cache=v2)

Exemplo de código ********Assembly 👆🏾********

- **Alto nível** (**HLL** - *High Level Language*): linguagens de programação que se aproximam da **linguagem humana**. ****Exemplos: **Javascript**, **Typescript**, **Java** e **Python**

![Exemplo de código ********Javascript 👆🏾********](https://labenu.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F60b6def4-78d7-4682-83f9-f9c3f61ed80b%2FUntitled.png?id=7313b51d-cc2b-41c6-ae68-75703e0c4945&table=block&spaceId=f97190af-c9c2-4592-9ae2-6311b6b728de&width=2000&userId=&cache=v2)

Exemplo de código ********Javascript 👆🏾********

No fim das contas, **as linguagens de programação sempre precisarão transformar o código em linguagem de máquina**, então precisamos transformá-las em valores de máquina.

O processo de transformar uma linguagem de alto nível ****em linguagem de máquina é chamado de **compilação**. O código gerado por ele é um **executável** (como um `.exe`, por exemplo).

Nos navegadores, a compilação do código-fonte é feita em **tempo de execução** (*runtime*), gerando um arquivo temporário que é, então executado. Esse processo recebe o nome de **interpretação.**

Há certos momentos em que precisamos **converter uma HLL para outra**, antes de realizar a compilação. A esse processo, damos o nome de **transpilação.**

Resumindo:

- **compilação:** transforma HLL em linguagem de máquina
- **interpretação:** gera um arquivo temporário que será executado/compilado em tempo de execução
- **transpilação:** transforma uma HLL em outra HLL antes da compilação




# Typescript: Transpilação e Configuração

# Typescript e Transpilação

Para apresentar a linguagem que usaremos no módulo de Backend, vamos lembrar um pouco do Javascript, que você já conhece bem.

O Javascript é uma **linguagem dinâmica** e isso significa que podemos enviar um argumento booleano para uma função mesmo que ela esteja esperando por uma string, por exemplo, gerando erros de execução de tipo.

```jsx
function imprimeTudoMaiusculo(text) { // espera por uma string
	console.log(text.toUpperCase()) // usa função de string (.toUpperCase())
}

imprimeTudoMaiusculo(true) // argumento booleano em vez de string
```

Alguns erros comuns são:

- **Passar tipos errados de valor** para funções (passar strings ou booleanos para uma função de soma, por exemplo);
- **Trocar duas letras** de uma variável (sem querer);
- **Errar o nome** de uma props ou de algo dentro do state;

Já o **Typescript** é uma linguagem **fortemente tipada** (falaremos de tipos mais para frente) que surgiu para diminuir a quantidade de erros cometidos ao usarmos o JS.

Com ele podemos descobrir erros **durante** a escrita de código!

Seu funcionamento depende de sua **transpilação** para Javascript. Isto é, o código escrito é convertido para JS no **build** de produção: código transformado em outro código.

No fim das contas, Typescript se torna JS e isso permite que ele funcione em todo e qualquer navegador e sistema operacional em que o Javascript é executado.

Bora conhecer o Typescript (ou TS, como vamos chamá-lo frequentemente)

## Instalando o Typescript

Primeiro, vamos instalar o Typescript globalmente (uma única vez):

- No Windows:

```bash
npm install -g typescript
```

- No MacOS e Linux:

```bash
sudo npm install -g typescript
```

A partir de hoje, vamos iniciar cada novo projeto **instalando o TS** com o seguinte comando 👇🏾:

```bash
npm i typescript -D
```

A opção -D significa que é uma dependência de desenvolvimento (devDependencies) e não deve ser instalada em produção (a build deployada), pois só usamos no ambiente de dev. Inclusive é bom manter em mente que o TS não implementa nada por si só, **seu objetivo é facilitar a codagem**.

Por fim, nossos arquivos trabalhados a partir de agora terão a extensão **`.ts`**

## Instalando as tipagens do Node

Esse pacote é necessário para utilizar ferramentas nativas do Node dentro do Typescript.

```tsx
npm i @types/node -D
```

## Transpilando um arquivo

Como dissemos há pouco, **transpilar** significa **converter** um código fonte em outro, ou seja, a pessoa escreve o código fonte em uma linguagem, que após ser transpilado gerará um código equivalente em outra linguagem.

Em nosso caso, a idéia é **codar em Typescript** para evitar erros durante a escrita do código e **transpilar** esses arquivos `**.ts**` para Javascript (assim, nosso projeto pode ser rodado em qualquer navegador ou SO que execute JS).

O arquivo `**.js**` gerado pelo processo de transpilação será criado em local determinado por nós durante a configuração (mostrada com mais detalhes na seção **“Configurando o Typescript”**). ****

Para fazer o processo de transpilação manual e simples, usamos o comando abaixo👇🏾

```json
npx tsc nome-do-arquivo.ts
```

A partir desse processo, teremos um arquivo `**nome-do-arquivo.js**` baseado no `**nome-do-arquivo.ts**` escrito por nós.

## Configurando o Typescript

Acima, vimos como podemos transformar um arquivo Typescript em um arquivo Javascript. Em um projeto com vários arquivos o processo de transpilação manual é trabalhoso.

Por isso vamos criar um **arquivo de configuração** chamado **`tsconfig.json`** dentro da pasta raiz do nosso projeto, usando o comando  a seguir: 

```bash
npx tsc --init
```

Configurando esse arquivo, só precisamos **criar um script** que usa o comando **`tsc`** e depois executa os arquivos `**.js**` que forem criados!

Abaixo temos um exemplo de como ficaria um ************************package.json************************ após criarmos esse script:

```json
{
   "name": "exemplo",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   **"scripts": {
     "test": "echo \"Error: no test specified\" && exit 1",
		 "start": "tsc && node ./build/index.js"
   },**
   "keywords": [],
   "author": "",
   "license": "ISC"
}

```

Voltando a olhar para o nosso arquivo de configuração TS, o `**tsconfig.json**` vem com diversas configurações possíveis que podem variar entre os projetos. Para a maioria dos aplicativos aqui da Labenu utilizaremos as configurações abaixo:

```json
{
    "compilerOptions": {
        "target": "es6",            /* Specify ECMAScript target version */
        "module": "commonjs",       /* Specify module code generation */
        "sourceMap": true,          /* Generates corresponding '.map' file. */
        "outDir": "./build",        /* Redirect output structure to the directory. */
        "rootDir": "./src",         /* Specify the root directory of input files. */
        "removeComments": true,     /* Do not emit comments to output. */
        "noImplicitAny": true,      /* Raise error on declarations with an implied 'any' type. */
        "noEmitOnError": true,        /* Disable emitting files if any type checking errors are reported. */
     }
}
```

**Obs:** o arquivo gerado pelo comando `**npx tsc --init**` traz várias outras linhas de configuração. Você pode deixar essas linhas como estão e apenas descomentar e alterar as propriedades apontadas acima.




# Typescript: Tipos e Tipagem

# Tipos no Typescript

Agora que tudo está configurado podemos começar a entender a **principal diferença** entre o JS e o TS:

- Tipos!

## Tipando Variáveis

No TS usamos os mesmos **declaradores** do Javascript: **`const`**, **`let`** e **`var`** (lembrando que o `var` é um declarador mais antigo e que, por boas práticas, evitamos utilizar desnecessariamente). 
No entanto, no TS precisamos **adicionar mais uma informação**: o tipo da variável, colocado logo após o nome.

```tsx
const company**: string** = "Labenu";
let age**: number** = 5;
let isPasswordCorrect**: boolean** = false;
```

Acima, o **tipo** da variável **company** é `**string**`, da variável **age** é `**number`** e da variável **isPasswordCorrect** é `**boolean**`

## Tipando Arrays e Objetos

Para ************arrays************, temos duas opções de sintaxe:

```tsx
const arrayDeNums1**: Array<number>** = [1, 2, 3];
const arrayDeNums2**: number[]** = [1, 2, 3];

const arrayDeStrg1**: Array<string>** = ["1", "2", "3"];
const arrayDeStrg2**: string[]** = ["1", "2", "3"];
```

Para **objetos**, a tipagem é feita na **declaração**. Colocamos os tipos em cada propriedade, como mostrado abaixo:

```tsx
const person: { **name: string, age: number** } = {
	name: "Astrodev",
	age: 30
}
```

### O tipo `any`

O **`any`** é um tipo especial que **deve ser evitado**, pois usá-lo significa dizer para o TS não se preocupar com a tipagem daquele valor.

Mesmo assim, às vezes ele é nossa única opção - e falaremos sobre esses momentos mais pra frente.

O tipo **`any`** indica que a variável **pode assumir qualquer valor**, se comportando como no Javascript (o mundo sem leis).

```tsx
let aux: any;
aux = "aux";
aux = 0;
aux = true;
aux = {};
aux = [1, 2, 3];
```

No exemplo, a variável aux assume diversos tipos sem nenhum problema. Seu comportamento se torna totalmente dinâmico e sem tipagem.

## Tipando funções

No Javascript podemos criar uma função que recebe dois números e chamá-la passando duas strings, por exemplo. Isso abre margem para bugs!

No **Typescript** podemos **tipar a entrada (parâmetros) e a saída (retorno) da função.** Dessa forma, evitamos casos como o descrito acima, ou seja: forçamos a tipagem correta e o TS nos avisa se algo estiver fora do previsto.

Temos abaixo uma função **`sum`** que **recebe dois parâmetros**: **`n1`** e **`n2`**, ambos números:

```jsx
//Em Javascript, com parâmetros e retorno ************************não-tipados************************

function sumJS**(n1, n2)**{
	return a + b;
}
```

```tsx
//Em typescript, com parâmetros e retorno tipados
function sumTS**(n1: number, n2: number): number** {
	return a + b;
}
```

Ambas possuem o mesmo comportamento, porém no TS você nunca irá errar a tipagem na chamada da função. Experimente chamá-las enviando booleanos como argumentos e veja o que acontece.

## Tipo Void

Quando declaramos uma função que **não possui retorno**, o tipo do retorno dela será **`void`**

```tsx
function sayHello(name: string): void {
	console.log("Hello,", name || "World")
}
```

## Parâmetros opcionais

Parâmetros opcionais são declarados usando **`?`**

```tsx
function sayHello(name?: string): void {
	console.log("Hello,", name || "World")
}
```

## Criando tipos reutilizáveis para objetos

Mais cedo no material, conversamos sobre a **tipagem de objetos.** No entanto, aquela forma pode se tornar muito trabalhosa caso tenhamos um objeto com muitas propriedades.

O typescript possui três maneiras de tipar objetos:

- de forma anônima, como visto anteriormente
- com type (foco aqui por enquanto)
- com interface (faz a mesma coisa que type, com algumas exceções)

Para facilitar a leitura do código nesse início de estudos, crie o padrão de sempre nomear seus tipos com a letra T maiúscula inicial em um formato PascalCase.

```tsx
export type TPerson = { 
	name: string, 
	age: number
}

// utilizando este tipo, nosso objeto fica assim:
const person: TPerson = {
	name: "Astrodev",
	age: 30
}

// olha só como fica sem um type (tipagem anônima)
const person: {
	name: string,
	age: number
} = {
	name: "Astrodev",
	age: 30
}

// com um type o código fica mais limpo e também ganhamos a reutilização da tipagem (podemos usar o TPerson quando quisermos)
```

## Array de tipos personalizados

```tsx
export type TPerson = { 
	name: string, 
	age: number
}

// utilizando este tipo, nosso array fica assim:
const persons: TPerson[] = [
	{
		name: "Astrodev",
		age: 30
	},
	{
		name: "Fulana",
		age: 22
	},
	{
		name: "Ciclano",
		age: 45
	}
]
```

## Extra: tipando callbacks

Para declararmos **métodos** e **callbacks** , usamos uma **sintaxe** parecida com a **arrow function.** Abaixo a estrutura base de uma tipagem de callback:

```tsx
function method(
condition: boolean, //condition, do tipo **************boolean**************
callback: () => void //callback, do tipo "função que não recebe parâmetros e retorna **void**
): void {
	if (condition) { callback() }
}
```

Por hoje é isso! Mas calma, ainda não terminamos de conhecer o Typescript! 🤠