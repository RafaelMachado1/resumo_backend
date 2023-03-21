//Fazer import do countries
import { countries } from "./countries.js"; //não esquecer o .js no final
const query = process.argv[2]
console.log(query)
if(!query){
    console.log("faltou o argumento de busca")
} else{
    const result = countries.filter(country => country.name.includes(query))
    console.log(result)
}

// Criar script que pega sempre o Brazil
// "pratica1": "node ./pratica1.js Brazil"  -> comando para rodar o script -> (node pratica1.js Brazil) ou (npm rum pratica1)