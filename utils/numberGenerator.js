function createRandomNumbers(qty) {
  const obj = {};
  for (let i = 0; i < qty; i++) {
    const randomNumber = Math.floor(Math.random() * 1001);
    if (obj[randomNumber]) {
      obj[randomNumber] = obj[randomNumber] + 1;
    } else {
      obj[randomNumber] = 1;
    }
  }
  return obj;
}

process.on('message', (msg) => {
  const result = createRandomNumbers(+msg);
  process.send(result);
});

module.exports = createRandomNumbers;
