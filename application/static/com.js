import { Metacom } from '/metacom.js';
const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
export const com = Metacom.create(`${protocol}://${location.host}/api`);

(async () => {
})();


window.com = com;
