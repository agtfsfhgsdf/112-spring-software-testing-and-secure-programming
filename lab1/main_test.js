const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

test("Test MyClass's addStudent", ()=>{
    // TODO  
    	const student = new Student();
	const myClass = new MyClass();    
        student.setName("John");
        const newStudentId = myClass.addStudent(student);
        assert.strictEqual(newStudentId, 0,"正確");
        const notstudentID=111;
        const newStudentId2 = myClass.addStudent(notstudentID);
        assert.strictEqual(newStudentId2,-1,"錯誤");
       
}); 
test("Test MyClass's getStudentById", () => {
    // TODO 
    const student = new Student();
    const myClass = new MyClass();  
    student.setName("kevin");
    myClass.addStudent(student);
    const newStudentName = myClass.getStudentById(0);
    assert.strictEqual(newStudentName.getName(), "kevin","正確");
    const newStudentName2 = myClass.getStudentById(-1);
    assert.strictEqual(newStudentName2, null,"錯誤");
   
});
test("Test Student's setName", () => {
    // TODO
        const student = new Student();
        student.setName("John");
        assert.strictEqual(student.getName(), "John","正確");
        student.setName(111);
        assert.strictEqual(student.getName(),"John","錯誤");    
   
});
test("Test Student's getName", () => {
    // TODO
       const student = new Student();
       assert.strictEqual(student.getName(),'',"錯誤");
    student.setName("John");    
    assert.strictEqual(student.getName(), "John","正確");
    
}); 
