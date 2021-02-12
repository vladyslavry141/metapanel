import { Metacom } from '/metacom.js';
const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
export const com = Metacom.create(`${protocol}://${location.host}/api`);

com.loadAll = async () => {
  await com.load('auth');
  await com.load('dashboard');
};

window.com = com;
