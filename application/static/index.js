import { com } from '/com.js';
import { Document } from '/document.js';

const doc = new Document(document);

const accessGranted = () => {
  doc.getById('message').setText('ACCESS GRANTED').setClass('success');
  doc.getById('menu').style.left = '0px';
  doc.getById('content').style.right = '0px';
  doc.getById('content').style.width = 'calc(100% - 60px - 260px)';
  doc.getById('content').style.opacity = '0';
  setTimeout(async () => {
    doc.getById('signin').remove();
    const content = await com.api.dashboard.load();
    doc.getById('content').setHTML(content);
    doc.getById('content').style.opacity = '1';
  }, 1000);
};
const accessDenied = () => {
  doc.getById('message').setText('ACCESS DENIED').setClass('error');
};

const comInit = async () => {
  try {
	  await com.loadAll();
  } catch (err) {
    console.log(err);
  }
};

comInit();

const signin = async (login, password) => {
  try {
    await com.api.auth.signin({ login, password });
    accessGranted();
  } catch (err) {
    accessDenied();
  }
};

const submiting = (event) => {
  event.preventDefault();
  signin(event.target[0].value, event.target[1].value);
  return false;
};

window.addEventListener('load', async () => {
  doc.getById('signin').addEventListener('submit', submiting);
});
