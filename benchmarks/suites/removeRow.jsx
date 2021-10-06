/**
 * @name removeRow
 * @description removing one row
 */

import { Suite } from '../benchmark';
import { createElement, patch, DELETE } from '../../src/index';
import { buildData } from '../data';

const data = buildData(1000);
const oldVNode = (
  <table>
    {data.map(({ id, label }) => (
      <tr>
        <td>{id}</td>
        <td>{label}</td>
      </tr>
    ))}
  </table>
);
const el = () => createElement(oldVNode);
const row = Math.floor(Math.random() * (data.length + 1));
data.splice(row, 1);

const vnode = (
  <table delta={[DELETE(row)]}>
    {data.map(({ id, label }) => (
      <tr>
        <td>{id}</td>
        <td>{label}</td>
      </tr>
    ))}
  </table>
);

const suite = Suite('remove row (removing one row)', {
  million: () => {
    patch(el(), vnode);
  },
  DOM: () => {
    const elClone = el();
    elClone.removeChild(elClone.childNodes[row]);
  },
  innerHTML: () => {
    let html = '';
    data.forEach(({ id, label }, i) => {
      if (row === i) return;
      html += `<tr><td>${String(id)}</td><td>${label}</td></tr>`;
    });
    el().innerHTML = html;
  },
});

export default suite;