// importar o countries
import { countries } from "./countries.js"; //não esquecer o .js no final

const name = process.argv[2]
const code = process.argv[3]

if(! name || !code){
    console.log("Faltaram argumentos")
} else {
    const newCountry = {name, code}
    countries.push(newCountry)
    console.log(countries[countries.length - 1])
}

// Criar script que pega sempre o Brazil
// "pratica3":  "pratica3": "node ./pratica3.js Analandia AL"  
// -> comando para rodar o script -> (node pratica3.js Analandia AL) ou (npm run pratica3)