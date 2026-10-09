document.addEventListener('DOMContentLoaded',()=>{
 const media=matchMedia('(prefers-color-scheme: dark)');
 const safeStorage={getItem:key=>localStorage.getItem(key),setItem:(key,value)=>localStorage.setItem(key,value)};
 const state=ThemeState.createThemeState(safeStorage,media.matches);
 const toggle=document.getElementById('themeToggle');const status=document.getElementById('themeStatus');
 const apply=()=>{document.documentElement.dataset.theme=state.theme;toggle.classList.toggle('active',state.theme==='dark');toggle.setAttribute('aria-checked',String(state.theme==='dark'));status.textContent=`${state.theme==='dark'?'Dark':'Light'} mode${state.storageUnavailable?' (session only)':''}`;document.querySelector('meta[name="theme-color"]').content=state.theme==='dark'?'#0f172a':'#ffffff';};
 apply();toggle.addEventListener('click',()=>{state.choose(state.theme==='dark'?'light':'dark');apply();});media.addEventListener('change',e=>{state.systemChanged(e.matches);apply();});
 const menu=document.getElementById('navMenu');const button=document.getElementById('hamburger');const mobile=matchMedia('(max-width: 768px)');
 const close=(restore=false)=>{menu.classList.remove('open');button.setAttribute('aria-expanded','false');if(restore)button.focus();};
 document.body.classList.add('js');button.hidden=false;
 button.addEventListener('click',()=>{const open=menu.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open'))close(true);});
 document.addEventListener('click',e=>{if(!e.target.closest('.nav-container'))close();});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{close();if(mobile.matches){const target=document.getElementById(a.hash.slice(1));if(target){target.tabIndex=-1;target.focus({preventScroll:true});}}}));
 mobile.addEventListener('change',()=>close());
 const form=document.getElementById('contactForm');
 form.addEventListener('submit',e=>{e.preventDefault();for(const field of form.querySelectorAll('[required]')){field.setCustomValidity(field.value.trim()?'':'Please enter a value.');}if(!form.reportValidity())return;document.getElementById('formStatus').textContent='Demo complete. Your message was not sent or stored.';});
 form.querySelectorAll('input,textarea').forEach(field=>field.addEventListener('input',()=>field.setCustomValidity('')));
});
