const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');
const student = new Student();
const myClass = new MyClass();
test("Test MyClass's addStudent", ()=>{
    // TODO      
        student.setName("John");
        const newStudentId = myClass.addStudent(student);
        assert.strictEqual(newStudentId, 0,"正確");
        const notstudentID=111;
        const newStudentId2 = myClass.addStudent(notstudentID);
        assert.strictEqual(newStudentId2,-1,"錯誤");
       throw new Error("Test not implemented");
}); 
test("Test MyClass's getStudentById", () => {
    // TODO 
    student.setName("kevin");
    myClass.addStudent(student);
    const newStudentName = myClass.getStudentById(0);
    assert.strictEqual(newStudentName.getName(), "kevin","正確");
    const newStudentName = myClass.getStudentById(-1);
    assert.strictEqual(newStudentName, null,"錯誤");
    throw new Error("Test not implemented");
});
test("Test Student's setName", () => {
    // TODO
        student.setName('John');
        assert.strictEqual(student.name, "John","正確");
        student.setName(111);
        assert.strictEqual(student.name,111,"錯誤");    
    throw new Error("Test not implemented");
});
test("Test Student's getName", () => {
    // TODO
    student.setName('John');    
    assert.strictEqual(student.getName(), "John","正確");
    assert.strictEqual(student.getName(),null,"錯誤");
        throw new Error("Test not implemented");    
}); 
