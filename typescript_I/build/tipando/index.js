"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frota_1 = require("./frota");
function buscarCarrosPorMarca(frota, marca) {
    if (marca === undefined) {
        return frota;
    }
    return frota.filter((carro) => {
        return carro.marca === marca;
    });
}
console.log(buscarCarrosPorMarca(frota_1.frota, "Ford"));
let aux;
aux = "aux";
aux = 0;
aux = true;
aux = {};
aux = [1, 2, 3];
console.log(aux);
function sayHello(name) {
    console.log("Hello,", name || "World");
}
sayHello("Rafael");
const person = {
    name: "Astrodev",
    age: 30
};
console.log(person);
//# sourceMappingURL=index.js.map