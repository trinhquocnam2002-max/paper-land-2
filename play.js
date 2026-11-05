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
const PLAZA={x:160,y:102};
const LOCS = [
  {id:'shop',key:1,name:'Ben Thanh Market',x:160,y:92,
    lines:['Welcome to Ben Thanh Market — every notebook in Paper Land is sold under this famous clock tower.','Pick the word that sounds most like your day. That’s your notebook.'],
    items:['iced-coffee','arvo','someday'],go:{label:'Browse every notebook',href:'shop.html'}},
  {id:'saigon',key:2,name:'Post Office Café',x:78,y:64,
    lines:['The old Saigon Post Office! Locals sip iced coffee on tiny plastic stools right out front.','This is home to the Saigon Mornings notebooks: iced coffee, alleyway and street food.'],
    items:['iced-coffee','alleyway','street-food'],go:{label:'See the Saigon collection',href:'collections.html#saigon'}},
  {id:'adelaide',key:3,name:'Hoi An Old Town',x:246,y:58,
    lines:['Hoi An at golden hour — yellow walls, red lanterns and nowhere you need to be.','Perfect for a slow arvo. Grab a cuppa; the to-do list can wait until tomorrow.'],
    items:['arvo','brekkie','cuppa'],go:{label:'See the Arvo collection',href:'collections.html#adelaide'}},
  {id:'someday',key:4,name:'Bitexco Tower',x:252,y:150,
    lines:['Bitexco Tower — from the helipad you can see every plan you’ve ever made.','Our planners are undated, so you can start in any month. Even this one.'],
    items:['someday','pocket-notes','arvo-set'],go:{label:'See Someday Studio',href:'collections.html#studio'}},
  {id:'crabit',key:5,name:'Crabit Coffee Port',x:62,y:150,
    lines:['Junk boats sail in from Ha Long Bay, carrying Crabit’s Coffee Series.','Crabit is our guest brand from Vietnam — every notebook is named after a coffee bean or café drink.'],
    items:['crabit-liberica','crabit-americano','crabit-latte'],go:{label:'See the Crabit collection',href:'collections.html#crabit'}},
  {id:'quest',key:6,name:'Pagoda Quest Board',x:150,y:150,
    lines:['The Quest Board, right next to the One Pillar Pagoda. Finish a quest, earn a reward.'],quest:true},
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
  const t=$('#title');
  for(let i=0;i<7;i++){const c=document.createElement('div');c.className='cloud';
    c.style.top=(4+Math.random()*40)+'%';c.style.transform=`scale(${1+Math.random()*1.5})`;
    c.style.animationDuration=(28+Math.random()*30)+'s';c.style.animationDelay=(-Math.random()*50)+'s';t.appendChild(c)}
  const msgs=['Sharpening pencils…','Brewing iced coffee…','Unfolding the map…','Waking up the possum…','Ready!'];
  let p=0;const iv=setInterval(()=>{p+=1;$('#lfill').style.width=(p*20)+'%';$('#lmsg').textContent=msgs[Math.min(p,msgs.length-1)];
    if(p>=5){clearInterval(iv);setTimeout(()=>{$('#loader').style.display='none';$('#startBtn').classList.add('on');$('#startBtn').focus()},300)}},380);
  $('#startBtn').onclick=start;
  document.addEventListener('keydown',e=>{if($('#title').classList.contains('on')&&$('#startBtn').classList.contains('on')&&(e.key==='Enter'||e.key===' ')){e.preventDefault();start()}});
})();
function start(){
  try{AC=AC||new (window.AudioContext||window.webkitAudioContext)()}catch(e){}
  jingle();
  if(save.guide&&GUIDES[save.guide]) enterWorld(true); else openSelect();
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

/* ---------- world map rendering ---------- */
const cv=$('#map'), ctx=cv.getContext('2d'), W=320, H=200;
const base=document.createElement('canvas');base.width=W;base.height=H;const b=base.getContext('2d');
const R=(x,y,w,h,c,g=b)=>{g.fillStyle=c;g.fillRect(x|0,y|0,w|0,h|0)};
const hash=(x,y)=>(((x*73856093)^(y*19349663))>>>0)%997;
const landF=(x,y)=>((x-160)/146)**2+((y-102)/88)**2-.06*Math.sin(x*.07+1)-.05*Math.cos(y*.11);
const pathMask=new Uint8Array(W*H);
function line(x0,y0,x1,y1,r){const n=Math.ceil(Math.hypot(x1-x0,y1-y0));for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n,y=y0+(y1-y0)*i/n;
  for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(dx*dx+dy*dy<=r*r+1){const X=Math.round(x+dx),Y=Math.round(y+dy);if(X>=0&&Y>=0&&X<W&&Y<H)pathMask[Y*W+X]=1}}}}
LOCS.forEach(l=>line(PLAZA.x,PLAZA.y,l.x,l.y+5,2));
line(PLAZA.x,PLAZA.y,PLAZA.x,PLAZA.y,9);

function house(cx,by,w,h,wall,roof,door='#6b4329'){
  const L=Math.round(cx-w/2),T=by-h;
  R(L-1,T,w+2,h+1,INK);R(L,T,w,h,wall);
  const rh=Math.min(Math.ceil((w+4)/2),9);
  for(let i=0;i<rh;i++){const ww=w+6-2*i;if(ww<=0)break;R(L-3+i,T-1-i,ww,1,i===0?INK:roof)}
  R(L-3+rh,T-1-rh,Math.max(w+6-2*rh,2),1,INK);
  R(cx-2,by-6,4,6,door);R(cx-2,by-7,4,1,INK);
  R(L+2,T+3,4,3,'#ffe28a');R(L+w-6,T+3,4,3,'#ffe28a');
  return {L,T};
}
function tree(x,y,c1='#3f7d3a',c2='#57a046'){R(x+2,y+5,2,4,'#6b4329');R(x,y+1,6,5,INK);R(x+1,y,4,7,INK);R(x+1,y+1,4,5,c1);R(x+1,y+1,2,2,c2)}
function renderBase(){
  const img=b.createImageData(W,H),d=img.data;
  const set=(i,c)=>{d[i]=parseInt(c.slice(1,3),16);d[i+1]=parseInt(c.slice(3,5),16);d[i+2]=parseInt(c.slice(5,7),16);d[i+3]=255};
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    const f=landF(x,y),i=(y*W+x)*4,h=hash(x,y);
    let c;
    if(f>=1){c=f<1.1?((x+y)%4===0?'#7cc2e6':'#5aaedb'):(h<12?'#4a9ccc':'#3f8fc0')}
    else if(f>.88){c=h<180?'#f0d79a':'#e8cb86'}
    else if(pathMask[y*W+x]){c=h<220?'#e3c58c':'#d6b478'}
    else{c=h<160?'#86c06a':(h<330?'#7ab55c':'#80ba62')}
    set(i,c);
  }
  b.putImageData(img,0,0);
  // flowers
  for(let i=0;i<160;i++){const x=(i*97)%W,y=(i*53+i*i)%H;if(landF(x,y)<.8&&!pathMask[y*W+x])R(x,y,1,1,['#f6a7c1','#fff7e6','#ffd25e'][i%3])}
  // trees
  const near=(x,y)=>LOCS.some(l=>Math.abs(l.x-x)<26&&Math.abs(l.y-8-y)<26)||Math.abs(PLAZA.x-x)<28&&Math.abs(PLAZA.y-12-y)<26||(x>102&&x<136&&y>118&&y<162)||(Math.abs(LOCS[3].x-x)<14&&y>LOCS[3].y-66&&y<LOCS[3].y+4);
  for(let i=0;i<220;i++){const x=(i*131+17)%W,y=(i*71+i*7)%H;
    if(landF(x+3,y+8)<.78&&!near(x+3,y+4)){let ok=true;for(let dy=0;dy<10&&ok;dy++)for(let dx=-1;dx<8;dx++)if(pathMask[Math.min(H-1,y+dy)*W+Math.max(0,x+dx)])ok=false;if(ok)tree(x,y)}}
  // --- Saigon Central Post Office (café) ---
  const s=LOCS[1],sl=s.x-18,st=s.y-16;
  R(sl-1,st-1,38,17,INK);R(sl,st,36,16,'#f2c14e');R(sl,st,36,2,'#d9a233');R(sl,s.y-2,36,2,'#c98f2a');
  for(let dy=0;dy<8;dy++){const ww=Math.round(Math.sqrt(64-(8-dy)*(8-dy))*1.4);R(s.x-ww-1,st-9+dy,ww*2+2,1,INK);R(s.x-ww,st-9+dy,ww*2,1,dy<2?'#e9b33f':'#f2c14e')}
  R(s.x-3,st-6,6,6,INK);R(s.x-2,st-5,4,4,'#fff7e6');R(s.x,st-4,1,2,INK);R(s.x,st-3,2,1,INK);
  for(let i=0;i<5;i++){const wx=sl+3+i*7;if(i===2)continue;R(wx,st+4,4,9,'#4f7a55');R(wx+1,st+3,2,1,'#4f7a55');R(wx+1,st+5,2,7,'#3e6545')}
  R(s.x-3,st+5,6,11,'#5a3a22');R(s.x-2,st+4,4,1,'#5a3a22');
  R(sl+1,st+2,34,1,'#fff1d6');
  R(s.x-24,s.y-3,3,3,'#d94f3f');R(s.x+21,s.y-3,3,3,'#3f8fd9');R(s.x-20,s.y-4,5,2,'#8a5a3b');R(s.x+16,s.y-4,5,2,'#8a5a3b');R(s.x-19,s.y-6,2,2,'#fff7e6');
  // --- Hoi An Old Town (two yellow shophouses + lanterns) ---
  const a=LOCS[2];
  const shop=(cx,w,wall,roof)=>{const L=cx-w/2|0,T=a.y-12;R(L-1,T-1,w+2,13,INK);R(L,T,w,12,wall);R(L,T+11,w,1,'#c9962e');
    for(let i=0;i<4;i++)R(L-3+i,T-1-i,w+6-2*i,1,i===0?INK:roof);R(L-3,T-1,1,1,roof);R(L+w+2,T-1,1,1,roof);R(L-4,T-2,2,1,INK);R(L+w+2,T-2,2,1,INK);
    R(cx-3,a.y-8,6,8,'#6b3a22');R(cx-3,a.y-8,1,8,'#8a4a2b');R(L+2,T+3,3,3,'#4f7a55');R(L+w-5,T+3,3,3,'#4f7a55')};
  shop(a.x-10,22,'#f1c84b','#8a4a2b');shop(a.x+13,20,'#f4d067','#7a3f24');
  R(a.x-30,a.y-4,4,4,'#d94f8f');R(a.x-31,a.y-6,3,3,'#e877a8');R(a.x+24,a.y-3,4,3,'#d94f8f');
  // --- Bitexco Tower (Someday Tower) ---
  const t=LOCS[3];
  for(let i=0;i<54;i++){const w=Math.max(2,Math.round(5+4*Math.sin(Math.PI*Math.min(1,(i+6)/54))-(i>46?(i-46):0)));
    const y=t.y-i;R(t.x-w-1,y,w*2+2,1,INK);R(t.x-w,y,w*2,1,i%4===0?'#7fa8c4':'#a7cbdd');R(t.x-w,y,2,1,'#cfe3ee')}
  R(t.x,t.y-62,1,8,INK);
  const hy=t.y-36;R(t.x+3,hy-2,15,5,INK);R(t.x+4,hy-1,13,3,'#3a3f47');R(t.x+9,hy-1,1,3,'#ffd25e');R(t.x+11,hy-1,1,3,'#ffd25e');R(t.x+10,hy,1,1,'#ffd25e');
  R(t.x-12,t.y-4,24,4,INK);R(t.x-11,t.y-3,22,3,'#c9c4bb');
  // --- Ha Long Bay port (Crabit) ---
  const p=LOCS[4];R(p.x-34,p.y+1,30,5,INK);R(p.x-33,p.y+2,28,3,'#8a5a3b');for(let i=0;i<28;i+=4)R(p.x-33+i,p.y+2,1,3,'#6b4329');
  R(p.x-34,p.y+6,2,4,'#6b4329');R(p.x-8,p.y+6,2,4,'#6b4329');
  house(p.x+4,p.y,18,11,'#e7dccd','#3f6fa8');
  R(p.x+16,p.y-7,7,7,INK);R(p.x+17,p.y-6,5,5,'#c9a37a');R(p.x+17,p.y-4,5,1,'#a07a52');
  R(p.x-6,p.y-6,6,6,INK);R(p.x-5,p.y-5,4,4,'#b07a4f');
  const karst=(x,y,w,h)=>{for(let i=0;i<w;i++){const c=Math.abs(i-w/2)/(w/2);const hh=Math.round(h*(1-Math.pow(c,2.2)*.55)-(i%3===0?1:0));
      R(x+i,y-hh-1,1,1,INK);R(x+i,y-hh,1,hh,i<w*.35?'#8d8a82':'#a29e95');R(x+i,y-hh,1,Math.min(4,hh),i%2?'#6f8a6a':'#5f7a5a')}
    R(x-1,y,w+2,1,'#cfeaf7')};
  [[4,128,9,20],[16,124,7,14],[30,196,10,18],[44,192,7,12],[2,172,6,13]].forEach(([x,y,w,h])=>{if(landF(x+w/2,y)>=1.05)karst(x,y,w,h)});
  // --- One Pillar Pagoda + quest board ---
  const q=LOCS[5];R(q.x-10,q.y-12,2,12,'#6b4329');R(q.x+8,q.y-12,2,12,'#6b4329');
  R(q.x-13,q.y-22,26,13,INK);R(q.x-12,q.y-21,24,11,'#b07a4f');
  R(q.x-10,q.y-19,5,6,'#fff7e6');R(q.x-3,q.y-20,6,7,'#f6a7c1');R(q.x+5,q.y-19,5,6,'#cde3f5');R(q.x-6,q.y-12,4,2,'#fff7e6');
  const px0=q.x-32,py0=q.y+2;
  R(px0-12,py0-6,25,9,INK);R(px0-11,py0-5,23,7,'#5aaedb');R(px0-11,py0-5,23,1,'#7cc2e6');
  [[-8,-3],[6,-2],[-4,0],[8,0]].forEach(([dx,dy])=>{R(px0+dx,py0+dy,3,2,'#4a8a3f');});R(px0-7,py0-4,2,2,'#f6a7c1');R(px0+9,py0-1,2,1,'#f6a7c1');
  R(px0-1,py0-14,3,12,INK);R(px0,py0-14,1,11,'#8a5a3b');
  R(px0-6,py0-21,13,8,INK);R(px0-5,py0-20,11,6,'#7a3f2a');R(px0-3,py0-18,7,4,'#5a2a1a');
  for(let i=0;i<4;i++)R(px0-9+i,py0-23-i,19-2*i,1,i===0?INK:'#9a3b2b');R(px0-10,py0-24,2,1,INK);R(px0+9,py0-24,2,1,INK);R(px0,py0-28,1,2,'#d9a233');
  // --- Ben Thanh Market (General Store) ---
  const g=LOCS[0],gl=g.x-24,gt=g.y-12;
  R(gl-1,gt-1,50,13,INK);R(gl,gt,48,12,'#f3e3bd');R(gl,gt,48,3,'#9a4a2b');R(gl,gt+3,48,1,INK);
  for(let i=0;i<8;i++){const wx=gl+2+i*6;if(i===3||i===4)continue;R(wx,gt+6,3,4,'#7a4a2b');R(wx+1,gt+5,1,1,'#7a4a2b')}
  R(g.x-8,gt-21,16,33,INK);R(g.x-7,gt-20,14,32,'#f6e8c6');R(g.x-7,gt-20,2,32,'#e3cf9f');R(g.x+5,gt-20,2,32,'#e3cf9f');
  for(let i=0;i<4;i++)R(g.x-8+i,gt-22-i,16-2*i,1,i===0?INK:'#e3cf9f');R(g.x-5,gt-26,10,1,INK);
  R(g.x-4,gt-17,8,8,INK);R(g.x-3,gt-16,6,6,'#fff7e6');R(g.x,gt-15,1,3,INK);R(g.x,gt-13,2,1,INK);
  R(g.x-3,g.y-9,6,9,'#5a3a22');R(g.x-2,g.y-10,4,1,'#5a3a22');
  R(g.x,gt-34,1,8,INK);R(g.x+1,gt-34,7,5,'#d9343a');R(g.x+4,gt-32,1,1,'#ffd25e');
  [[gl-8,'#d94f3f'],[gl+50,'#3f8fd9']].forEach(([ux,c])=>{R(ux,g.y-9,8,1,INK);R(ux+1,g.y-10,6,1,c);R(ux,g.y-8,8,1,c);R(ux+3,g.y-8,1,8,'#6b4329')});
}
renderBase();

const sparkles=[];for(let i=0;i<70;i++){const x=(i*113)%W,y=(i*67+i*3)%H;if(landF(x,y)>1.15)sparkles.push([x,y])}
let player={x:PLAZA.x,y:PLAZA.y,flip:false}, route=[], here='shop', target=null, last=0, stepT=0, frame=0;
function draw(ts){
  const dt=Math.min(.05,(ts-last)/1000||0);last=ts;
  // move
  if(route.length){const pt=route[0],dx=pt.x-player.x,dy=pt.y-player.y,dist=Math.hypot(dx,dy),sp=78*dt;
    if(Math.abs(dx)>.5)player.flip=dx<0;
    if(dist<=sp){player.x=pt.x;player.y=pt.y;route.shift();if(!route.length)arrive()}
    else{player.x+=dx/dist*sp;player.y+=dy/dist*sp}
    stepT+=dt;if(stepT>.18){stepT=0;frame^=1;blip(frame?220:180,.03,'square',.02)}}
  ctx.drawImage(base,0,0);
  const tt=ts/1000;
  sparkles.forEach(([x,y],i)=>{if(((tt*2+i)|0)%3===0)R(x,y,3,1,'#cfeaf7',ctx)});
  // boat
  const bob=Math.round(Math.sin(tt*2)*1),bx=12,by=176+bob;
  R(bx,by,26,5,INK,ctx);R(bx+1,by+1,24,3,'#6b4329',ctx);R(bx-2,by-2,4,3,INK,ctx);R(bx+24,by-3,5,4,INK,ctx);R(bx-1,by-1,2,2,'#6b4329',ctx);R(bx+25,by-2,3,2,'#6b4329',ctx);
  [[5,12],[13,16],[20,11]].forEach(([mx,mh])=>{R(bx+mx,by-mh-1,1,mh+1,INK,ctx);for(let i=0;i<mh-2;i++){const w=Math.round(2+i*.45);R(bx+mx+1,by-mh+i,w,1,i%3===0?'#a8341f':'#c8462f',ctx)}});
  // quest "!"
  const q=LOCS[5],qb=Math.round(Math.abs(Math.sin(tt*3))*3);R(q.x-1,q.y-34-qb,3,6,'#ffd25e',ctx);R(q.x-1,q.y-27-qb,3,2,'#ffd25e',ctx);
  // café steam
  const s=LOCS[1];for(let i=0;i<3;i++){const yy=s.y-8-((tt*8+i*5)%10);R(s.x-19+((i+(tt|0))%2),yy,1,1,'#ffffff',ctx)}
  // Hoi An lanterns (gently glowing)
  {const a=LOCS[2];R(a.x-22,a.y-16,46,1,'#5a3a22',ctx);[-18,-8,2,12,20].forEach((dx,i)=>{const on=((tt*2+i)|0)%2;R(a.x+dx,a.y-15,3,4,INK,ctx);R(a.x+dx,a.y-14,3,2,on?'#ff5a4a':'#d9343a',ctx);R(a.x+dx+1,a.y-11,1,2,'#ffd25e',ctx)})}
  // player + shadow
  R(Math.round(player.x)-4,Math.round(player.y),9,2,'#00000033',ctx);
  drawSprite(ctx,save.guide||'bean',Math.round(player.x)-6,Math.round(player.y)-14-(route.length&&frame?1:0),player.flip);
  requestAnimationFrame(draw);
}

/* ---------- hotspots ---------- */
const mapbox=$('#mapbox');
LOCS.forEach(l=>{const btn=document.createElement('button');btn.className='spot';btn.dataset.id=l.id;
  btn.style.left=(l.x/W*100)+'%';btn.style.top=((l.y+2)/H*100)+'%';btn.setAttribute('aria-label',`Walk to ${l.name}`);
  btn.innerHTML=`<span><b class="key">${l.key}</b>${l.name}</span>`;btn.onclick=()=>walkTo(l.id);mapbox.appendChild(btn)});
function refreshSpots(){document.querySelectorAll('.spot').forEach(s=>s.classList.toggle('done',visited.has(s.dataset.id)));
  $('#hudPlaces').textContent=`Places ${visited.size}/${LOCS.length}`;$('#hudBadge').classList.toggle('on',visited.size>=LOCS.length)}
function walkTo(id){
  closeDialog();
  const l=LOCS.find(x=>x.id===id);if(!l)return;
  target=id;
  if(here===id&&!route.length){arrive();return}
  const dest={x:l.x,y:l.y+6};
  route=(here==='shop'||id==='shop'||here===null)?[PLAZA,dest]:[PLAZA,dest];
  if(here==='shop'&&id==='shop') route=[dest];
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
