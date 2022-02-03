// src/index.js

import { sum } from './modules/sum';
import { isEmpty } from './utils/utils';

console.log('null', isEmpty(null)); // => true
console.log('true', isEmpty(true)); // => true
console.log('1', isEmpty(1)); // => true
console.log('[1,2,3]', isEmpty([1, 2, 3])); // => false
console.log('{a:1}', isEmpty({ a: 1 })); // => false
console.log('"123"', isEmpty('123')); // => false
console.log('123', isEmpty(123)); // => true
console.log('', isEmpty('')); // => true
console.log('0', isEmpty(0)); // => true

const root = document.querySelector('#root');
root.textContent = sum(8, -3).toString();
