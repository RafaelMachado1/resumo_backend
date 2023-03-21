/* PRÁTICA GUIADA - Parte 1
Crie um sistema de cadastro de usuários que contenha:

1. Type Alias para uma pessoa (Person) com as propriedades id, name, email, password e role;
2. Type Aliases de conta, com as propriedades account e permission: 
  a. AdminAccount 
  b. NormalAccount
*/


/* type Person = {
  id: string,
  name: string,
  email: string,
  password: string,
  role: ROLE
} */

/* const userOne:Person = {
  id: "0101",
  name: "Juliana",
  email: "juliana@email.com",
  password: "25485",
  role: ROLE.ADMIN
} */

type AdminAccount = {
  account: string,
  permission: true
}

type NormalAccount = {
  account: string,
  permission: false
}


/* PRÁTICA GUIADA - Parte 2
Vamos continuar nosso sistema de cadastro de usuários criando:

1. Enum com valores ADMIN e NORMAL;
2. Tipo Intersection unindo: pessoa(Person) + permissão (Role);
3. Um array de usuários que permite guardar apenas usuários do tipo Person + Role;
4. Crie duas pessoas, uma com permissão normal e a outra admin;
5. Guarde essas pessoas no array de usuários.

*/

//2.1 ENUM

type Person = {
  id: string,
  name: string,
  email: string,
  password: string,
  role: ROLE
}

enum ROLE {
  ADMIN = "Admin",
  NORMAL = "Normal"
}

const userThree: Person = {
  id: "0303",
  name: "Jaziel",
  email: "Jaziel@email.com",
  password: "25485",
  role: ROLE.NORMAL
}

const userFour: Person = {
  id: "0404",
  name: "Camila",
  email: "Camila@email.com",
  password: "25485",
  role: ROLE.ADMIN
}

//2. Tipo Intersection unindo: pessoa(Person) + permissão (Role);

type AdminUser = Person & AdminAccount
type NormalUser = Person & NormalAccount

/* type AdminUser {
  id: string,
  name: string,
  email: string,
  password: string,
  role: ROLE,
  account: string,
  permission: true
} */



//3. Um array de usuários que permite guardar apenas usuários do tipo Person + Role;

const arrayAdmimUser: AdminUser[] = []
const arrayNormalUser: NormalUser[] = []

//4. Crie duas pessoas, uma com permissão normal e a outra admin;

const userFive: AdminUser = {
  id: "0505",
  name: "Monica",
  email: "monica@email.com",
  password: "123456",
  role: ROLE.ADMIN,
  account: "administrador",
  permission: true
}

const userSix: NormalUser = {
  id: "0606",
  name: "Cebolinha",
  email: "cebolinha@email.com",
  password: "123456",
  role: ROLE.NORMAL,
  account: "normal",
  permission: false
}

//const arrayAdmimUser: AdminUser[] = [userFive, userSix]

const arrayUser: (AdminUser | NormalUser)[] = [userFive, userSix]

//arrayUser.push(userFive)

console.table(arrayUser)

