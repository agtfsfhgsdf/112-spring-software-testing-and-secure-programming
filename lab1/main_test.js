const test = require('node:test');
const assert = require('assert');
const { MyClass, Student } = require('./main');

// Test MyClass addStudent functionality
test('Test MyClass addStudent', () => {
  const myClass = new MyClass();
  const student = new Student();

 //check if student is instance of Student
 const notAStudent = 123
 const notAStudentInstance = myClass.addStudent(notAStudent);
 assert.strictEqual(notAStudentInstance, -1, "If it's not a Student instance, it should return -1.");

 // push student to Student list
 student.setName("Joy");
 const addStudentResult = myClass.addStudent(student);
 assert.strictEqual(myClass.students[0], student, "The student has not been added to the student list.");

 // return id
 assert.strictEqual(addStudentResult, 0, "Id is not positive number.")
});

// Test MyClass getStudentById functionality
test('Test MyClass getStudentById', () => {
  const myClass = new MyClass();
  const student = new Student();
  student.setName('Tiffany');
  myClass.addStudent(student);
  
  // Id is negative number
  assert.strictEqual(myClass.getStudentById(-1), null, "Id should not be negative number");

  //Id is not exist
  assert.strictEqual(myClass.getStudentById(myClass.students.length+1), null,  "Id is not exist");

  // student exist
  assert.strictEqual(myClass.getStudentById(0), student);

});

// Test Student setName functionality
test('Test Student setName', () => {
  const student = new Student();
  student.setName('Alice');
  assert.strictEqual(student.getName(), 'Alice', 'Student name should be set correctly');

  // Test not string value
  student.setName(123);
    assert.strictEqual(student.getName(), 'Alice', "userName should not be changed to anything other than a String");

  
});

// Test Student getName functionality
test('Test Student getName', () => {
  const student = new Student();
  student.setName('Bob');


// Test getting the name of a student without a name set
  const studentWithoutName = new Student();
  assert.strictEqual(studentWithoutName.getName(), '', 'Student name should be an empty string if not set');

  //return exist name
  assert.strictEqual(student.getName(), 'Bob', 'Student name should be retrieved correctly');

  
});
