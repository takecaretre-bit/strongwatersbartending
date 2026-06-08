const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');
if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('open'));

const codeToggle = document.getElementById('codeToggle');
const codePanel = document.getElementById('codePanel');
if (codeToggle && codePanel) codeToggle.addEventListener('click', () => { codePanel.hidden = !codePanel.hidden; });
