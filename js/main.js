(function(){
/* trava o zoom: pinça (iOS/Android) e toque duplo */
['gesturestart','gesturechange','gestureend'].forEach(function(ev){ document.addEventListener(ev,function(e){ e.preventDefault(); },{passive:false}); });
document.addEventListener('touchmove',function(e){ if(e.touches && e.touches.length>1) e.preventDefault(); },{passive:false});
var WHATS = '5518997886159';   // DDI + DDD + número, só dígitos
var INSTA = 'marcos_tech_thz';   // usuário do Instagram, sem @
var MSG = 'Olá, Marcos! Vi seu site e quero um orçamento.';
var d = WHATS.replace(/\D/g,'');
function wa(t){ return d ? 'https://wa.me/'+d+'?text='+encodeURIComponent(t) : '#orcamento'; }
document.querySelectorAll('.js-wa').forEach(function(a){ a.href = wa(MSG); if(!d) a.removeAttribute('target'); });
if(INSTA){ var u=INSTA.replace('@',''); document.querySelectorAll('.js-ig').forEach(function(a){ a.href='https://www.instagram.com/'+u+'/'; a.textContent='@'+u; a.hidden=false; }); }
function fmt(x){ var m=x.match(/^55(\d{2})(\d{4,5})(\d{4})$/); return m ? '('+m[1]+') '+m[2]+'-'+m[3] : x; }
var num=document.getElementById('num'), cp=document.getElementById('copy');
if(num&&cp){ if(d){ num.textContent='WhatsApp '+fmt(d); } else { num.hidden=true; cp.hidden=true; }
cp.addEventListener('click',function(){
function ok(){ cp.textContent='Número copiado'; setTimeout(function(){cp.textContent='Copiar número'},2000); }
function sel(){ var r=document.createRange(); r.selectNodeContents(num); var s=getSelection(); s.removeAllRanges(); s.addRange(r); cp.textContent='Número selecionado'; }
try{ navigator.clipboard.writeText(fmt(d)).then(ok,sel); }catch(e){ sel(); }
}); }
var f=document.getElementById('f');
function chk(i){ var e=i.parentNode.querySelector('.err'); var bad=i.required && !i.value.trim(); if(e) e.textContent = bad ? 'Preencha este campo.' : ''; i.classList.toggle('bad',bad); return !bad; }
['nome','ramo'].forEach(function(id){ var i=document.getElementById(id); i.addEventListener('blur',function(){chk(i)}); });
document.querySelectorAll('img[data-clone]').forEach(function(i){ var s=document.querySelector(i.getAttribute('data-clone')); if(s) i.src=s.currentSrc||s.src; });
var busy=false;
f.addEventListener('submit',function(e){
e.preventDefault();
if(busy) return;
var ok = chk(f.nome) & chk(f.ramo);
if(!ok){ (f.nome.value.trim()?f.ramo:f.nome).focus(); return; }
function cl(v,n){ return String(v).replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g,'').trim().slice(0,n); }
var t='Olá, Marcos! Vi seu site e quero um orçamento.\n\nNome: '+cl(f.nome.value,80)+'\nNegócio: '+cl(f.ramo.value,80)+'\nPreciso de: '+f.tipo.value+(cl(f.msg.value,600)?'\n\n'+cl(f.msg.value,600):'');
var url=wa(t);
var a=document.createElement('a'); a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; busy=true; setTimeout(function(){ busy=false; },2500);
document.body.appendChild(a); a.click(); a.remove();
});
/* antes e depois: arrastar a linha */
document.querySelectorAll('[data-ba]').forEach(function(box){
var rg=box.querySelector('.ba-range'), drag=false;
function set(v){ v=Math.max(0,Math.min(100,v)); box.style.setProperty('--p',v+'%'); rg.value=Math.round(v); }
function fromX(x){ var r=box.getBoundingClientRect(); set((x-r.left)/r.width*100); }
box.addEventListener('pointerdown',function(e){ drag=true; fromX(e.clientX); try{box.setPointerCapture(e.pointerId);}catch(_){} });
box.addEventListener('pointermove',function(e){ if(drag) fromX(e.clientX); });
['pointerup','pointercancel','lostpointercapture'].forEach(function(ev){ box.addEventListener(ev,function(){ drag=false; }); });
rg.addEventListener('input',function(){ set(+rg.value); });
});
var tabs=document.querySelectorAll('.ba-tabs [role=tab]');
function pick(tab){ tabs.forEach(function(b){ var on=b===tab; b.setAttribute('aria-selected',on); document.getElementById(b.getAttribute('aria-controls')).hidden=!on; }); }
tabs.forEach(function(b){ b.addEventListener('click',function(){ pick(b); }); });
if(tabs.length && matchMedia('(max-width:640px)').matches) pick(tabs[1]);
var bar=document.getElementById('mbar'), hero=document.querySelector('.hero'), q=document.getElementById('orcamento'), fin=document.getElementById('contato');
function upd(){ var past=hero.getBoundingClientRect().bottom<0; var hide=q.getBoundingClientRect().top<innerHeight*.6 && fin.getBoundingClientRect().bottom>0; bar.classList.toggle('on',past && !hide); }
var ticking=false; addEventListener('scroll',function(){ if(!ticking){ ticking=true; requestAnimationFrame(function(){ ticking=false; upd(); }); } },{passive:true}); upd();
if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ es.forEach(function(e){ hero.classList.toggle('paused',!e.isIntersecting); }); },{threshold:0}).observe(hero); }
document.addEventListener('visibilitychange',function(){ hero.classList.toggle('paused',document.hidden); });
})();
