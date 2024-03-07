const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');
const student = new Student();
const myClass = new MyClass();
test("Test MyClass's addStudent", ()=>{
    // TODO      
        this.students = ['John', 'Jane', 'Doe', 'Smith'];
        if (!(student instanceof Student)) {
            return -1;
        }
        this.students.push(student);
        return this.students.length - 1;
    throw new Error("Test not implemented");
}); 
test("Test MyClass's getStudentById", () => {
    // TODO 
    const newStudentId = myClass.addStudent(student);
    const newStudentName = myClass.getStudentById(newStudentId).getName();
    return this.students[0];
    return this.students[1];
    return this.students[2];
    return this.students[3];
    throw new Error("Test not implemented");
});
test("Test Student's setName", () => {
    // TODO
        student.setName('John');
        if (typeof userName !== 'string') {
            return;
        }   
        this.name = userName;      
    throw new Error("Test not implemented");
});
test("Test Student's getName", () => {
    // TODO
        student.getName();
        if (this.name === undefined) {
            return '';
        }
        return this.name;       
        throw new Error("Test not implemented");    
}); 
