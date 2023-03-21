var ROLE;
(function (ROLE) {
    ROLE["ADMIN"] = "Admin";
    ROLE["NORMAL"] = "Normal";
})(ROLE || (ROLE = {}));
const userThree = {
    id: "0303",
    name: "Jaziel",
    email: "Jaziel@email.com",
    password: "25485",
    role: ROLE.NORMAL
};
const userFour = {
    id: "0404",
    name: "Camila",
    email: "Camila@email.com",
    password: "25485",
    role: ROLE.ADMIN
};
const arrayAdmimUser = [];
const arrayNormalUser = [];
const userFive = {
    id: "0505",
    name: "Monica",
    email: "monica@email.com",
    password: "123456",
    role: ROLE.ADMIN,
    account: "administrador",
    permission: true
};
const userSix = {
    id: "0606",
    name: "Cebolinha",
    email: "cebolinha@email.com",
    password: "123456",
    role: ROLE.NORMAL,
    account: "normal",
    permission: false
};
const arrayUser = [userFive, userSix];
console.table(arrayUser);
//# sourceMappingURL=index.js.map