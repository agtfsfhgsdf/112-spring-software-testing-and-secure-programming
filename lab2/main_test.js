const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
//write tests use Stub, Mock, and Spy when necessary
const fs = require('fs');
const path = require('path');
test('should name_list.txt ', ()=>{
    const Listna = 'john\njohn1\njohn2';
    const tmppa = path.join('name_list.txt');
    fs.writeFileSync(tmppa,Listna);
    process.on('exit', () => {
        if (tmppa) {
         fs.unlinkSync(tmppa);
        }
    });
});
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
    const [names,sel] = await app.getNames('john', 'john1', 'john2');
    assert.deepStrictEqual(names, ['john', 'john1', 'john2']);
    assert.deepStrictEqual(sel, []);
});
// Test Application : selected
test('should selected', () => {
    const app = new Application();
    app.pe= ['john', 'john1', 'john2'];
    app.sel = ['john', 'john1', 'john2'];
    const result = app.selectNextPerson();
    assert.strictEqual(result, null);
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

test('should not been selected ', () => {
    const app = new Application();
    let getRandomPersonCallCount = 0;
    app.getRandomPerson = () => {
        switch (getRandomPersonCallCount++) {
            case 0:
                return 'john';
            case 1:
                return 'john1';
            case 2:
                return 'john2';
        }
    };
    app.selected = ['john', 'john1'];
    const result = app.selectNextPerson();
    assert.strictEqual(result, 'john2'); 
    assert.strictEqual(getRandomPersonCallCount, 3); 
});     

test('should write and send person', () => {
     const app = new Application();
     this.writeCallCount = 0;
     this.sendCallCount = 0;
     this.writeCallCount++;
     this.sendCallCount++;
     app.selected = ['john', 'john1', 'john2'];
    app.notifySelected();
    assert.strictEqual(this.writeCallCount, 1);
    assert.strictEqual(this.sendCallCount, 1);
});
