/* ====== EDIT THESE TWO LINES: your real usernames ====== */
const GITHUB_USERNAME = "AbhinayChoudhary";
const LINKEDIN_USERNAME = "abhinay-choudhary";
/* ======================================================= */
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t.x);t.x=setTimeout(()=>t.classList.remove('show'),2200)};

/* swap in real usernames everywhere */
$$('[data-newtab],a').forEach(el=>{
 ['href','data-newtab'].forEach(a=>{const v=el.getAttribute(a);if(v)el.setAttribute(a,v.replace('YOUR_GITHUB_USERNAME',GITHUB_USERNAME).replace('YOUR_LINKEDIN_USERNAME',LINKEDIN_USERNAME))});
 if(el.childElementCount===0&&el.textContent.includes('YOUR_'))el.textContent=el.textContent.replace('YOUR_GITHUB_USERNAME',GITHUB_USERNAME).replace('YOUR_LINKEDIN_USERNAME',LINKEDIN_USERNAME);
});

/* click-to-open-in-new-tab feature */
document.addEventListener('click',e=>{
 const el=e.target.closest('[data-newtab]');
 if(el){e.preventDefault();window.open(el.dataset.newtab,'_blank','noopener,noreferrer');toast('Opening in a new tab ↗')}
});

/* copy buttons */
$$('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{
 try{await navigator.clipboard.writeText(b.dataset.copy);toast('Copied: '+b.dataset.copy)}catch{toast('Press Ctrl+C to copy')}
}));

/* ripple on buttons */
document.addEventListener('click',e=>{
 const b=e.target.closest('.btn');if(!b)return;
 const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),sp=document.createElement('span');
 sp.className='ripple';sp.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;
 b.appendChild(sp);setTimeout(()=>sp.remove(),600);
});

/* typing effect */
const words=["Software Developer","Web Designer","B.Tech Student","Problem Solver"];
let wi=0,ci=0,del=false;
(function type(){
 const w=words[wi];$('#typed').textContent=w.slice(0,ci);
 if(!del&&ci===w.length){del=true;return setTimeout(type,1300)}
 if(del&&ci===0){del=false;wi=(wi+1)%words.length}
 ci+=del?-1:1;setTimeout(type,del?45:90);
})();

/* theme toggle (remembered when storage is available) */
const root=document.documentElement,tb=$('#theme');
const isDark=()=>root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
const sync=()=>tb.textContent=isDark()?'☀️':'🌙';
try{const s=localStorage.getItem('theme');if(s)root.dataset.theme=s}catch{}
sync();
tb.onclick=()=>{const n=isDark()?'light':'dark';root.dataset.theme=n;try{localStorage.setItem('theme',n)}catch{}sync()};

/* mobile menu */
$('#menu').onclick=()=>$('#links').classList.toggle('open');
$$('#links a').forEach(a=>a.onclick=()=>$('#links').classList.remove('open'));

/* scroll: progress bar, back-to-top, active link */
const secs=$$('section,header#home');
addEventListener('scroll',()=>{
 const h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
 $('#bar').style.width=p+'%';$('#top').classList.toggle('show',h.scrollTop>500);
 let cur='home';secs.forEach(s=>{if(s.getBoundingClientRect().top<150)cur=s.id});
 $$('#links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur));
},{passive:true});
$('#top').onclick=()=>scrollTo({top:0,behavior:'smooth'});

/* reveal on scroll + counters + skill bars */
const io=new IntersectionObserver(es=>es.forEach(e=>{
 if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');
 $$('.fill',t).forEach(f=>f.style.width=f.dataset.w+'%');
 $$('[data-n]',t).forEach(n=>{const to=+n.dataset.n;let c=0;const st=Math.max(1,to/50);
  const i=setInterval(()=>{c=Math.min(to,c+st);n.textContent=Math.round(c)+(to>=10?'+':'');if(c>=to){clearInterval(i);if(to===100)n.textContent='100'}},30)});
 io.unobserve(t);
}),{threshold:.15});
$$('.rev').forEach(el=>io.observe(el));

/* project filter */
$$('.f').forEach(b=>b.onclick=()=>{
 $$('.f').forEach(x=>x.classList.remove('on'));b.classList.add('on');
 $$('.proj').forEach(p=>p.classList.toggle('hide',b.dataset.f!=='all'&&p.dataset.c!==b.dataset.f));
});

/* contact form -> opens email app */
$('#send').onclick=()=>{
 const n=$('#fn').value.trim(),e=$('#fe').value.trim(),m=$('#fm').value.trim();
 if(!n||!/^\S+@\S+\.\S+$/.test(e)||!m)return toast('Please fill all fields correctly');
 location.href=`mailto:abhinaychoudhary2007@gmail.com?subject=${encodeURIComponent('Portfolio message from '+n)}&body=${encodeURIComponent(m+'\n\nFrom: '+n+' ('+e+')')}`;
 toast('Opening your email app ✉️');
};
$('#yr').textContent=new Date().getFullYear();
