// importar o countries
import { countries } from "./countries.js"; //não esquecer o .js no final

const query = process.argv[2]

if(!query){
    console.log("Faltou o argumento de busca")
} else {
    const resultado = countries.filter(country => 
        country.name.toLowerCase()[0] === query.toLowerCase())
    console.log(resultado)
}

// Criar script que pega sempre o Brazil
// "pratica2": "pratica2": "node ./pratica2.js b"  -> comando para rodar o script -> (node pratica2.js b) ou (npm run pratica2)