import { com } from '/com.js';
import { Document } from '/document.js';

const doc = new Document(document);

const loadWelcome = () => {
  doc.getById('content').setHTML('<img src="/img/logo-white.png"><h1>Welcome back commander</h1>');
};
const accessGranted = () => {
  doc.getById('message').setText('ACCESS GRANTED').setClass('success');
  doc.getById('signin').style.height = '0px';
  doc.getById('menu').style.left = '0px';
  setTimeout(loadWelcome, 1000);

};
const accessDenied = () => {
  doc.getById('message').setText('ACCESS DENIED').setClass('error');
};
const init = async () => {
  try {
	  await com.api.auth.status();
	  accessGranted();
  } catch (err) {}
};

init();

const submiting = event => {
  event.preventDefault();
  signin(event.target[0].value, event.target[1].value);
  return false;
};

const signin = async (login, password) => {
  try {
    const status = await com.api.auth.signIn({ login, password });
    if (status.result === 'success') {
	  		accessGranted();
    }
  } catch (err) {
    accessDenied();
  }
};

const openLogs = async () => {
  doc.getById('content').setHTML(await com.api.logs.open());
};
const openSettings = async () => {
  doc.getById('content').setHTML(await com.api.settings.open());
};
const openTasks = async () => {
  doc.getById('content').setHTML(await com.api.tasks.open());
};
window.addEventListener('load', async () => {
  doc.getById('signin').addEventListener('submit', submiting);
  doc.getById('logs-btn').addEventListener('click', openLogs);
  doc.getById('settings-btn').addEventListener('click', openSettings);
  doc.getById('tasks-btn').addEventListener('click', openTasks);
});
