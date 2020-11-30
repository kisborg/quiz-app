
let promise = new Promise((blabla, reject) => {
  blabla('Hello World');
});

async function makePromise() {
  return 'Hello World';
}

makePromise()
  .then(console.log);

promise
  .then(console.log);
