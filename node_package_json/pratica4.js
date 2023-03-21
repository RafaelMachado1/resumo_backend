//Logica que calcula quantos anos eu vou ter daqui 7 anos
const mais = 7

const nome = process.argv[2]; //parâmetro definido Rafael

const idade = process.argv[3]; // parâmetro definido 38

if (!nome || !idade) {
    console.log("faltaram argumentos!")
} else {
    const anos = Number(idade) + mais;
    console.log("Olá,", nome, "! Você tem", idade, "anos.");
    console.log("Em sete anos você terá", anos);
}

// Criar script que pega sempre o Brazil
// "pratica4": "node ./pratica4.js Rafael 38"  
// -> comando para rodar o script (node pratica4.js Rafael 38) ou (npm run pratica4)