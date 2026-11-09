/* =========================================================
   Paper Land — mobile shop UI (≤760px)
   Runs after app.js. Works on the GitHub site and the Shopify theme.
   ========================================================= */
(function(){
const MQ = window.matchMedia('(max-width: 760px)');
const SHOPIFY = !!window.PL_SHOP;
const R = SHOPIFY ? {
  home:'/pages/home', shop:'/collections/all', product:h=>'/products/'+h, col:k=>'/collections/all#'+k,
  collections:'/collections', about:'/pages/about', journal:'/pages/journal', help:'/pages/help', faq:'/pages/help#faq', game:'/?play=1'
} : {
  home:'home.html', shop:'shop.html', product:h=>'product.html#'+h, col:k=>'shop.html#'+k,
  collections:'collections.html', about:'about.html', journal:'journal.html', help:'help.html', faq:'help.html#faq', game:'index.html?play=1'
};
const q=(s,el=document)=>el.querySelector(s), qa=(s,el=document)=>[...el.querySelectorAll(s)];
const ICON={
  menu:'<svg viewBox="0 0 24 24"><path d="M4 8h16M4 16h16"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
  bag:'<svg viewBox="0 0 24 24"><path d="M5.5 8h13l-1 12.5h-11z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
  filter:'<svg viewBox="0 0 24 24"><path d="M4 7h16M7 12h10M10 17h4"/></svg>',
  c1:'<svg viewBox="0 0 24 24"><rect x="6" y="4" width="12" height="16" rx="2"/></svg>',
  c2:'<svg viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
  c3:'<svg viewBox="0 0 24 24"><g stroke-linecap="round" stroke-width="2.6"><path d="M5 5h0M12 5h0M19 5h0M5 12h0M12 12h0M19 12h0M5 19h0M12 19h0M19 19h0"/></g></svg>'
};
const store={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const idFromCard=card=>{const a=q('a.stage-link',card);if(!a)return null;const h=a.getAttribute('href')||'';return decodeURIComponent(h.includes('#')?h.split('#')[1]:h.split('/products/')[1]||'')};

/* ---------- scrim + drawers ---------- */
const scrim=document.createElement('div');scrim.className='mscrim';document.body.appendChild(scrim);
function openD(d){d.classList.add('on');scrim.classList.add('on');document.body.style.overflow='hidden'}
function closeAll(){qa('.mdrawer.on,.msearch.on').forEach(x=>x.classList.remove('on'));scrim.classList.remove('on');document.body.style.overflow=''}
scrim.onclick=closeAll;
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});

/* ---------- header ---------- */
const header=q('header');
if(header){
  const n=document.createElement('div');n.className='mnav';
  n.innerHTML=`<button aria-label="Menu" data-m="menu">${ICON.menu}</button><button aria-label="Search" data-m="search">${ICON.search}</button>
    <a href="${R.home}" class="logo">Paper <span>Land</span></a><span></span>
    <button aria-label="Cart" data-m="bag">${ICON.bag}<span class="badge cartCount"></span></button>`;
  header.appendChild(n);
  n.addEventListener('click',e=>{const b=e.target.closest('[data-m]');if(!b)return;
    if(b.dataset.m==='menu')openD(menu);if(b.dataset.m==='search')openSearch();if(b.dataset.m==='bag'&&window.openCart)openCart()});
  const badge=q('.badge',n),sync=()=>badge.classList.toggle('zero',!+badge.textContent);
  new MutationObserver(sync).observe(badge,{childList:true,characterData:true,subtree:true});
  const cc=q('#cartCount');if(cc)badge.textContent=cc.textContent;sync();
}

/* ---------- menu drawer ---------- */
const menu=document.createElement('aside');menu.className='mdrawer mmenu';menu.setAttribute('aria-label','Menu');
menu.innerHTML=`<div class="dh"><b>Paper Land</b><button aria-label="Close">×</button></div><div class="db">
  <a class="big" href="${R.shop}">Shop all <span>→</span></a>
  <details><summary>Collections</summary><div class="sub">
    ${Object.entries(COLLECTIONS).map(([k,c])=>`<a href="${R.col(k)}">${c.name}</a>`).join('')}
    <a href="${R.col('sets')}">Gift Sets</a><a href="${R.collections}">All collections</a></div></details>
  <a class="big" href="${R.about}">Our story <span>→</span></a>
  <a class="big" href="${R.journal}">Journal <span>→</span></a>
  <a class="big" href="${R.help}">Help &amp; contact <span>→</span></a>
  <a class="play" href="${R.game}"><span>▶ PLAY</span> Explore Paper Land as a game</a>
  <div class="foot">Free shipping Australia-wide over $${typeof FREE_SHIP!=='undefined'?FREE_SHIP:60}<br>Designed in Adelaide · Inspired by Saigon</div></div>`;
document.body.appendChild(menu);q('.dh button',menu).onclick=closeAll;
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeAll()});

/* ---------- search overlay ---------- */
const search=document.createElement('div');search.className='msearch';search.setAttribute('role','dialog');search.setAttribute('aria-label','Search');
search.innerHTML=`<div class="sh"><input type="search" placeholder="Search notebooks, planners, Crabit…" aria-label="Search"><button>Cancel</button></div><div class="res"></div>`;
document.body.appendChild(search);
const sIn=q('input',search),sRes=q('.res',search);
q('.sh button',search).onclick=closeAll;
function thumb(id){const p=PRODUCTS[id];return p.imgs?`<img class="pimg" src="${p.imgs[0]}" alt="">`:cover(id)}
function renderSearch(){
  const t=sIn.value.trim().toLowerCase();
  const ids=Object.keys(PRODUCTS).filter(id=>{const p=PRODUCTS[id];
    return !t||[titleOf(id),p.desc,p.brand,p.fmt,(COLLECTIONS[p.col]||{}).name].join(' ').toLowerCase().includes(t)});
  sRes.innerHTML=(t?'':'<div class="hint2">Popular right now</div>')+(ids.length?ids.slice(0,t?40:6).map(id=>`<a href="${R.product(id)}"><span class="thumb">${thumb(id)}</span><b>${titleOf(id)}</b><small>${money(PRODUCTS[id].price)}</small></a>`).join(''):`<div class="hint2">No notebooks match “${sIn.value}”.</div>`);
}
sIn.addEventListener('input',renderSearch);
sRes.addEventListener('click',e=>{if(e.target.closest('a'))closeAll()});
function openSearch(){renderSearch();search.classList.add('on');setTimeout(()=>sIn.focus(),250)}

/* ---------- cards: quick add + coming soon ---------- */
function decorateCards(){
  qa('.card').forEach(card=>{
    if(card.dataset.m)return;card.dataset.m='1';
    const id=idFromCard(card),p=PRODUCTS[id],stage=q('.stage',card);if(!p||!stage)return;
    if(p.soon){stage.insertAdjacentHTML('beforeend','<span class="qsoon">Coming soon</span>');return}
    const b=document.createElement('button');b.className='qadd';b.type='button';b.setAttribute('aria-label','Add '+titleOf(id)+' to cart');b.textContent='+';
    b.addEventListener('click',async e=>{e.preventDefault();e.stopPropagation();b.textContent='…';
      const ok=await addToCart(id,1);b.textContent=ok===false?'+':'✓';b.classList.add('done');
      setTimeout(()=>{b.textContent='+';b.classList.remove('done')},1300);if(ok!==false&&window.openCart)openCart()});
    stage.appendChild(b);
  });
}

/* ---------- shop page: title row, filter, density ---------- */
const F={avail:new Set(),min:'',max:''};
function shopSetup(){
  const grid=q('#grid'),head=q('.page-head'),tb=q('.toolbar');if(!grid||!head||!tb)return;
  const t=document.createElement('div');t.className='mtitle';
  t.innerHTML=`<button class="l" type="button">‹ Back</button><h1 id="mTitle">Shop all</h1><a class="r" href="${R.faq}">Guide →</a>`;
  head.prepend(t);
  q('.l',t).onclick=()=>{if(history.length>1)history.back();else location.href=R.home};
  const tools=document.createElement('div');tools.className='mtools';
  tools.innerHTML=`<button class="fbtn" type="button">${ICON.filter} Filter <i hidden></i></button><span class="count2"></span>
    <div class="dens" role="group" aria-label="Grid columns">${[1,2,3].map(n=>`<button type="button" data-c="${n}" aria-label="${n} column${n>1?'s':''}">${ICON['c'+n]}</button>`).join('')}</div>`;
  tb.after(tools);
  // density
  const setCols=n=>{grid.classList.remove('cols-1','cols-2','cols-3');grid.classList.add('cols-'+n);qa('.dens button',tools).forEach(b=>b.classList.toggle('on',b.dataset.c==n));store.set('pl-cols1',n)};
  setCols(store.get('pl-cols1')||1);
  q('.dens',tools).addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(b)setCols(b.dataset.c)});
  // filter drawer
  const fd=document.createElement('aside');fd.className='mdrawer';fd.setAttribute('aria-label','Filter');
  const colOpts=[['all','All'],...Object.entries(COLLECTIONS).map(([k,c])=>[k,c.name]),['sets','Gift Sets']];
  fd.innerHTML=`<div class="dh"><b>Filter</b><button aria-label="Close">×</button></div><div class="db">
    <div class="fgroup"><h4>Collection</h4><div class="chips">${colOpts.map(([k,n])=>`<label><input type="radio" name="fcol" value="${k}"><span>${n}</span></label>`).join('')}</div></div>
    <div class="fgroup"><h4>Availability <button type="button" data-clear="avail">Clear</button></h4><div class="checks">
      <label><input type="checkbox" name="favail" value="in"> In stock</label><label><input type="checkbox" name="favail" value="soon"> Coming soon</label></div></div>
    <div class="fgroup"><h4>Price (AUD) <button type="button" data-clear="price">Clear</button></h4><div class="prange">
      <input type="number" inputmode="numeric" min="0" placeholder="From $" name="fmin"><span>–</span><input type="number" inputmode="numeric" min="0" placeholder="To $" name="fmax"></div></div>
    <div class="fgroup"><h4>Sort by</h4><div class="checks">
      <label><input type="radio" name="fsort" value="featured"> Featured</label><label><input type="radio" name="fsort" value="low"> Price, low to high</label><label><input type="radio" name="fsort" value="high"> Price, high to low</label></div></div>
  </div><div class="dfoot2"><button class="clear" type="button">Clear all</button><button class="see" type="button">See items</button></div>`;
  document.body.appendChild(fd);
  const curCol=()=>{const h=location.hash.slice(1);const on=qa('#filters a.on')[0];return on?on.dataset.f:(h||'all')};
  const count=(col,avail,min,max)=>Object.keys(PRODUCTS).filter(id=>match(id,col,avail,min,max)).length;
  function match(id,col,avail,min,max){const p=PRODUCTS[id];
    if(col&&col!=='all'&&p.col!==col)return false;
    if(avail.size&&!(avail.has(p.soon?'soon':'in')))return false;
    if(min!==''&&p.price<+min)return false; if(max!==''&&p.price>+max)return false; return true}
  const readUI=()=>({col:(q('input[name=fcol]:checked',fd)||{}).value||'all',avail:new Set(qa('input[name=favail]:checked',fd).map(i=>i.value)),
    min:q('[name=fmin]',fd).value,max:q('[name=fmax]',fd).value,sort:(q('input[name=fsort]:checked',fd)||{}).value||'featured'});
  const updSee=()=>{const u=readUI();q('.see',fd).textContent=`See ${count(u.col,u.avail,u.min,u.max)} items`};
  function openFilter(){
    const c=curCol();qa('input[name=fcol]',fd).forEach(i=>i.checked=i.value===c);
    qa('input[name=favail]',fd).forEach(i=>i.checked=F.avail.has(i.value));
    q('[name=fmin]',fd).value=F.min;q('[name=fmax]',fd).value=F.max;
    const s=(q('#sort')||{}).value||'featured';qa('input[name=fsort]',fd).forEach(i=>i.checked=i.value===s);
    updSee();openD(fd)}
  fd.addEventListener('input',updSee);fd.addEventListener('change',updSee);
  q('.dh button',fd).onclick=closeAll;
  fd.addEventListener('click',e=>{const c=e.target.closest('[data-clear]');if(!c)return;
    if(c.dataset.clear==='avail')qa('input[name=favail]',fd).forEach(i=>i.checked=false);
    else{q('[name=fmin]',fd).value='';q('[name=fmax]',fd).value=''}updSee()});
  q('.clear',fd).onclick=()=>{qa('input',fd).forEach(i=>{if(i.type==='radio'||i.type==='checkbox')i.checked=false;else i.value=''});
    q('input[name=fcol][value=all]',fd).checked=true;q('input[name=fsort][value=featured]',fd).checked=true;updSee()};
  q('.see',fd).onclick=()=>{const u=readUI();F.avail=u.avail;F.min=u.min;F.max=u.max;
    const sort=q('#sort');if(sort&&sort.value!==u.sort){sort.value=u.sort;sort.dispatchEvent(new Event('change'))}
    if(curCol()!==u.col){location.hash=u.col}else applyExtra();
    closeAll();window.scrollTo({top:0,behavior:'smooth'})};
  q('.fbtn',tools).onclick=openFilter;
  // extra filters (availability, price) applied after app.js renders the grid
  function applyExtra(){
    let shown=0;qa('.card',grid).forEach(card=>{const id=idFromCard(card);const ok=!id||!PRODUCTS[id]||match(id,'all',F.avail,F.min,F.max);card.style.display=ok?'':'none';if(ok)shown++});
    let em=q('.mempty',grid);if(!shown){if(!em)grid.insertAdjacentHTML('beforeend','<div class="mempty">No notebooks match these filters.</div>')}else if(em)em.remove();
    q('.count2',tools).textContent=shown+' items';
    const n=(F.avail.size?1:0)+(F.min!==''||F.max!==''?1:0)+(curCol()!=='all'?1:0);const i=q('.fbtn i',tools);i.hidden=!n;i.textContent=n;
    const st=q('#shopTitle'),mt=q('#mTitle'),tt=st?st.textContent.replace(/ notebooks$/i,''):'Shop all';mt.textContent=tt;mt.style.fontSize=tt.length>16?'22px':(tt.length>11?'26px':'');
  }
  new MutationObserver(()=>{decorateCards();applyExtra()}).observe(grid,{childList:true});
  applyExtra();
}

/* ---------- product page: sticky add-to-cart bar ---------- */
function productSetup(){
  if(!q('#pdp'))return;
  const bar=document.createElement('div');bar.className='mbar';
  bar.innerHTML=`<div class="pp"><b></b><span></span></div><div class="stepper"><button type="button" data-d="-1" aria-label="Decrease">−</button><span class="n">1</span><button type="button" data-d="1" aria-label="Increase">+</button></div><button class="go" type="button">Add to cart</button>`;
  document.body.appendChild(bar);
  let n=1;
  const cur=()=>{let id=document.body.dataset.handle||location.hash.slice(1);return PRODUCTS[id]?id:Object.keys(PRODUCTS)[0]};
  const fill=()=>{const id=cur(),p=PRODUCTS[id];n=1;q('.n',bar).textContent=1;q('.pp b',bar).textContent=titleOf(id);q('.pp span',bar).textContent=money(p.price);
    const g=q('.go',bar);g.disabled=!!p.soon;g.textContent=p.soon?'Coming soon':'Add to cart'};
  fill();window.addEventListener('hashchange',()=>setTimeout(fill,0));
  q('.stepper',bar).addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(!b)return;n=Math.max(1,n+(+b.dataset.d));q('.n',bar).textContent=n});
  q('.go',bar).onclick=async()=>{const g=q('.go',bar);g.textContent='Adding…';const ok=await addToCart(cur(),n);g.textContent=ok===false?'Add to cart':'Added ✓';
    setTimeout(()=>{g.textContent='Add to cart'},1300);if(ok!==false&&window.openCart)openCart()};
}

/* ---------- boot ---------- */
decorateCards();
new MutationObserver(()=>decorateCards()).observe(document.body,{childList:true,subtree:true});
const page=document.body.dataset.page;
if(page==='shop')shopSetup();
if(page==='product')productSetup();
MQ.addEventListener&&MQ.addEventListener('change',()=>{if(!MQ.matches)closeAll()});
})();
