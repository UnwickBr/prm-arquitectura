// Interações locais. Este modelo não envia formulários nem realiza pagamentos.
(() => {
  const $ = (s, el=document) => el.querySelector(s);
  const $$ = (s, el=document) => [...el.querySelectorAll(s)];
  const key = 'template-theme-' + document.body.dataset.template;
  try { const saved=localStorage.getItem(key); if(saved==='light'||saved==='dark')document.documentElement.dataset.theme=saved; } catch {}
  const theme=$('[data-theme-toggle]');
  function updateTheme(){theme.setAttribute('aria-label',document.documentElement.dataset.theme==='dark'?'Ativar tema claro':'Ativar tema escuro');}
  updateTheme();theme.addEventListener('click',()=>{const v=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=v;try{localStorage.setItem(key,v)}catch{}updateTheme()});
  const menu=$('.menu-btn'),nav=$('#navegacao');
  function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
  $$('a',nav).forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});
  $$('.contact-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();$('.form-feedback',form).textContent='Demonstração concluída. Nenhuma mensagem foi enviada. Conecte este formulário ao seu serviço para receber contatos.';}));
  $$('[data-service]').forEach(a=>a.addEventListener('click',()=>{const field=$('textarea[name=mensagem]');if(field){field.value='Tenho interesse em '+a.dataset.service+'.';}}));
  $$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{const group=button.closest('[data-filter-group]');$$('[data-filter]',group).forEach(b=>b.setAttribute('aria-pressed',String(b===button)));const target=document.getElementById(group.dataset.filterGroup);$$('[data-category]',target).forEach(el=>{el.hidden=button.dataset.filter!=='todos'&&el.dataset.category!==button.dataset.filter});}));
  const dialog=$('.project-dialog');
  $$('[data-project]').forEach(button=>button.addEventListener('click',()=>{const image=$('img',button);const content=$('.dialog-content',dialog);content.replaceChildren();if(image){const copy=image.cloneNode();copy.loading='eager';content.append(copy)}const div=document.createElement('div');div.className='dialog-copy';const h=document.createElement('h2');h.textContent=button.dataset.project;const p=document.createElement('p');p.textContent=button.dataset.description;const note=document.createElement('p');note.textContent='Projeto conceitual ilustrativo. Substitua pelas imagens e informações do seu portfólio.';div.append(h,p,note);content.append(div);dialog.showModal()}));
  $('.dialog-close',dialog).addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.08});$$('.reveal').forEach(el=>{el.classList.add('ready');obs.observe(el)})}
})();
