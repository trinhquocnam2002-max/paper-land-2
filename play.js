/* ================= Enter Paper Land — cosy pixel adventure ================= */
(() => {
const INK = '#2b2340';

/* ---------- pixel sprites (12 × 14) ---------- */
const SPRITES = {
  bean: { pal:{k:'#2b1d14',b:'#7a4a2b',l:'#a46a40',w:'#ffffff',p:'#f08f8f'}, rows:[
    '....kkkk....',
    '..kkbbbbkk..',
    '.kblllbbbbk.',
    '.kbllbbbbbk.',
    'kbbbbbkbbbbk',
    'kbwkbbkbwkbk',
    'kbkkbbkbkkbk',
    'kbbbbbkbbbbk',
    'kbpbbkbbbpbk',
    '.kbbbkbbbbk.',
    '.kbbbbkbbbk.',
    '..kkbbbbkk..',
    '...kk..kk...',
    '..kkk..kkk..']},
  arvo: { pal:{k:'#2a2a2e',g:'#9a9692',d:'#6a6663',p:'#f2a7b0',w:'#fbf7f2'}, rows:[
    'kk........kk',
    'kpk......kpk',
    'kpgkkkkkkgpk',
    '.kggggggggk.',
    'kgggggggggdk',
    'kgwkggggwkgk',
    'kgkkggggkkgk',
    'kggggppggggk',
    '.kgggggggggk',
    '..kwwwwwwk..',
    '.kgwwwwwwgkk',
    '.kgwwwwwwgkd',
    '.kggggggggkd',
    '..kk....kkd.']},
  pip: { pal:{k:'#2b2b2b',e:'#f4a3b5',m:'#b8bcc4',y:'#f6c64a',o:'#d9a233',t:'#ebcfa3',p:'#f08f8f'}, rows:[
    '....kkkk....',
    '...keeeek...',
    '...keeeek...',
    '...kmmmmk...',
    '...kyyyok...',
    '...kykyok...',
    '...kpyypk...',
    '..kkyyyokk..',
    '.k.kyyyok.k.',
    '...kyyyok...',
    '...kttttk...',
    '....kttk....',
    '.....kk.....',
    '.....kk.....']},
};
function drawSprite(ctx,id,x,y,flip=false){
  const s=SPRITES[id];
  s.rows.forEach((row,j)=>{for(let i=0;i<12;i++){const c=row[flip?11-i:i];if(c!=='.'){ctx.fillStyle=s.pal[c];ctx.fillRect(x+i,y+j,1,1)}}});
}
function spriteCanvas(cv,id){const c=cv.getContext('2d');c.clearRect(0,0,12,14);drawSprite(c,id,0,0)}

/* ---------- data ---------- */
const GUIDES = {
  bean:{name:'Bean',cls:'The Early Riser',bio:'A coffee bean from Saigon who has never once hit snooze. Knows every café in Paper Land.',
    stats:{Speed:5,Planning:3,Chill:2},hello:'Morning! I’m Bean. Let’s go before the iced coffee melts!',back:'You’re back! The coffee’s still cold — perfect.'},
  arvo:{name:'Arvo',cls:'The Afternoon Possum',bio:'A brushtail possum from the Adelaide Hills who does her best thinking at 3pm with a cuppa.',
    stats:{Speed:2,Planning:3,Chill:5},hello:'G’day! I’m Arvo. No rush — we’ve got all afternoon.',back:'Oh, hello again. Kettle’s on.'},
  pip:{name:'Pip',cls:'The Planner',bio:'A pencil from Someday Tower with a list for everything — including a list of lists.',
    stats:{Speed:3,Planning:5,Chill:1},hello:'Hello! I’m Pip. I’ve made us an itinerary: six stops. Shall we?',back:'Welcome back! I updated the itinerary while you were away.'},
};
/* places: entrance = road cell where the guide stands; anchor = label position (grid x, y, z) */
const LOCS = [
  {id:'shop',key:1,name:'Notebook Stack Store',door:[13,5],anchor:[13.5,3,4.6],
    lines:['Welcome to the Notebook Stack Store — the whole building is made of our notebooks!','Every notebook in Paper Land is stocked here. Pick the word that sounds most like your day.'],
    items:['iced-coffee','arvo','someday'],go:{label:'Browse every notebook',href:'shop.html'}},
  {id:'saigon',key:2,name:'Paper Cup Café',door:[6,9],anchor:[5.5,7.5,5.6],
    lines:['The Paper Cup Café! Iced coffee to go, just like the street cafés of Saigon.','This is where the Saigon Mornings notebooks hang out: iced coffee, alleyway and street food.'],
    items:['iced-coffee','alleyway','street-food'],go:{label:'See the Saigon collection',href:'collections.html#saigon'}},
  {id:'adelaide',key:3,name:'Pencil Case Cottage',door:[15,10],anchor:[15.5,8.5,3.6],
    lines:['Pencil Case Cottage — the cosiest spot in Paper Land for a slow arvo.','Grab a cuppa. The to-do list can wait until tomorrow.'],
    items:['arvo','brekkie','cuppa'],go:{label:'See the Arvo collection',href:'collections.html#adelaide'}},
  {id:'someday',key:4,name:'Pencil Tower',door:[8,4],anchor:[7.5,2.5,11.6],
    lines:['Pencil Tower! From the top you can see every plan you’ve ever made.','Our planners are undated, so you can start in any month. Even this one.'],
    items:['someday','pocket-notes','arvo-set'],go:{label:'See Someday Studio',href:'collections.html#studio'}},
  {id:'crabit',key:5,name:'Crabit Coffee Port',door:[6,16],anchor:[4.5,15.5,3.6],
    lines:['Boats float down the Cold Brew River to this port, bringing Crabit’s Coffee Series from Vietnam.','Crabit is our guest brand — every notebook is named after a coffee bean or café drink.'],
    items:['crabit-liberica','crabit-americano','crabit-latte'],go:{label:'See the Crabit collection',href:'collections.html#crabit'}},
  {id:'quest',key:6,name:'Sticky Note Board',door:[10,17],anchor:[10,18,4.6],
    lines:['The Sticky Note Board! Finish a quest, earn a reward.'],quest:true},
];
const STATS = {
  'iced-coffee':['FOCUS +20','EARLY START +25','Snooze −30%'],
  'alleyway':['CURIOSITY +30','IDEAS +18','Getting lost +5%'],
  'street-food':['VARIETY +25','CRUNCH +12','Boredom −20%'],
  'arvo':['CHILL +28','PLANNING +14','Deadlines −10%'],
  'brekkie':['MOTIVATION +22','MONDAY RESIST +15','Hunger −50%'],
  'cuppa':['CALM +30','FOCUS +10','Inbox stress −25%'],
  'someday':['PLANNING +35','HOPE +20','Guilt −40%'],
  'pocket-notes':['MEMORY +18','POCKETABILITY +30','Forgetting −25%'],
  'arvo-set':['CHILL +28','MOTIVATION +22','CALM +30'],
  'crabit-liberica':['STRUCTURE +26','BOLDNESS +20','Mess −15%'],
  'crabit-americano':['FOCUS +24','ENERGY +18','Sleepiness −20%'],
  'crabit-latte':['COMFORT +28','CREATIVITY +16','Grumpiness −35%'],
};

/* ---------- save state ---------- */
let save={guide:null,visited:[]};
try{save=Object.assign(save,JSON.parse(localStorage.getItem('pl-game')||'{}'))}catch(e){}
const persist=()=>{try{localStorage.setItem('pl-game',JSON.stringify(save))}catch(e){}};
const visited=new Set(save.visited||[]);

/* ---------- sound (8-bit blips) ---------- */
let AC=null, soundOn=true;
function blip(f=660,d=.07,type='square',v=.04,when=0){
  if(!AC||!soundOn) return;
  const t=AC.currentTime+when, o=AC.createOscillator(), g=AC.createGain();
  o.type=type;o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);
  o.connect(g).connect(AC.destination);o.start(t);o.stop(t+d+.02);
}
const jingle=()=>[523,659,784,1047].forEach((f,i)=>blip(f,.12,'square',.05,i*.1));
const coin=()=>{blip(988,.06,'square',.05);blip(1319,.12,'square',.05,.06)};
const fanfare=()=>[523,523,523,698,880,1047].forEach((f,i)=>blip(f,.14,'triangle',.07,i*.12));

/* ---------- screens ---------- */
const $=s=>document.querySelector(s);
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id))}

/* ---------- title ---------- */
(function title(){
  drawMug();drawPencil();
  const msgs=['Sharpening pencils…','Roasting coffee beans…','Placing the blocks…','Frothing the milk…','Ready!'];
  let p=0;const iv=setInterval(()=>{p+=1;$('#lfill').style.width=(p*20)+'%';$('#lmsg').textContent=msgs[Math.min(p,msgs.length-1)];
    if(p>=5){clearInterval(iv);setTimeout(()=>{$('#loader').style.display='none';$('#startBtn').classList.add('on');$('#startBtn').focus()},300)}},380);
  $('#startBtn').onclick=start;
  document.addEventListener('keydown',e=>{if($('#title').classList.contains('on')&&$('#startBtn').classList.contains('on')&&(e.key==='Enter'||e.key===' ')){e.preventDefault();start()}});
})();
function drawMug(){const c=$('#mugCv'),g=c.getContext('2d');const P=(x,y,col)=>{g.fillStyle=col;g.fillRect(x,y,1,1)};
  for(let y=0;y<32;y++)for(let x=0;x<32;x++){const d=Math.hypot(x+.5-15,y+.5-16);let col=null;
    if(d<15.5)col='#e9e1d3';if(d<15.5&&d>14.5)col='#2b2340';if(d<11.5)col='#2b2340';if(d<10.6)col='#fbf8f2';if(d<8.6)col='#c58b55';if(d<6.8)col='#6b4329';
    const hx=(x+.5-15)/4.2,hy=-(y+.5-15.5)/4.2;if(d<8.6&&Math.pow(hx*hx+hy*hy-1,3)-hx*hx*hy*hy*hy<0)col='#fbf1df';
    if(x>=25&&x<=29&&y>=13&&y<=19&&!(x>=26&&x<=28&&y>=14&&y<=18)&&d>10.5)col='#fbf8f2';if((x===24||x===30)&&y>=12&&y<=20&&d>10.5)col='#2b2340';if(x>=24&&x<=30&&(y===12||y===20)&&d>10.5)col='#2b2340';
    if(col)P(x,y,col)}}
function drawPencil(){const c=$('#pencilCv'),g=c.getContext('2d');const R2=(x,y,w,h,col)=>{g.fillStyle=col;g.fillRect(x,y,w,h)};
  R2(0,0,64,8,'#2b2340');R2(1,1,8,6,'#f4a3b5');R2(9,1,4,6,'#c0c4cc');R2(13,1,40,6,'#f6c64a');R2(13,5,40,2,'#d9a233');
  for(let i=0;i<8;i++)R2(53+i,1+Math.floor(i/2.7),1,6-2*Math.floor(i/2.7),'#ebcfa3');R2(60,3,3,2,'#3a3a40');R2(61,0,3,8,'transparent')}
function start(){
  $('#title').classList.add('zoom');
  try{AC=AC||new (window.AudioContext||window.webkitAudioContext)()}catch(e){}
  jingle();
  setTimeout(()=>{if(save.guide&&GUIDES[save.guide]) enterWorld(true); else openSelect()},650);
}

/* ---------- guide select ---------- */
function openSelect(){
  show('select');
  $('#guides').innerHTML=Object.entries(GUIDES).map(([id,g])=>`<button class="guide" data-g="${id}">
    <canvas width="12" height="14" data-s="${id}"></canvas><h3>${g.name}</h3><div class="cls">${g.cls}</div><p>${g.bio}</p>
    <ul class="stats">${Object.entries(g.stats).map(([k,v])=>`<li>${k}<b><i style="width:${v*20}%"></i></b></li>`).join('')}</ul></button>`).join('');
  document.querySelectorAll('#guides canvas').forEach(c=>spriteCanvas(c,c.dataset.s));
  document.querySelectorAll('.guide').forEach(b=>{
    b.onmouseenter=()=>blip(880,.04);
    b.onclick=()=>{save.guide=b.dataset.g;persist();blip(1047,.1);enterWorld(false)};
  });
  document.querySelector('.guide').focus();
}

/* ================= isometric block world ================= */
const cv=$('#map'), ctx=cv.getContext('2d'), W=344, H=236, N=20, OX=172, OY=62;
const hashN=(a,b,s=0)=>{let h=(a*374761393+b*668265263+s*2147483647)>>>0;h=(h^(h>>>13))*1274126177>>>0;return ((h^(h>>>16))>>>0)/4294967295};
const pick=(arr,r)=>arr[Math.min(arr.length-1,Math.floor(r*arr.length))];
const mul=(hex,k)=>{const n=parseInt(hex.slice(1),16);const r=Math.min(255,((n>>16)&255)*k)|0,g=Math.min(255,((n>>8)&255)*k)|0,b=Math.min(255,(n&255)*k)|0;return `rgb(${r},${g},${b})`};

/* --- block texture shaders: (face, u, v, r) → colour; face T=top, L=left/front (+y), R=right (+x) --- */
const DIRT=['#8a5a3b','#7d5134','#94643f','#6f4a30'];
const fabric=['#6f8f5c','#678654','#779964','#6a8a57'];
const cover=c=>(f,u,v,r)=>f==='T'?((u>.7&&u<.8)?'#1f1d1b':(r<.15?mul(c,1.06):c)):(v<.16||v>.86?c:((v*16|0)%2?'#f4ede1':'#e3d8c6'));
const SH={
  grass:(f,u,v,r)=>f==='T'?(r<.025?pick(['#f6a7c1','#ffd25e','#fff7e6'],r*40):pick(['#86b856','#7fb04f','#8dbf5c','#79a84a'],r)):(v<.2+(r<.5?.07:0)?'#7fb04f':pick(DIRT,r)),
  dirt:(f,u,v,r)=>pick(DIRT,r),
  stone:(f,u,v,r)=>pick(['#8e8a86','#7d7975','#9b9792','#86827e'],r),
  path:(f,u,v,r)=>f==='T'?pick(['#e6d3ad','#dcc59a','#eddcb9','#d3b98a'],r):(v<.15?'#dcc59a':pick(DIRT,r)),
  water:(f,u,v,r)=>f==='T'?(Math.sin((u*1.3+v)*16+r)>.85?'#c9a27a':pick(['#7a4f33','#83563a','#734a30'],r)):pick(['#5e3d27','#6b4329'],r),
  bush:(f,u,v,r)=>r<.08?pick(['#d64538','#e0573f','#b8362c'],r*12):pick(['#3f7d3a','#4a8a3f','#35702f','#55964a'],r),
  leaves:(f,u,v,r)=>r<.06?'#3f7d3a':pick(['#7d9a5a','#8aa866','#71904f','#93ad6c'],r),
  log:(f,u,v,r)=>f==='T'?((Math.hypot(u-.5,v-.5)*10|0)%2?'#c9a37a':'#b08a5e'):((u*16|0)%4===0?'#bfb6a5':pick(['#e8e2d6','#ddd6c8','#efe9de'],r)),
  plank:(f,u,v,r)=>((f==='T'?u:v)*16|0)%4===0?'#6b4329':pick(['#a8754a','#9c6b42','#b07c4f'],r),
  nbT:cover('#d49b7b'), nbS:cover('#a9b49c'), nbC:cover('#2b2927'), nbB:cover('#9dadc9'),
  doorS:(f,u,v,r)=>f==='L'&&u>.3&&u<.72&&v>.28?((u>.6&&u<.66&&v>.6&&v<.68)?'#ffd25e':'#6b4329'):SH.nbS(f,u,v,r),
  cup:(f,u,v,r)=>f==='T'?'#f7f3ea':pick(['#f7f3ea','#f1ece2'],r),
  sleeve:(f,u,v,r)=>f==='T'?'#f7f3ea':((u>.28&&u<.72&&v>.3&&v<.7)?((u>.42&&u<.58&&v>.38&&v<.62)?'#f7f3ea':'#7a4a2b'):pick(['#c9a37a','#bf9a70'],r)),
  lid:(f,u,v,r)=>f==='T'?((u>.62&&u<.75&&v>.2&&v<.33)?'#2b2340':(Math.hypot(u-.5,v-.5)>.42?'#e9e4da':'#ffffff')):(v<.3?'#ffffff':'#e9e4da'),
  pcase:(f,u,v,r)=>pick(fabric,r),
  zip:(f,u,v,r)=>f==='T'&&v>.4&&v<.6?((u*16|0)%2?'#e8e2d6':'#5a5a62'):(f!=='T'&&v<.12?'#5a7a48':pick(fabric,r)),
  pdoor:(f,u,v,r)=>f==='L'&&u>.32&&u<.7&&v>.25?((u>.58&&u<.64&&v>.58&&v<.66)?'#ffd25e':'#6b4329'):(f==='R'&&u>.3&&u<.7&&v>.25&&v<.6?'#ffe28a':pick(fabric,r)),
  eraser:(f,u,v,r)=>pick(['#f4a3b5','#ee98ab','#f7b0c0'],r),
  metal:(f,u,v,r)=>(v*16|0)%3===0&&f!=='T'?'#8e939b':pick(['#c0c4cc','#b5b9c1'],r),
  pencilY:(f,u,v,r)=>f==='T'?'#f6c64a':((u*16|0)%5===0?'#d9a233':pick(['#f6c64a','#f2bf3f'],r)),
  wood:(f,u,v,r)=>pick(['#ebcfa3','#e2c391','#f0d7ae'],r),
  lead:(f,u,v,r)=>pick(['#3a3a40','#45454c'],r),
  crate:(f,u,v,r)=>(u<.1||u>.9||v<.1||v>.9)?'#8a5a3b':((f==='L'&&u>.35&&u<.65&&v>.35&&v<.6)?'#5e3d27':pick(['#c9a37a','#bf9a70'],r)),
  ruler:(f,u,v,r)=>f==='T'?((((u*16)|0)%2===0&&v<.28)?'#6b5a24':pick(['#f3d86b','#efd25e'],r)):'#e0bc45',
  cork:(f,u,v,r)=>pick(['#c08a5a','#b47f50','#a87448','#c99668'],r),
  mug:(f,u,v,r)=>pick(['#fbf8f2','#f3eee5'],r),
  coffee:(f,u,v,r)=>{if(f!=='T')return pick(['#fbf8f2','#f3eee5'],r);const x=(u-.5)*3.2,y=-(v-.5)*3.2-.1;
    if(Math.pow(x*x+y*y-1,3)-x*x*y*y*y<0)return '#fbf1df';return Math.hypot(u-.5,v-.5)>.36?'#c58b55':'#6b4329'},
};
['Y','P','B'].forEach((k,i)=>{const col=['#ffe066','#f6a7c1','#a7d3f2'][i];SH['cork'+k]=(f,u,v,r)=>(f!=='T'&&u>.18&&u<.82&&v>.15&&v<.78)?((v>.3&&v<.36||v>.48&&v<.54)&&u>.28&&u<.72?mul(col,.8):col):SH.cork(f,u,v,r)});

const TEX={};
function tex(type,variant=0){
  const key=type+variant;if(TEX[key])return TEX[key];
  const c=document.createElement('canvas');c.width=16;c.height=16;const g=c.getContext('2d');const sh=SH[type];
  for(let y=0;y<16;y++)for(let x=0;x<16;x++){
    const px=x+.5,py=y+.5;let f=null,u,v;
    if(Math.abs(px-8)/8+Math.abs(py-4)/4<=1){f='T';u=(px-8)/16+py/8;v=-(px-8)/16+py/8}
    else if(px<8){const y1=4+px/2;if(py>=y1&&py<y1+8){f='L';u=px/8;v=(py-y1)/8}}
    else{const y1=8-(px-8)/2;if(py>=y1&&py<y1+8){f='R';u=1-(px-8)/8;v=(py-y1)/8}}
    if(!f)continue;
    const r=hashN(x,y,variant*31+type.length*7);let col=sh(f,Math.min(.999,Math.max(0,u)),Math.min(.999,Math.max(0,v)),r);if(!col)continue;
    let k=f==='T'?1:(f==='L'?.84:.68);
    if(f==='T'&&(u<.06||v<.06||u>.94||v>.94))k*=.9;
    if(f!=='T'&&(v>.93||u<.07))k*=.88;
    g.fillStyle=col.startsWith('#')?mul(col,k):col;g.fillRect(x,y,1,1);
  }
  return TEX[key]=c;
}

/* --- terrain --- */
const rc=gy=>2+((gy>=4&&gy<=7)?1:0);
const isRiver=(x,y)=>x>=rc(y)&&x<=rc(y)+1;
const ROAD=new Set();const addRoad=(x,y)=>ROAD.add(x+','+y);
for(let x=0;x<N;x++)addRoad(x,10);
for(let y=5;y<=17;y++)addRoad(10,y);
for(let x=8;x<=13;x++)addRoad(x,5);addRoad(8,4);
for(let y=11;y<=16;y++)addRoad(6,y);addRoad(6,9);
const isRoad=(x,y)=>ROAD.has(x+','+y);
const height=(x,y)=>isRiver(x,y)?0:1+((x>=16&&y<=4)?1:0)+((x>=17&&y<=2)?1:0);

const BL=[];const add=(x,y,z,t,v=0)=>BL.push({x,y,z,t,v});
for(let y=0;y<N;y++)for(let x=0;x<N;x++){
  const h=height(x,y),v=(hashN(x,y,5)*4)|0,edge=(x===N-1||y===N-1);
  if(edge)add(x,y,isRiver(x,y)?-2:-1,'stone',v);
  if(isRiver(x,y)){add(x,y,-1,'water',v);if(y===10)add(x,y,0,'ruler');continue}
  for(let z=0;z<h;z++){const top=z===h-1;add(x,y,z,top?(isRoad(x,y)?'path':'grass'):'dirt',v)}
}
// coffee farms (terraces at the back, strips by the river and at the front)
const farm=(x,y)=>!isRoad(x,y)&&!isRiver(x,y)&&y%2===0&&((x>=16&&y<=6)||(x<=rc(y)-1&&y!==10)||(x>=17&&y>=13));
for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(farm(x,y))add(x,y,height(x,y),'bush',(hashN(x,y,9)*4)|0);
// gum trees (small blocky canopy)
[[4,1],[18,12],[5,12],[12,17],[0,15],[17,5],[9,7]].forEach(([x,y])=>{const h=height(x,y);add(x,y,h,'log');add(x,y,h+1,'log');
  [[0,0],[1,0],[0,1],[-1,0],[0,-1]].forEach(([dx,dy])=>{const X=x+dx,Y=y+dy;if(X>=0&&Y>=0&&X<N&&Y<N)add(X,Y,h+2,'leaves',(hashN(X,Y)*4)|0)});
  add(x,y,h+3,'leaves',2)});
// 1. Notebook Stack Store (back right)
for(let x=12;x<=15;x++)for(let y=2;y<=4;y++)add(x,y,1,x===13&&y===4?'doorS':'nbS');
for(let x=12;x<=15;x++)for(let y=2;y<=4;y++)add(x,y,2,'nbT');
for(let x=12;x<=14;x++)for(let y=2;y<=3;y++)add(x,y,3,'nbC');
for(let x=13;x<=14;x++)add(x,3,4,'nbB');
// 2. Paper Cup Café (left)
for(let x=5;x<=6;x++)for(let y=7;y<=8;y++){add(x,y,1,'cup');add(x,y,2,'sleeve');add(x,y,3,'cup');add(x,y,4,'lid')}
// 3. Pencil Case Cottage (right)
for(let x=14;x<=17;x++)for(let y=8;y<=9;y++){add(x,y,1,(x===15&&y===9)?'pdoor':'pcase');add(x,y,2,'zip')}
// 4. Pencil Tower (back)
for(let x=7;x<=8;x++)for(let y=2;y<=3;y++){add(x,y,1,'eraser');add(x,y,2,'metal');for(let z=3;z<=7;z++)add(x,y,z,'pencilY');add(x,y,8,'wood')}
add(7,2,9,'wood');add(7,2,10,'lead');
// 5. Crabit Coffee Port (front left, on the river)
add(3,16,0,'plank');add(2,16,0,'plank');add(4,15,1,'crate');add(4,15,2,'crate');add(5,15,1,'crate');add(4,16,1,'crate');
// 6. Sticky Note Board (front)
add(9,18,1,'log');add(11,18,1,'log');add(9,18,2,'corkY');add(10,18,2,'corkP');add(11,18,2,'cork');add(9,18,3,'cork');add(10,18,3,'corkB');add(11,18,3,'corkY');
// coffee mug fountain
for(let x=13;x<=15;x++)for(let y=13;y<=15;y++){add(x,y,1,'mug');add(x,y,2,(x===14&&y===14)?'coffee':'mug')}
add(16,14,2,'mug');
BL.forEach(b=>b.k=(b.x+b.y)*1000+b.z*10+b.x*.01);BL.sort((a,b)=>a.k-b.k);

const scr=(x,y,z)=>({x:OX+(x-y)*8,y:OY+(x+y)*4-z*8});
const surf=(x,y)=>{const X=Math.round(x),Y=Math.round(y);return isRiver(X,Y)?1:height(X,Y)};

/* --- walking on roads (BFS) --- */
function findPath(from,to){
  const k=(x,y)=>x+','+y,prev=new Map([[k(...from),null]]),q=[from];
  while(q.length){const [x,y]=q.shift();if(x===to[0]&&y===to[1])break;
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const X=x+dx,Y=y+dy,kk=k(X,Y);if(isRoad(X,Y)&&!prev.has(kk)){prev.set(kk,[x,y]);q.push([X,Y])}})}
  const out=[];let cur=to;while(cur){out.unshift({x:cur[0],y:cur[1]});cur=prev.get(k(...cur))}
  return out;
}

const waterTop=[];BL.forEach(b=>{if(b.t==='water')waterTop.push(b)});
let player={x:10,y:10,flip:false}, route=[], here=null, target=null, last=0, stepT=0, frame=0;
function drawBlock(b){const p=scr(b.x,b.y,b.z);ctx.drawImage(tex(b.t,b.v),p.x-8,p.y)}
function draw(ts){
  const dt=Math.min(.05,(ts-last)/1000||0);last=ts;
  if(route.length){const pt=route[0],dx=pt.x-player.x,dy=pt.y-player.y,dist=Math.hypot(dx,dy),sp=4.6*dt;
    if(Math.abs(dx-dy)>.01)player.flip=(dx-dy)<0;
    if(dist<=sp){player.x=pt.x;player.y=pt.y;route.shift();if(!route.length)arrive()}
    else{player.x+=dx/dist*sp;player.y+=dy/dist*sp}
    stepT+=dt;if(stepT>.18){stepT=0;frame^=1;blip(frame?220:180,.03,'square',.02)}}
  const tt=ts/1000;ctx.clearRect(0,0,W,H);
  // dynamic things sorted into the world
  const dyn=[];
  const pz=surf(player.x,player.y),pk=(Math.round(player.x)+Math.round(player.y))*1000+pz*10+5;
  dyn.push({k:pk,f:()=>{const p=scr(player.x,player.y,pz);R(Math.round(p.x)-4,Math.round(p.y)+3,9,2,'#00000040');
    drawSprite(ctx,save.guide||'bean',Math.round(p.x)-6,Math.round(p.y)-10-(route.length&&frame?1:0),player.flip)}});
  const by=11+((Math.sin(tt*.3)+1)/2)*8, bx=rc(Math.round(by))+.5;
  dyn.push({k:(Math.round(bx)+Math.round(by))*1000+5,f:()=>{const p=scr(bx,by,0);const X=Math.round(p.x),Y=Math.round(p.y)+2+Math.round(Math.sin(tt*2));
    R(X-7,Y,14,3,INK);R(X-6,Y,12,2,'#6b4329');R(X-4,Y-4,4,4,'#c9a37a');R(X,Y-3,3,3,'#b07a4f');R(X-4,Y-4,4,1,INK)}});
  dyn.sort((a,b)=>a.k-b.k);
  let di=0;
  for(const b of BL){while(di<dyn.length&&dyn[di].k<b.k){dyn[di].f();di++}drawBlock(b)}
  while(di<dyn.length){dyn[di].f();di++}
  // water shimmer
  waterTop.forEach((b,i)=>{if(((tt*1.5+i*.7)|0)%5===0){const p=scr(b.x,b.y,b.z);R(p.x-3+(i%3)*2,p.y+3+(i%2),3,1,'#d9b48c')}});
  // steam from the café cup and the mug fountain
  [[5.5,7.5,5,0],[14,14,3,2]].forEach(([x,y,z,o])=>{const p=scr(x,y,z);for(let i=0;i<4;i++){const yy=p.y+2-((tt*7+i*4+o)%14),xx=p.x-2+i*1.5+Math.round(Math.sin(tt*2+i));R(xx,yy,1,1,'#fffaf0')}});
  // quest "!"
  {const p=scr(10,18,4.6),qb=Math.round(Math.abs(Math.sin(tt*3))*3);R(p.x-1,p.y-10-qb,3,6,'#ffd25e');R(p.x-1,p.y-3-qb,3,2,'#ffd25e');R(p.x-2,p.y-11-qb,5,1,INK)}
  requestAnimationFrame(draw);
}
const R=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x|0,y|0,w|0,h|0)};

/* ---------- hotspots ---------- */
const mapbox=$('#mapbox');
LOCS.forEach(l=>{const btn=document.createElement('button');btn.className='spot';btn.dataset.id=l.id;
  const p=scr(...l.anchor);btn.style.left=(p.x/W*100)+'%';btn.style.top=(p.y/H*100)+'%';btn.setAttribute('aria-label',`Walk to ${l.name}`);
  btn.innerHTML=`<span><b class="key">${l.key}</b>${l.name}</span>`;btn.onclick=()=>walkTo(l.id);mapbox.appendChild(btn)});
for(let i=0;i<6;i++){const c=document.createElement('div');c.className='wcloud';c.style.top=(8+Math.random()*30)+'%';
  c.style.transform=`scale(${1+Math.random()*1.4})`;c.style.animationDuration=(40+Math.random()*30)+'s';c.style.animationDelay=(-Math.random()*60)+'s';$('#world').prepend(c)}
cv.addEventListener('click',e=>{const r=cv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*W,y=(e.clientY-r.top)/r.height*H;
  let best=null,bd=30;LOCS.forEach(l=>{const a=scr(...l.anchor),d=scr(l.door[0],l.door[1],1);const cx=(a.x+d.x)/2,cy=(a.y+d.y)/2;const dd=Math.hypot(cx-x,cy-y);if(dd<bd){bd=dd;best=l}});
  if(best)walkTo(best.id)});
function refreshSpots(){document.querySelectorAll('.spot').forEach(s=>s.classList.toggle('done',visited.has(s.dataset.id)));
  $('#hudPlaces').textContent=`Places ${visited.size}/${LOCS.length}`;$('#hudBadge').classList.toggle('on',visited.size>=LOCS.length)}
function walkTo(id){
  closeDialog();
  const l=LOCS.find(x=>x.id===id);if(!l)return;
  target=id;
  const from=[Math.round(player.x),Math.round(player.y)];
  if(from[0]===l.door[0]&&from[1]===l.door[1]&&!route.length){arrive();return}
  route=findPath(from,l.door).slice(1);
  here=null;blip(523,.06);$('#hint').style.display='none';
}
function arrive(){here=target;const l=LOCS.find(x=>x.id===here);if(!l)return;
  const first=!visited.has(l.id);visited.add(l.id);save.visited=[...visited];persist();refreshSpots();
  blip(784,.08);
  if(first&&visited.size===LOCS.length) setTimeout(()=>{fanfare();toast('★ Achievement unlocked!<small>Explorer of Paper Land — you visited every place.</small>')},900);
  openDialog(l);
}

/* ---------- dialogue ---------- */
let typing=null, lines=[], li=0, current=null;
function openDialog(l){
  current=l;const g=GUIDES[save.guide];
  $('#who').innerHTML=`${g.name}<small>@ ${l.name}</small>`;spriteCanvas($('#pface'),save.guide);
  $('#dlgExtra').innerHTML='';$('#choices').innerHTML='';
  lines=l.lines.slice();li=0;$('#dlg').classList.add('on');typeLine();
}
function typeLine(){
  const el=$('#say'),txt=lines[li];el.classList.remove('wait');el.textContent='';let i=0;clearInterval(typing);
  typing=setInterval(()=>{el.textContent=txt.slice(0,++i);if(i%2)blip(440+Math.random()*120,.025,'square',.018);
    if(i>=txt.length){clearInterval(typing);typing=null;if(li<lines.length-1)el.classList.add('wait');else finishDialog()}},22);
}
function advance(){
  if(!$('#dlg').classList.contains('on'))return;
  if(typing){clearInterval(typing);typing=null;$('#say').textContent=lines[li];if(li<lines.length-1)$('#say').classList.add('wait');else finishDialog();return}
  if(li<lines.length-1){li++;typeLine()}
}
function finishDialog(){
  const l=current;if(!l||$('#choices').innerHTML)return;
  if(l.items){$('#dlgExtra').innerHTML=`<div class="items-row">${l.items.filter(id=>PRODUCTS[id]).map(item).join('')}</div>`}
  const ch=[];
  if(l.go) ch.push(`<a class="pxbtn green" href="${l.go.href}">${l.go.label} →</a>`);
  if(l.quest) ch.push(`<button class="pxbtn green" id="readQuests">Read the quests</button>`);
  ch.push(`<button class="pxbtn" id="keepExploring">Keep exploring</button>`);
  $('#choices').innerHTML=ch.join('');
  $('#keepExploring').onclick=()=>{closeDialog();blip(392,.06)};
  if(l.quest) $('#readQuests').onclick=openQuests;
}
function item(id){
  const p=PRODUCTS[id],st=STATS[id]||['INSPIRATION +20'];
  return `<div class="itm"><a class="art" href="product.html#${id}">${cover(id)}</a><h4>${titleOf(id)}</h4>
    <ul>${st.map(s=>`<li class="${/−/.test(s)?'dn':'up'}">${/−/.test(s)?'▼':'▲'} ${s}</li>`).join('')}</ul>
    <div class="buy"><b>${money(p.price)}</b><button class="pxbtn" data-add="${id}">+ Bag</button></div></div>`;
}
function closeDialog(){$('#dlg').classList.remove('on');clearInterval(typing);typing=null}
$('#say').onclick=advance;

/* ---------- quests ---------- */
function openQuests(){
  closeDialog();
  const n=visited.size,N=LOCS.length;
  $('#qgrid').innerHTML=`
  <div class="quest"><span class="qtag main">Main quest</span><span class="qtag new">New</span>
    <h3>Fill Your First Page</h3><p>Pick your first Paper Land notebook and write today’s plan on page one.</p>
    <div class="rew">Reward: 10% off your first order (code HELLO10)</div><a class="pxbtn green" href="shop.html">Accept quest</a></div>
  <div class="quest"><span class="qtag live">Live</span>
    <h3>Map the Land</h3><p>Visit all ${N} places in Paper Land with your guide.</p>
    <div class="prog"><i style="width:${n/N*100}%"></i></div>
    <div class="rew">Progress ${n}/${N} · Reward: the Explorer badge</div>
    <button class="pxbtn" id="qExplore">${n>=N?'Completed ★':'Keep exploring'}</button></div>
  <div class="quest"><span class="qtag live">Bounty</span>
    <h3>Show Your Spread</h3><p>Share a photo of your Paper Land journal spread on Instagram and tag us.</p>
    <div class="rew">Reward: a feature on our page</div><a class="pxbtn" href="https://www.instagram.com/">Open Instagram</a></div>
  <div class="quest"><span class="qtag live">Giveaway</span>
    <h3>The Monthly Arvo Draw</h3><p>Join the Paper Club for a chance to win a gift set each month.</p>
    <form class="qform" id="qForm"><input type="email" required placeholder="your@email.com" aria-label="Email"><button class="pxbtn green">Enter</button></form>
    <div class="rew" id="qOk" style="display:none;margin-top:10px">You’re in the draw — good luck, adventurer!</div></div>
  <div class="quest complete"><span class="qtag done">Completed</span>
    <h3>The Grand Opening</h3><p>Paper Land opened its gates. Thanks for being one of the first visitors.</p></div>`;
  $('#questPanel').classList.add('on');blip(659,.08);
  $('#qExplore').onclick=closeQuests;
  $('#qForm').onsubmit=e=>{e.preventDefault();e.target.style.display='none';$('#qOk').style.display='block';coin()};
}
function closeQuests(){$('#questPanel').classList.remove('on')}
$('#questBtn').onclick=openQuests;$('#questClose').onclick=closeQuests;
$('#questPanel').onclick=e=>{if(e.target.id==='questPanel')closeQuests()};

/* ---------- toast ---------- */
let toastT;function toast(html){const t=$('#toast');t.innerHTML=html;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),3800)}

/* ---------- enter world ---------- */
let running=false;
function enterWorld(returning){
  show('world');const g=GUIDES[save.guide];
  spriteCanvas($('#hudFace'),save.guide);$('#hudName').textContent=g.name;refreshSpots();
  if(!running){running=true;requestAnimationFrame(draw)}
  current={name:'Paper Land',lines:[returning?g.back:g.hello,'Click any place on the map — or press 1 to 6 — and I’ll walk you there.']};
  $('#who').innerHTML=`${g.name}<small>@ Paper Land</small>`;spriteCanvas($('#pface'),save.guide);
  $('#dlgExtra').innerHTML='';$('#choices').innerHTML='';lines=current.lines;li=0;$('#dlg').classList.add('on');typeLine();
  current={...current,go:null};
  if(!returning) setTimeout(()=>{blip(880,.08);blip(1175,.12,'square',.05,.08);toast('📜 New quest discovered!<small>“Map the Land” — visit every place in Paper Land.</small>')},1600);
}
$('#hudGuide').onclick=()=>{closeDialog();openSelect()};
$('#soundBtn').onclick=e=>{soundOn=!soundOn;e.currentTarget.textContent=soundOn?'♪ On':'♪ Off';e.currentTarget.setAttribute('aria-pressed',soundOn)};
$('#bagBtn').onclick=()=>{openCart();blip(660,.05)};
document.addEventListener('click',e=>{if(e.target.closest('[data-add]'))coin()});
document.addEventListener('keydown',e=>{
  if(!$('#world').classList.contains('on'))return;
  if(e.key==='Escape'){closeDialog();closeQuests();return}
  if(document.activeElement&&/INPUT|TEXTAREA/.test(document.activeElement.tagName))return;
  const n=parseInt(e.key,10);if(n>=1&&n<=LOCS.length){walkTo(LOCS[n-1].id);return}
  if((e.key==='Enter'||e.key===' ')&&$('#dlg').classList.contains('on')&&!e.target.closest('button,a')){e.preventDefault();advance()}
});
})();
