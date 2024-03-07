const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');
const student = new Student();	
var id=0;
test("Test MyClass's addStudent", ()=>{
    // TODO      
        this.students = [];
        if (!(student instanceof Student)) {
            return -1;
        }
        this.students.push(student);
        return this.students.length - 1;
    throw new Error("Test not implemented");
}); 
test("Test MyClass's getStudentById", () => {
    // TODO 
    return this.students[id];
    throw new Error("Test not implemented");
});
test("Test Student's setName", () => {
    // TODO
        if (typeof userName !== 'string') {
            return;
        }   
        this.name = userName;
      
    throw new Error("Test not implemented");
});
test("Test Student's getName", () => {
    // TODO
        if (this.name === undefined) {
            return '';
        }
        return this.name;       
        throw new Error("Test not implemented");    
}); 
