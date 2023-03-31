"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.students = exports.courses = void 0;
const types_1 = require("./types");
exports.courses = [
    {
        id: "c001",
        name: "React",
        lessons: 12,
        stack: types_1.COURSE_STACK.FRONT
    },
    {
        id: "c002",
        name: "Styled Components",
        lessons: 4,
        stack: types_1.COURSE_STACK.FRONT
    },
    {
        id: "c003",
        name: "Express",
        lessons: 5,
        stack: types_1.COURSE_STACK.BACK
    }
];
exports.students = [
    {
        id: "s001",
        name: "Rafael",
        age: 38
    },
    {
        id: "s002",
        name: "Gabriel",
        age: 12
    }
];
//# sourceMappingURL=database.js.map