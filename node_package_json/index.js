//Criando um arquivo package.json
// npm init -> com opção para editar
// npm init -Y -> cria o package.json padrão


//Rodando backend com node
const teste = process.argv[0]
//console.log(teste)
//node index.js -> comando para rodar o process.argv na posição 0
//retorna o node

const teste1 = process.argv[1]
//console.log(teste1)
//node index.js -> comando para rodar o process.argv na posição 1
//retorna o caminho do index


// Caso queira realizar imports e exports no Javascript, é necessário adicionar a propriedade
// “type”: com valor “module” no package.json! 👇🏾
import {countries} from "./countries.js"
// node index.js Argentina -> comando para rodar p process.argv na posição 2 (aqui posso pasar p dado que estiver na lista)
const query = process.argv[2]
//console.log(query)

//Inserindo filter
const result = countries.filter(country => country.name === query)
// console.log(result)
// node index.js Brazil -> comando para rodar p process.argv na posição 2 (aqui posso passar o dado que estiver na lista)

//Melhorando a lógica com IF Else
if(!query){
    console.log("faltou o argumento de busca")
} else{
    const result = countries.filter(country => country.name === query)
    //console.log(result)
}

//Melhorando a lógica inserindo includes
if(!query){
    console.log("faltou o argumento de busca")
} else{
    const result = countries.filter(country => country.name.includes(query))
    console.log(result)
}



//Scripts personalizados
//"start": "clear && node .index.js" ->comando para rodar o script (npm start)
console.log("oi mundo")
// "serve": "clear && echo 'Hello' && node ./index.js" -> comando para rodar o script (npm run serve)