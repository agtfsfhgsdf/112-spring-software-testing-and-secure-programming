const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
//write tests use Stub, Mock, and Spy when necessary
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
test.mock.method(fs, 'readFile', (file, options, callback) => { 
    callback(null, 'john\njohn1\njohn2');
}
);
//test mailSystem : write()
test('should be able to write mail', () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('test');
    assert.strictEqual(context, 'Congrats, test!');
   	
});
// Test MailSystem : send()
test('should be able to send mail', () => {
    const mailSystem = new MailSystem();
    const success = mailSystem.send('test', 'test');
    test.mock.method(Math, 'random', () => 0.6);
    assert.strictEqual(mailSystem.send('ok', 'success'),true);
    test.mock.method(Math, 'random', () => 0.4);
    assert.strictEqual(mailSystem.send('fa', 'fail'),false);
});   
// Test Application : getNames()
test('should be able to get names', async () => {
    const app = new Application();
    const names = await app.getNames();
    assert.ok(names);
});
// Test Application : getRandomPerson()
test('should be able to get random person', () => {
    const app = new Application();
    const person = app.getRandomPerson();
    test.mock.method(Math, 'random', () => 0);
});
// Test Application : selectNextPerson()
test('should be able to select next person', () => {
    const app = new Application();
    const person = app.selectNextPerson();
    let cn = 0;
    test.mock.method(app, 'getRandomPerson', () => {
        if (cn <= person.length) { 
            return person[0][cn++]; 
        }
     });
});
// Test Application : notifySelected()
test('should be able to notify selected', () => {
    const app = new Application();
    app.notifySelected();
    assert.ok(app);
});
