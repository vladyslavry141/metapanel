import { com } from '/com.js';
import { Document } from '/document.js';

const doc = new Document(document);

const accessGranted = () => {
  doc.getById('message').setText('ACCESS GRANTED').setClass('success');
  doc.getById('menu').style.left = '0px';
  doc.getById('content').style.right = '0px';
  doc.getById('content').style.width = 'calc(100% - 60px - 260px)';
  setTimeout(() => {
  }, 1000);
};
const accessDenied = () => {
  doc.getById('message').setText('ACCESS DENIED').setClass('error');
};
const init = async () => {
  try {
	  await com.loadAll();
	  const res = await com.api.auth.status();
	  if(res.result){
	  	accessGranted();
	  }
  } catch (err) {
	console.log(err);
  }
};

init();

const signin = async (login, password) => {
  try {
    const status = await com.api.auth.signin({ login, password });
    if (status.result === 'success') {
	  		accessGranted();
    }
  } catch (err) {
	console.log(err);
    accessDenied();
  }
};

const submiting = event => {
  event.preventDefault();
  signin(event.target[0].value, event.target[1].value);
  return false;
};

window.addEventListener('load', async () => {
  doc.getById('signin').addEventListener('submit', submiting);
});
