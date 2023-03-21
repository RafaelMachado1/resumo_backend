# Typescript II

Vamos continuar conhecendo nossa nova linguagem?

 Para isso, vale ******************************relembrarmos os types!******************************

- **Types** são responsáveis por **definir o tipo de valor** a ser utilizado por cada variável ou função.
- Já vimos como tipar valores primitivos: **`strings`**, `**numbers`** e **`booleans`** e, também, tipos de mais alto nível como **`arrays`** e **`objetos`**

Veja abaixo os tipos que já aprendemos até agora 👇🏾

### Tipos básicos

**String**

```tsx
const name: string = "Jules";
```

**Boolean**

```tsx
const online: boolean = true;
```

**Number**

```tsx
const age: number = 21;
```

**Arrays**

```tsx
const arr: Array<number> = [1, 2, 3];
//ou
const array: number[] = [1, 2, 3];
```

**Objetos**

```tsx
const person: { name: string, age: number} = { name: "Astrodev", age: 30};
```

**Any**

```tsx
let aux: any;
aux = "Oi";
aux = 12;
```

Agora, vamos conhecer mais tipos! 😎

## Union Type

Para variáveis poderem assumir valores de **`undefined`** ou **`null`**, podemos colocar esses valores diretamente no tipo ou usar o chamado ***union type***, inserindo uma **`|`** entre os tipos:

```tsx
let text: string | undefined;

let message: string | null = null;
```

### Relembrando os types

Para evitar repetições, podemos declarar uma **variável de tipo** (ou *Type Alias*). Essa variável de tipo é apenas um "esqueleto" que definirá as propriedades que aquele tipo deve ter.

```tsx
type person = { 
	name: string, 
	age: number
};

const astrodev: person = {
	name: "Astrodev",
	age: 30
};
```

## Combinando *Union Types* e *Type Aliases*

```tsx
type BirthDate = number | string | undefined;

function user (name: string, birthDate: BirthDate){
   //lógica aqui
}

function userProfile (name: string, age: number, birthDate: BirthDate){
	//lógica aqui
}

//dessa forma, as funções podem receber a data de nascimento (birthDate) como
//número ****ou**** string **ou** undefined, sem quebrar nosso código 🎆
```

## Intersection Types

***Intersection Type*** cria um novo tipo **combinando múltiplos types já existentes**.

Assim como o *Union Type* está para **OU**, o *Intersection Type* está para **E**

Para entender melhor, considere nosso type `User`

```tsx
type User = { 
	name: string, 
	age: number
}
```

E agora, vamos criar também um tipo `Account`

```tsx
type Account = { 
	userName: string, 
	password: string
 }
```

Podemos juntar os dois tipos em um só utilizando um **********************************Intersection Type**********************************

```tsx
type UserInfo = User & Account;
```

Na prática, um objeto tipado como `UserInfo` seria criado desta forma:

```tsx
const user: UserInfo = { 
	name: "Lua", 
	age: 27,
	userName:”lualua”,
	password: "123abc"
 }
```

## Inferindo tipos

Para evitar tipagens redundantes, podemos declarar uma variável diretamente com o tipo de valor que irá assumir.  O Typescript é capaz de subentender o tipo. Então, algo como

```tsx
const name: string = "Labenu";
```

funcionará mesmo se estiver escrito assim:

```tsx
const name = "Labenu";
```

No entanto, a ************************boa prática************************ **é tipar** **todos os valores**.

# Enum

Em Typescript, temos uma estrutura de dados chamada ********`ENUM`********, que permite a declaração de tipos de variáveis quando **elas assumem valores pré-definidos** (dados que não mudam).

O Enum pode ser utilizado para tipagem e atribuição, diferente do type (que só tipa).

As nomenclaturas mais comuns para os Enums são PascalCase ou UPPER_CASE. Escolha uma delas e mantenha o mesmo padrão durante todo o código.

Exemplo com o padrão de nomenclatura UPPER_CASE:

```tsx
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
	className: LABENU_CLASSES.MARYAM
}
```

Exemplo com o padrão de nomenclatura PascalCase:

```tsx
//declarando um Enum
enum LabenuStack {
Front = "Front-end",
Back = "Back-end",
Full = "Full Stack"
}

// type tipado com um Enum
type TTeacher = {
	name: string,
	stack: LabenuStack
}

// constante recebendo um valor de um Enum (atribuição)
const teacherInfo: TTeacher = {
	name: "Mazzi",
	stack: LabenuStack.Full 
}
```