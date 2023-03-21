/*
  RESUMO  
1 - criando packege.json
//Criando um arquivo package.json
// npm init -> com opção para editar
// npm init -Y -> cria o package.json padrão

2 - Instalando Typescript globalmente 
No Windows       -> npm install -g typescript
No MacOS e Linux -> sudo npm install -g typescript

3 - A partir de hoje, vamos iniciar cada novo projeto instalando o TS com o seguinte comando 👇🏾:
npm i typescript -D

4 - Instalando as tipagens do node /necessário para utilizar ferramentas nativas do Node dentro do Typescript.
npm i @types/node -D

5 - Vamos criar um arquivo de configuração chamado tsconfig.json 
dentro da pasta raiz do nosso projeto, usando o comando  a seguir:
npx tsc --init
*/

// 6 - Configurando o Typescript
// {
//     "compilerOptions": {
//       "target": "es6",            /* Specify ECMAScript target version */
//        "module": "commonjs",       /* Specify module code generation */
//        "sourceMap": true,          /* Generates corresponding '.map' file. */
//        "outDir": "./build",        /* Redirect output structure to the directory. */
//        "rootDir": "./src",         /* Specify the root directory of input files. */
//        "removeComments": true,     /* Do not emit comments to output. */
//        "noImplicitAny": true,      /* Raise error on declarations with an implied 'any' type. */
//        "noEmitOnError": true,        /* Disable emitting files if any type checking errors are reported. */
//     }
// }

/*
7 - criando script que usa o comando tsc para transpilar os arquivos para JS
 e depois executa os arquivos **.js** que forem criados! ao executar o script ele faz a transpilação automática

    "start-frota": "tsc && node ./build/tipando/index.js",
    "start-ex-1": "tsc && node ./build/fixacao/exercicio1/index.js",
    "start-ex-2": "tsc && node ./build/fixacao/exercicio2/index.js",
    "start-ex-3": "tsc && node ./build/fixacao/exercicio3/index.js"
*/
//------------------------------------------------------------------------------------------------------------------

// Veja abaixo os tipos que já aprendemos até agora 👇🏾
// String
const nome: string = "Rafael";
console.log(nome)

// Boolean
const online: boolean = true
console.log(online)

// Number
const age: number = 21
console.log(age)

// Arrays
const arr: Array<number> = [1, 2, 3];
//ou
const array: number[] = [1, 2, 3];
console.log(arr)
console.log(array)

// Objetos
const person: { name: string, age: number} = { 
    name: "Astrodev", 
    age: 30
};
console.log(person)

// Any
let aux: any;
aux = "Oi";
aux = 12;
console.log(aux)



// Agora, vamos conhecer mais tipos! 😎
// ## UNION TYPE
// Para variáveis poderem assumir valores de **`undefined`** ou **`null`**, podemos colocar esses valores 
// diretamente no tipo ou usar o chamado ***union type***, inserindo uma **`|`** entre os tipos:
let text: string | undefined;
let message: string | null = null;



// ### RELEMBRANDO OS TYPES
// Para evitar repetições, podemos declarar uma **variável de tipo** (ou *Type Alias*). 
// Essa variável de tipo é apenas um "esqueleto" que definirá as propriedades que aquele tipo deve ter.
type person = { 
	name: string, 
	age: number
};

const astrodev: person = {
	name: "Astrodev",
	age: 30
};
console.log(astrodev)


// COMBINANDO UNION TYPES E TYPES ALIASES
type BirthDate = number | string | undefined;

function user (name: string, birthDate: BirthDate){
   //lógica aqui
}

function userProfile (name: string, age: number, birthDate: BirthDate){
	//lógica aqui
}
//dessa forma, as funções podem receber a data de nascimento (birthDate) como
//número ou string ou undefined, sem quebrar nosso código 🎆



// ## INTERSECTION TYPES

// Intersection Type cria um novo tipo combinando múltiplos types já existentes.
// Assim como o Union Type está para OU (|), o Intersection Type está para E (&).

// Para entender melhor, considere nosso type `User`
type User = { 
	name: string, 
	age: number
}
// E agora, vamos criar também um tipo Account
type Account = { 
	userName: string, 
	password: string
 }
// Podemos juntar os dois tipos em um só utilizando um Intersection Type
type UserInfo = User & Account;

// Na prática, um objeto tipado como UserInfo seria criado desta forma:
const user1: UserInfo = { 
	name: "Lua", 
	age: 27,
	userName:"lualua",
	password: "123abc"
 }
 console.log(user1)



 // ## Inferindo tipos
// Para evitar tipagens redundantes, podemos declarar uma variável diretamente com o tipo de valor que irá assumir.
//  O Typescript é capaz de subentender o tipo. Então, algo como
const nome1: string = "Labenu"; 
// funcionará mesmo se estiver escrito assim: 
const nome2 = "Labenu"; // No entanto, a boa prática é tipar todos os valores.
console.log(nome1)
console.log(nome2)


/* # Enum
Em Typescript, temos uma estrutura de dados chamada`ENUM`, que permite a declaração de tipos de variáveis quando
elas assumem valores pré-definidos (dados que não mudam).
O Enum pode ser utilizado para tipagem e atribuição, diferente do type (que só tipa).
As nomenclaturas mais comuns para os Enums são PascalCase ou UPPER_CASE. Escolha uma delas e mantenha o mesmo 
padrão durante todo o código.
Exemplo com o padrão de nomenclatura UPPER_CASE:*/
//declarando um Enum
enum LABENU_CLASSES {
    LOVELACE = "Lovelace",
    MARYAM = "Maryam",
    CARVER = "Carver",
    JOY = "Joy",
    GUIMARAES = "Guimarães",
    VAUGHAN = "Vaughan"
    }
    
    // type tipado com um Enum
    type TTeacher = {
        name: string,
        className: LABENU_CLASSES
    }
    
    // constante recebendo um valor de um Enum (atribuição)
    const labenuTeacher: TTeacher = {
        name: "Janaylla",
        className: LABENU_CLASSES.MARYAM // Acessamos a propriedade do enum utilizando a notação de ponto NomeDoEnum.Valor
    }
    console.log(labenuTeacher)