var ARCO_IRIS;
(function (ARCO_IRIS) {
    ARCO_IRIS["VERMELHO"] = "vermelho";
    ARCO_IRIS["LARANJA"] = "laranja";
    ARCO_IRIS["AMARELO"] = "amarelo";
    ARCO_IRIS["VERDE"] = "verde";
    ARCO_IRIS["AZUL"] = "azul";
    ARCO_IRIS["AZUL_ESCURO"] = "azul escuro";
    ARCO_IRIS["VIOLETA"] = "violeta";
})(ARCO_IRIS || (ARCO_IRIS = {}));
const user5 = {
    name: 'Aline',
    age: '38',
    favoriteColor: ARCO_IRIS.AZUL
};
const user2 = {
    name: 'Adriana',
    age: '40',
    favoriteColor: ARCO_IRIS.VERMELHO
};
const user3 = {
    name: 'Girgis',
    age: '37',
    favoriteColor: ARCO_IRIS.AZUL
};
console.table([user5, user2, user3]);
//# sourceMappingURL=index.js.map