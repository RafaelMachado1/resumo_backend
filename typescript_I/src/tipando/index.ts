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

// 8 - import do array de tipos personalizados (OLHAR ARQUIVO FROTA.TS)
import { frota, TCarro } from "./frota"

//função Em typescript, com parâmetros e retorno tipados
function buscarCarrosPorMarca(frota: TCarro[], marca?: string): TCarro[] {
  if (marca === undefined) {
    return frota
  }

  return frota.filter(
    (carro) => {
      return carro.marca === marca
    }
  )
}
console.log(buscarCarrosPorMarca(frota, "Ford"))



// 9 - O TIPO ANY
//O tipo any indica que a variável pode assumir qualquer valor, se comportando como no Javascript (o mundo sem leis).
let aux: any;
aux = "aux";
aux = 0;
aux = true;
aux = {};
aux = [1, 2, 3];
console.log(aux)



// 10 - TIPO VOID
// Quando declaramos uma função que não possui retorno, o tipo do retorno dela será void
function sayHello(name: string): void {
	console.log("Hello,", name || "World")
}
sayHello("Rafael")



// 11 - Criando tipos reutilizáveis para objetos
export type TPerson = { 
	name: string, 
	age: number
}

const person: TPerson = { // utilizando este tipo, nosso objeto fica assim:
	name: "Astrodev",
	age: 30
}
console.log(person)





