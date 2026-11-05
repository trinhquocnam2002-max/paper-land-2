/* ================= Paper Land — shared site script ================= */

const C = {char:'#2B2927',sand:'#E7DED2',terra:'#D49B7B',sage:'#A9B49C',dusk:'#9DADC9',blush:'#F1D7D0',cream:'#F4EEE4',olive:'#7E8466'};

const COLLECTIONS = {
  saigon:{name:'Saigon Mornings',chapter:'Chapter 1 · The Vietnam Collection',sub:'where the city wakes up early',bg:'#E9DFD3',
    blurb:'Iced coffee on a plastic stool, motorbikes humming down the alleyways, a city waking up loud and full of plans. Three hardcover notebooks named for the words that start a Saigon day.'},
  adelaide:{name:'Adelaide Arvo',chapter:'Chapter 2 · The Australian Collection',sub:'the afternoon, said the Aussie way',bg:'#DDE2D6',
    blurb:'Long light over the Hills, a cuppa gone cold beside the laptop, the to-do list quietly renegotiated. Notebooks for the slower half of the day.'},
  studio:{name:'Someday Studio',chapter:'Chapter 3 · Planners & Pocket Notes',sub:'for the plans you keep meaning to make',bg:'#E3E6EE',
    blurb:'Undated planners and pocket notebooks for the plans you keep meaning to make. Start in any month, skip a week without guilt, begin again whenever.'},
};

const PRODUCTS = {
  'iced-coffee':{name:'iced coffee',ph:'[eyest kof-ee]',def:'Strong, sweet and poured over ice — enough to turn a 6am alarm into an actual plan.',bg:C.char,dark:1,col:'saigon',price:34,fmt:'A5 hardcover · dot grid',ruling:'5mm dot grid',tag:'Bestseller',
    desc:'Our first notebook and still our favourite. A charcoal linen-feel hardcover for early starts, morning pages and the plans you make before the coffee kicks in.'},
  'alleyway':{name:'alleyway',ph:'[al-ee-wey]',def:'A narrow lane where the best ideas and the best noodles are hiding.',bg:C.terra,col:'saigon',price:34,fmt:'A5 hardcover · dot grid',ruling:'5mm dot grid',
    desc:'A warm terracotta cover for the side-quests — sketches, lists, half-ideas and the things you notice on the way somewhere else.'},
  'street-food':{name:'street food',ph:'[street food]',def:'Proof that the best things come with crunch, chilli and a little bit of everything.',bg:C.sand,col:'saigon',price:34,fmt:'A5 hardcover · lined',ruling:'7mm lined',
    desc:'A soft sand cover with classic lined pages. Made for recipes, travel notes and anything that is better with a bit of everything in it.'},
  'arvo':{name:'arvo',ph:'[ah-voh]',def:'The part of the day when to-do lists quietly become maybe-tomorrow lists.',bg:C.sage,col:'adelaide',price:34,fmt:'A5 hardcover · dot grid',ruling:'5mm dot grid',tag:'New',
    desc:'Sage green, like the Adelaide Hills in late afternoon light. Dot grid pages for planning, journaling, or simply working out what can wait until tomorrow.'},
  'brekkie':{name:'brekkie',ph:'[brek-ee]',def:'The meal that makes a Monday negotiable.',bg:C.cream,col:'adelaide',price:34,fmt:'A5 hardcover · lined',ruling:'7mm lined',
    desc:'A bright cream cover for the first page of the week. Lined pages for morning journaling, weekly goals and the occasional brunch review.'},
  'cuppa':{name:'cuppa',ph:'[kup-uh]',def:'A small pause in a mug, best taken before replying to any email.',bg:C.olive,dark:1,col:'adelaide',price:34,fmt:'A5 hardcover · plain',ruling:'plain',
    desc:'Deep olive with plain pages — no lines, no dots, no rules. For sketching, lettering and thinking out loud between meetings.'},
  'someday':{name:'someday',ph:'[sum-day]',def:'The day all of these notes finally turn into plans. Undated, so it can start today.',bg:C.dusk,col:'studio',price:42,fmt:'A5 undated planner · 12 months',ruling:'Monthly + weekly spreads',tag:'Planner',
    desc:'An undated 12-month planner with monthly calendars, weekly spreads and dot grid notes pages. Start in any month and skip a week without wasting a page.'},
  'pocket-notes':{name:'pocket notes',spiral:1,col:'studio',price:14,fmt:'10 × 10 cm spiral · 80 pages',ruling:'5mm dot grid',bg:C.dusk,
    desc:'A small square spiral notebook in blue gingham. Fits in a bag, a coat pocket or beside the laptop for quick lists and phone numbers.'},
  'saigon-set':{name:'Saigon Mornings Set',set:['iced-coffee','alleyway','street-food'],col:'sets',price:89,fmt:'3 × A5 notebooks · gift box',tag:'Save $13',
    desc:'All three Saigon Mornings notebooks — iced coffee, alleyway and street food — packed together in a recycled kraft gift box.'},
  'arvo-set':{name:'Adelaide Arvo Set',set:['arvo','brekkie','cuppa'],col:'sets',price:89,fmt:'3 × A5 notebooks · gift box',tag:'Save $13',
    desc:'All three Adelaide Arvo notebooks — arvo, brekkie and cuppa — packed together in a recycled kraft gift box.'},
};

const JOURNAL = {
  'why-saigon':{title:'Why our first collection starts in Saigon',date:'October 2026',cat:'Our Story',glyph:'coffee',bg:'linear-gradient(135deg,#E8DCCD,#D7C3AE)',
    lede:'Every brand has to start somewhere. Ours started on a plastic stool, with an iced coffee and a notebook full of plans.',
    body:`<p>Paper Land is designed in Adelaide, but the idea began in Saigon — a city that wakes up early, loudly, and with a coffee in hand. Mornings there run on small rituals: the same café, the same stool, the same order, and a few minutes to write down what the day needs to become.</p>
<p>We wanted our first notebooks to hold on to that feeling. So instead of a logo on the front, each cover carries a single word and a short definition — the way you'd actually explain that word to a friend.</p>
<h2>Three words, one morning</h2>
<p><strong>Iced coffee</strong> is the start. <strong>Alleyway</strong> is the detour where the good ideas hide. <strong>Street food</strong> is the reward — a little bit of everything, with crunch. Together they make the Saigon Mornings collection.</p>
<h2>Why bring it to Australia?</h2>
<p>Because the ritual travels. An Adelaide morning looks different — a flat white instead of an iced coffee, a tram instead of a motorbike — but the habit of sitting down and writing out the day is the same. Our second collection, Adelaide Arvo, is the other half of that story.</p>`},
  'arvo-reset':{title:'The five-minute arvo reset',date:'September 2026',cat:'How To',glyph:'arvo',bg:'linear-gradient(135deg,#D9DFD0,#B9C4AD)',
    lede:'A one-page spread for the 3pm slump: what is done, what is next, and what can honestly wait.',
    body:`<p>Around mid-afternoon, most to-do lists stop being useful. Some tasks are finished, some have changed, and a few were never going to happen today. The arvo reset is a quick way to take stock without starting a whole new list.</p>
<h2>The spread</h2>
<ol><li><strong>Done.</strong> Write down three things you finished today, however small.</li>
<li><strong>Next.</strong> Pick the one task that would make tomorrow morning easier, and do only that.</li>
<li><strong>Later.</strong> Move everything else to a "maybe-tomorrow" list — without guilt.</li>
<li><strong>Cuppa.</strong> Put the kettle on. This step is not optional.</li></ol>
<p>Dot grid pages work best because you can draw three quick boxes and fill them in. Five minutes, one page, and the rest of the afternoon feels lighter.</p>`},
  'bullet-journal':{title:'Starting a bullet journal in ten minutes',date:'August 2026',cat:'How To',glyph:'someday',bg:'linear-gradient(135deg,#E4E7EF,#C3CCDD)',
    lede:'No stencils, no perfect lettering, no forty-page setup. A beginner layout you can copy tonight.',
    body:`<p>Bullet journaling has a reputation for being complicated. It doesn't need to be. All you need is a dotted notebook, a pen, and ten minutes.</p>
<h2>The four pages to start with</h2>
<ul><li><strong>Index</strong> — leave the first two pages blank and add page numbers as you go.</li>
<li><strong>Future log</strong> — one page split into six boxes for the next six months.</li>
<li><strong>Monthly log</strong> — dates down the left, key events beside them.</li>
<li><strong>Daily log</strong> — today's date, then short bullets: • task, ○ event, – note.</li></ul>
<h2>Keep it ugly</h2>
<p>The best journal is the one you actually use. Cross things out, change the layout next month, and let the pages be messy. That is what they are for.</p>`},
};

const NOTES=[
 ['Write it down before the coffee goes cold.','Margin note no. 01'],
 ['A blank page is just a morning that hasn’t happened yet.','Margin note no. 02'],
 ['Some plans need a deadline. Most need a cuppa.','Margin note no. 03'],
 ['Half the list, twice the care.','Margin note no. 04'],
 ['The alley is narrow; the ideas are not.','Margin note no. 05'],
 ['Someday is a perfectly good day to begin.','Margin note no. 06'],
];

const FREE_SHIP = 60;
const $ = (s,el=document)=>el.querySelector(s);
const money = n => '$'+n.toFixed(2);
const titleOf = id => { const p=PRODUCTS[id]; if(p.set) return p.name; if(p.spiral) return 'Pocket Notes'; return p.name.replace(/\b\w/g,c=>c.toUpperCase())+' Notebook'; };

/* ---------- covers ---------- */
function cover(id){
  const p=PRODUCTS[id];
  if(p.set) return `<div class="set">${p.set.map(cover).join('')}</div>`;
  if(p.spiral) return `<div class="nb spiral gingham"><div class="w">pocket notes</div></div>`;
  return `<div class="nb ${p.dark?'dark':''}" style="background:${p.bg}"><div class="w">${p.name}</div><div class="ph"><span>${p.ph}</span><span>noun</span></div><div class="rule"></div><div class="def">${p.def}</div></div>`;
}
function card(id){
  const p=PRODUCTS[id];
  return `<div class="card"><a class="stage-link" href="product.html#${id}"><div class="stage">${p.tag?`<span class="tag">${p.tag}</span>`:''}${cover(id)}</div>
    <h3>${titleOf(id)}</h3></a><div class="meta">${p.fmt}</div>
    <div class="row"><span class="price">${money(p.price)} AUD</span><button class="add" data-add="${id}">Add to Cart</button></div></div>`;
}

/* ---------- header / footer / drawer ---------- */
function chrome(){
  const page=document.body.dataset.page;
  const a=(href,label,key)=>`<li><a href="${href}" class="${page===key?'active':''}">${label}</a></li>`;
  $('#site-header').outerHTML = `
  <div class="announce">Free shipping Australia-wide on orders over $${FREE_SHIP} · Designed in Adelaide</div>
  <header><div class="wrap nav">
    <a href="index.html" class="logo">Paper <span>Land</span></a>
    <ul class="menu" id="menu">
      ${a('shop.html','Shop','shop')}
      <li class="dd" id="dd"><button aria-haspopup="true" aria-expanded="false" id="ddBtn" class="${page==='collections'?'active':''}">Collections <svg class="chev" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.2"/></svg></button>
        <div class="dd-panel">
          ${Object.entries(COLLECTIONS).map(([k,c])=>`<a href="collections.html#${k}"><small>${c.chapter.split(' · ')[0]}</small>${c.name}</a>`).join('')}
          <a href="shop.html#sets"><small>Gift Sets</small>Starter Sets</a>
        </div></li>
      ${a('about.html','About','about')}
      ${a('journal.html','Journal','journal')}
      ${a('help.html','Help','help')}
    </ul>
    <div style="display:flex;gap:22px;align-items:center">
      <button class="burger" id="burger">Menu</button>
      <button class="cart-btn" id="cartOpen">Cart <span id="cartCount">0</span></button>
    </div></div></header>`;

  $('#site-footer').outerHTML = `
  <section class="club">
    <div class="eyebrow">The Paper Club</div>
    <h2>Letters, launches &amp; 10% off.</h2>
    <p>One slow email a month. New collections first, and 10% off your first notebook.</p>
    <form id="clubForm"><input type="email" placeholder="Your email address" required aria-label="Email address"><button type="submit">Join</button></form>
    <div class="ok" id="clubOk">Thank you — welcome to the Paper Club.</div>
  </section>
  <footer><div class="wrap">
    <div class="fgrid">
      <div class="fbrand"><a href="index.html" class="logo">Paper <span>Land</span></a>
        <p>Notebooks for slow mornings — designed in Adelaide, inspired by Saigon.</p>
        <p style="margin-top:14px">hello@paperland.com.au</p></div>
      <div><h4>Shop</h4><ul><li><a href="shop.html">Shop All</a></li><li><a href="collections.html#saigon">Saigon Mornings</a></li><li><a href="collections.html#adelaide">Adelaide Arvo</a></li><li><a href="collections.html#studio">Someday Studio</a></li><li><a href="shop.html#sets">Gift Sets</a></li></ul></div>
      <div><h4>Help</h4><ul><li><a href="help.html#shipping">Shipping &amp; Returns</a></li><li><a href="help.html#stockists">Stockists</a></li><li><a href="help.html#contact">Contact Us</a></li><li><a href="help.html#faq">FAQ</a></li></ul></div>
      <div><h4>Paper Land</h4><ul><li><a href="about.html">Our Story</a></li><li><a href="journal.html">Journal</a></li><li><a href="https://www.instagram.com/">Instagram</a></li><li><a href="https://www.tiktok.com/">TikTok</a></li></ul></div>
    </div>
    <div class="fbase"><span>© 2026 Paper Land. All rights reserved.</span><span>Privacy Policy · Terms of Use</span></div>
  </div></footer>
  <div class="scrim" id="scrim"></div>
  <aside class="drawer" aria-label="Your cart">
    <div class="dhead"><h3>Your Cart</h3><button id="cartClose">Close</button></div>
    <div class="ship" id="ship"></div><div class="items" id="items"></div>
    <div class="dfoot"><div class="tot"><span>Subtotal</span><span id="subtotal">$0.00</span></div>
      <small>Shipping and GST calculated at checkout. Prices in AUD.</small>
      <button class="btn solid" id="checkout">Continue to Checkout</button>
      <div class="msg" id="msg">Online checkout opens with our first release — your cart is saved in this browser.</div></div>
  </aside>`;

  // dropdown
  const dd=$('#dd'), ddBtn=$('#ddBtn');
  ddBtn.addEventListener('click',e=>{e.stopPropagation();ddBtn.setAttribute('aria-expanded',dd.classList.toggle('open'))});
  document.addEventListener('click',e=>{if(!dd.contains(e.target)||e.target.closest('.dd-panel a')){dd.classList.remove('open');ddBtn.setAttribute('aria-expanded',false)}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){dd.classList.remove('open');closeCart()}});
  $('#burger').onclick=()=>$('#menu').classList.toggle('open');
  // newsletter
  $('#clubForm').addEventListener('submit',e=>{e.preventDefault();e.target.style.display='none';$('#clubOk').style.display='block'});
  // cart
  $('#cartOpen').onclick=openCart; $('#cartClose').onclick=closeCart; $('#scrim').onclick=closeCart;
  $('#checkout').onclick=()=>{$('#msg').style.display='block'};
}

/* ---------- cart (shared across pages via localStorage when available) ---------- */
let cart={};
try{cart=JSON.parse(localStorage.getItem('pl-cart')||'{}')||{}}catch(e){cart={}}
const saveCart=()=>{try{localStorage.setItem('pl-cart',JSON.stringify(cart))}catch(e){}};
function openCart(){document.body.classList.add('cart-open')}
function closeCart(){document.body.classList.remove('cart-open')}
function addToCart(id,qty=1){cart[id]=(cart[id]||0)+qty;saveCart();drawCart()}
function drawCart(){
  const ids=Object.keys(cart).filter(id=>PRODUCTS[id]);
  const count=ids.reduce((s,id)=>s+cart[id],0);
  const sub=ids.reduce((s,id)=>s+cart[id]*PRODUCTS[id].price,0);
  $('#cartCount').textContent=count;
  $('#subtotal').textContent=money(sub);
  const left=Math.max(0,FREE_SHIP-sub);
  $('#ship').innerHTML=(left>0?`You're ${money(left)} away from free shipping.`:`You've unlocked free shipping.`)+`<div class="bar"><i style="width:${Math.min(100,sub/FREE_SHIP*100)}%"></i></div>`;
  $('#items').innerHTML=ids.length?ids.map(id=>{const p=PRODUCTS[id];const bg=p.set?PRODUCTS[p.set[0]].bg:p.bg;
    return `<div class="item"><a href="product.html#${id}" class="sw" style="background:${bg}"></a><div><h5><a href="product.html#${id}">${titleOf(id)}</a></h5><small>${money(p.price)}</small>
    <div class="qty"><button data-q="-1" data-id="${id}" aria-label="Decrease">−</button>${cart[id]}<button data-q="1" data-id="${id}" aria-label="Increase">+</button></div></div>
    <strong style="font-weight:400">${money(p.price*cart[id])}</strong></div>`}).join(''):'<div class="empty">Your cart is empty — for now.</div>';
}
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-add]');
  if(a){addToCart(a.dataset.add);a.textContent='Added ✓';a.classList.add('done');setTimeout(()=>{a.textContent='Add to Cart';a.classList.remove('done')},1400)}
  const q=e.target.closest('[data-q]');
  if(q){const id=q.dataset.id;cart[id]+= +q.dataset.q;if(cart[id]<=0)delete cart[id];saveCart();drawCart()}
});

/* ---------- page: home ---------- */
function pageHome(){
  [['h1','a','alleyway'],['h2','b','brekkie'],['h3','c','iced-coffee']].forEach(([e,c,id])=>{const el=document.getElementById(e);el.outerHTML=cover(id).replace('class="nb','class="nb '+c)});
  $('#notes').innerHTML=[...NOTES,...NOTES].map(([q,s])=>`<div class="note"><q>${q}</q><span>— ${s}</span></div>`).join('');
  $('#chapters').innerHTML=Object.entries(COLLECTIONS).map(([k,c],i)=>{
    const items=Object.keys(PRODUCTS).filter(id=>PRODUCTS[id].col===k);
    return `<section class="chapter"><div class="ch-text"><div class="eyebrow">${c.chapter}</div><div class="native">${c.sub}</div><h2>${c.name}</h2><p>${c.blurb}</p>
      <a href="collections.html#${k}" class="btn">Explore Collection</a></div>
      <div class="ch-visual" style="background:${c.bg}"><span class="ch-num">${['i.','ii.','iii.'][i]}</span>${items.map(cover).join('')}</div></section>`}).join('');
  $('#featured').innerHTML=['iced-coffee','arvo','someday','saigon-set'].map(card).join('');
  $('#jprev').innerHTML=Object.entries(JOURNAL).map(([k,j])=>postCard(k,j)).join('');
}
function postCard(k,j){
  return `<article class="post"><a href="article.html#${k}"><div class="img" style="background:${j.bg}"><div class="glyph">${j.glyph}</div></div></a>
    <div class="txt"><time>${j.date}</time> · <span class="cat">${j.cat}</span><h3><a href="article.html#${k}">${j.title}</a></h3><p>${j.lede}</p><a href="article.html#${k}" class="link">Read More</a></div></article>`;
}

/* ---------- page: shop ---------- */
function pageShop(){
  const valid=['all','saigon','adelaide','studio','sets'];
  const draw=()=>{
    let f=location.hash.slice(1); if(!valid.includes(f)) f='all';
    document.querySelectorAll('#filters a').forEach(b=>b.classList.toggle('on',b.dataset.f===f));
    let ids=Object.keys(PRODUCTS).filter(id=>f==='all'||PRODUCTS[id].col===f);
    const s=$('#sort').value;
    if(s==='low') ids.sort((a,b)=>PRODUCTS[a].price-PRODUCTS[b].price);
    if(s==='high') ids.sort((a,b)=>PRODUCTS[b].price-PRODUCTS[a].price);
    $('#grid').innerHTML=ids.map(card).join('');
    $('#count').textContent=ids.length+' products';
    $('#shopTitle').textContent= f==='all'?'Shop all notebooks': f==='sets'?'Gift sets': COLLECTIONS[f].name;
  };
  window.addEventListener('hashchange',draw); $('#sort').onchange=draw; draw();
}

/* ---------- page: product ---------- */
function pageProduct(){
  const draw=()=>{
    let id=location.hash.slice(1); if(!PRODUCTS[id]) id='iced-coffee';
    const p=PRODUCTS[id], col=COLLECTIONS[p.col];
    document.title=titleOf(id)+' — Paper Land';
    const views=[cover(id)];
    if(!p.set){views.push(`<div class="spread"><div><em>${p.spiral?'notes':p.name}</em></div><div></div></div>`);
      views.push(p.spiral?cover(id):`<div class="nb back ${p.dark?'dark':''}" style="background:${p.bg}"><div class="label"><b>Paper Land</b>${p.fmt.split(' · ')[0]}<br>${p.ruling}</div></div>`);}
    else views.push(...p.set.map(cover));
    let qty=1;
    $('#pdp').innerHTML=`
      <div class="gallery"><div class="main" id="main">${views[0]}</div>
        <div class="thumbs" style="grid-template-columns:repeat(${views.length},1fr)">${views.map((v,i)=>`<button data-v="${i}" class="${i?'':'on'}" aria-label="View ${i+1}">${v.replace('class="spread"','class="spread small"')}</button>`).join('')}</div></div>
      <div class="info">
        <div class="eyebrow">${col?`<a href="collections.html#${p.col}">${col.name}</a>`:'<a href="shop.html#sets">Gift Sets</a>'}</div>
        <h1>${titleOf(id)}</h1><div class="price">${money(p.price)} AUD</div>
        ${p.def?`<div class="defn"><small>${p.name} · ${p.ph} · noun</small>${p.def}</div>`:''}
        <p class="desc">${p.desc}</p>
        <div class="buy"><div class="stepper"><button id="minus" aria-label="Decrease">−</button><span id="qty">1</span><button id="plus" aria-label="Increase">+</button></div>
          <button class="btn solid" id="buy">Add to Cart</button></div>
        <div class="note-ship">Free shipping Australia-wide on orders over $${FREE_SHIP}. Dispatched from Adelaide in 1–2 business days.</div>
        <details open><summary>Details</summary><div class="body"><ul>
          <li>Format: ${p.fmt}</li><li>Pages: ${p.set?'three notebooks, as listed':p.spiral?'80 pages, 100gsm':'160 numbered pages, 120gsm ivory paper'}</li>
          <li>Ruling: ${p.set?'mixed':p.ruling}</li>${p.spiral||p.set?'':'<li>Lay-flat binding, elastic closure, ribbon marker and back pocket</li>'}</ul></div></details>
        <details><summary>Shipping &amp; Returns</summary><div class="body">Standard shipping $9.95 Australia-wide, free over $${FREE_SHIP}. Unused items can be returned within 30 days. <a href="help.html#shipping" style="border-bottom:1px solid">Full policy</a>.</div></details>
        <details><summary>Paper &amp; Pens</summary><div class="body">Tested with gel, ballpoint, pencil and fine fountain pens. Very wet markers may show through — try them on the last page first.</div></details>
      </div>`;
    document.querySelectorAll('.thumbs button').forEach(b=>b.onclick=()=>{$('#main').innerHTML=views[b.dataset.v];document.querySelectorAll('.thumbs button').forEach(x=>x.classList.toggle('on',x===b))});
    $('#minus').onclick=()=>{qty=Math.max(1,qty-1);$('#qty').textContent=qty};
    $('#plus').onclick=()=>{qty++;$('#qty').textContent=qty};
    $('#buy').onclick=()=>{addToCart(id,qty);openCart()};
    $('#crumb').innerHTML=`<a href="index.html">Home</a> / <a href="shop.html">Shop</a> / ${col?`<a href="collections.html#${p.col}">${col.name}</a> / `:''}${titleOf(id)}`;
    const rel=Object.keys(PRODUCTS).filter(x=>x!==id&&(PRODUCTS[x].col===p.col)).concat(Object.keys(PRODUCTS).filter(x=>x!==id&&PRODUCTS[x].col!==p.col)).slice(0,4);
    $('#related').innerHTML=rel.map(card).join('');
    window.scrollTo(0,0);
  };
  window.addEventListener('hashchange',draw); draw();
}

/* ---------- page: collections ---------- */
function pageCollections(){
  $('#cols').innerHTML=Object.entries(COLLECTIONS).map(([k,c])=>{
    const items=Object.keys(PRODUCTS).filter(id=>PRODUCTS[id].col===k);
    return `<section class="col-block" id="${k}"><div class="col-intro"><div><div class="eyebrow">${c.chapter}</div><h2>${c.name}</h2><div class="native">${c.sub}</div></div>
      <div><p>${c.blurb}</p><p style="margin-top:18px"><a href="shop.html#${k}" class="link">Shop ${c.name}</a></p></div></div>
      <div class="grid ${items.length===3?'three':''}">${items.map(card).join('')}</div></section>`}).join('');
  if(location.hash){const t=document.getElementById(location.hash.slice(1)); if(t) setTimeout(()=>t.scrollIntoView(),50)}
  window.addEventListener('hashchange',()=>{const t=document.getElementById(location.hash.slice(1)); if(t) t.scrollIntoView({behavior:'smooth'})});
}

/* ---------- page: about ---------- */
function pageAbout(){ $('#storyVis').innerHTML=cover('iced-coffee')+cover('arvo'); }

/* ---------- page: journal ---------- */
function pageJournal(){
  const e=Object.entries(JOURNAL);
  $('#jlist').innerHTML=e.map(([k,j],i)=>postCard(k,j).replace('class="post"',i===0?'class="post feature"':'class="post"')).join('');
}
function pageArticle(){
  const draw=()=>{
    const keys=Object.keys(JOURNAL); let k=location.hash.slice(1); if(!JOURNAL[k]) k=keys[0];
    const j=JOURNAL[k]; document.title=j.title+' — Paper Land';
    const next=keys[(keys.indexOf(k)+1)%keys.length];
    $('#article').innerHTML=`<div class="crumbs"><a href="index.html">Home</a> / <a href="journal.html">Journal</a></div>
      <div style="margin-top:30px"><time class="cat">${j.date}</time> · <span class="cat">${j.cat}</span></div>
      <h1>${j.title}</h1><div class="hero-img" style="background:${j.bg}"><div class="glyph">${j.glyph}</div></div>
      <p class="lede">${j.lede}</p><div class="body">${j.body}</div>
      <div class="end"><a href="journal.html" class="link">← All Journal posts</a><a href="article.html#${next}" class="link">Next: ${JOURNAL[next].title} →</a></div>`;
    window.scrollTo(0,0);
  };
  window.addEventListener('hashchange',draw); draw();
}

/* ---------- page: help ---------- */
function pageHelp(){
  $('#cForm').addEventListener('submit',e=>{e.preventDefault();e.target.querySelectorAll('input,select,textarea,button').forEach(x=>x.disabled=true);$('#cOk').style.display='block'});
  if(location.hash){const t=document.getElementById(location.hash.slice(1)); if(t){if(t.tagName==='DETAILS')t.open=true;setTimeout(()=>t.scrollIntoView(),50)}}
}

/* ---------- welcome popup (once per visitor, after a short delay) ---------- */
const WELCOME_KEY='pl-welcome-seen', WELCOME_CODE='HELLO10', WELCOME_DELAY=4000;
function seenWelcome(){try{return localStorage.getItem(WELCOME_KEY)||sessionStorage.getItem(WELCOME_KEY)}catch(e){return false}}
function markWelcome(){try{localStorage.setItem(WELCOME_KEY,'1')}catch(e){try{sessionStorage.setItem(WELCOME_KEY,'1')}catch(e2){}}}
function welcome(){
  if(seenWelcome()) return;
  const w=document.createElement('div');
  w.className='welcome'; w.setAttribute('role','dialog'); w.setAttribute('aria-modal','true'); w.setAttribute('aria-labelledby','wTitle');
  w.innerHTML=`<div class="w-box">
    <button class="w-x" aria-label="Close">×</button>
    <div class="w-img" aria-hidden="true">
      <div class="spread w-spread"><div><em>today</em><span class="w-stick s1">plan~</span><span class="w-stick s2">☕</span></div><div><span class="w-stick s3">do not disturb</span><span class="w-photo"></span></div></div>
      ${cover('iced-coffee').replace('class="nb','class="nb w-nb')}
      <span class="w-badge">10% off</span>
    </div>
    <div class="w-copy">
      <div class="eyebrow">Welcome to Paper Land</div>
      <h2 id="wTitle">Your first notebook, <mark>10% off.</mark></h2>
      <p>Join the Paper Club for a welcome code, new collection drops and one slow email a month.</p>
      <form class="w-form"><input type="email" required placeholder="Your email address" aria-label="Email address"><button class="btn solid" type="submit">Get my 10% code</button></form>
      <div class="w-done"><p>You're in! Use this code at checkout:</p><button class="w-code" title="Copy code">${WELCOME_CODE}<small>tap to copy</small></button></div>
      <button class="w-no">No thanks, I'll pay full price</button>
      <small class="w-fine">New customers only. One use per order.</small>
    </div></div>`;
  document.body.appendChild(w);
  const close=()=>{w.classList.remove('show');markWelcome();setTimeout(()=>w.remove(),350)};
  w.addEventListener('click',e=>{if(e.target===w)close()});
  w.querySelector('.w-x').onclick=close; w.querySelector('.w-no').onclick=close;
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.contains(w))close()});
  w.querySelector('.w-form').addEventListener('submit',e=>{e.preventDefault();markWelcome();w.classList.add('joined')});
  w.querySelector('.w-code').onclick=async e=>{const b=e.currentTarget;try{await navigator.clipboard.writeText(WELCOME_CODE);b.querySelector('small').textContent='copied ✓'}catch(err){b.querySelector('small').textContent='select & copy: '+WELCOME_CODE}};
  setTimeout(()=>{w.classList.add('show');w.querySelector('input').focus({preventScroll:true})},WELCOME_DELAY);
}

/* ---------- boot ---------- */
chrome(); drawCart(); welcome();
({home:pageHome,shop:pageShop,product:pageProduct,collections:pageCollections,about:pageAbout,journal:pageJournal,article:pageArticle,help:pageHelp}[document.body.dataset.page]||(()=>{}))();
