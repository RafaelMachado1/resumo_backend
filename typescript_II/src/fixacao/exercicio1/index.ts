/* EXERCÍCIO DE FIXAÇÃO*/

//1. Crie um novo objeto. Este objeto é uma pessoa e deve possuir três propriedades:
  // a. nome, que é uma string;
  // b. idade, que é um número;
  // c. corFavorita, que é uma string.

//2. Crie mais três objetos, que também precisam ter apenas os campos definidos acima. Crie um type Pessoa para garantir que todos os objetos tenham as mesmas propriedades.

// type TPessoa = {
//   name: string,
//   age: number,
//   favoriteColor: string
// }

// const user1 = {
//   name: 'Aline',
//   age: '38',
//   favoriteColor: 'azul'
// }

// const user2 = {
//   name: 'Adriana',
//   age: '40',
//   favoriteColor: 'vermelho'
// }

// const user3 = {
//   name: 'Girgis',
//   age: '37',
//   favoriteColor: 'azul'
// }


// 3. Modifique o type Pessoa para que possamos escolher apenas entre as cores do arco-íris. Utilize um enum para isso.

enum ARCO_IRIS {
  VERMELHO = 'vermelho',
  LARANJA = 'laranja', 
  AMARELO = 'amarelo', 
  VERDE = 'verde', 
  AZUL = 'azul', 
  AZUL_ESCURO = 'azul escuro',
  VIOLETA = 'violeta'
}

type TPessoa = {
  name: string,
  age: number,
  favoriteColor: ARCO_IRIS
}

const user5 = {
  name: 'Rafael',
  age: '38',
  favoriteColor: ARCO_IRIS.AZUL
}

const user2 = {
  name: 'Lana',
  age: '36',
  favoriteColor: ARCO_IRIS.VERMELHO
}

const user3 = {
  name: 'Gabriel',
  age: '12',
  favoriteColor: ARCO_IRIS.AZUL
}

console.table([user5,user2,user3])
