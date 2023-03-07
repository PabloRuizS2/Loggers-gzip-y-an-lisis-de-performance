const socket = io();

const div = document.querySelector('#container-table');
const form = document.querySelector('#container-form');
const chat = document.querySelector('#container-chat');

const port = document.querySelector('#input-port').value;

async function render(file, obj, target) {
  const data = await fetch(`http://localhost:${port}/${file}`);
  const parsedData = await data.text();
  template = Handlebars.compile(parsedData);
  const html = await template(obj);
  target.innerHTML = html;
}

render('form.hbs', { title: 'Ingresar nuevo producto' }, form);

form.addEventListener('submit', (e) => {
  const inputName = document.querySelector('#input-name');
  const inputPrice = document.querySelector('#input-price');
  const inputThumbnail = document.querySelector('#input-thumbnail');

  e.preventDefault();
  const newProduct = {
    title: inputName.value,
    price: inputPrice.value,
    thumbnail: inputThumbnail.value,
  };

  socket.emit('new-product', newProduct);
});

chat.addEventListener('submit', (e) => {
  const emailInput = document.querySelector('#email-input');
  const messageInput = document.querySelector('#text-area-input');
  e.preventDefault();
  const newMessage = {
    email: emailInput.value,
    message: messageInput.value,
  };
  socket.emit('new-message', newMessage);
});

socket.on('products', async (products) => {
  await render('products.hbs', { products }, div);
});

socket.on('messages', async (messages) => {
  await render('chat.hbs', { messages }, chat);
});

// fetch('http://localhost:8080/products.hbs')
// 	.then((data) => data.text())
// 	.then((template) => {
// 		const html = Handlebars.compile(template, { products });
// 		div.innerHtml = html;
// 	})
// const template = Handlebars
