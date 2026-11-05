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
  {id:'shop',key:1,name:'General Store',x:160,y:92,
    lines:['This is the General Store — every notebook in Paper Land is stocked here.','Pick the word that sounds most like your day. That’s your notebook.'],
    items:['iced-coffee','arvo','someday'],go:{label:'Browse every notebook',href:'shop.html'}},
  {id:'saigon',key:2,name:'Saigon Mornings Café',x:78,y:64,
    lines:['Smell that? Iced coffee, motorbikes and big plans made on tiny plastic stools.','The locals write their day down here before the sun gets too hot.'],
    items:['iced-coffee','alleyway','street-food'],go:{label:'See the Saigon collection',href:'collections.html#saigon'}},
  {id:'adelaide',key:3,name:'Arvo Hills',x:246,y:58,
    lines:['Welcome to the Hills. Out here the afternoon lasts as long as you need it to.','Grab a cuppa. The to-do list can wait until tomorrow.'],
    items:['arvo','brekkie','cuppa'],go:{label:'See the Arvo collection',href:'collections.html#adelaide'}},
  {id:'someday',key:4,name:'Someday Tower',x:252,y:150,
    lines:['Someday Tower — where plans finally go to happen.','Our planners are undated, so you can start in any month. Even this one.'],
    items:['someday','pocket-notes','arvo-set'],go:{label:'See Someday Studio',href:'collections.html#studio'}},
  {id:'crabit',key:5,name:'Crabit Coffee Port',x:62,y:150,
    lines:['Ships from Vietnam dock here, carrying Crabit’s Coffee Series.','Crabit is our guest brand — every notebook is named after a coffee bean or café drink.'],
    items:['crabit-liberica','crabit-americano','crabit-latte'],go:{label:'See the Crabit collection',href:'collections.html#crabit'}},
  {id:'quest',key:6,name:'Quest Board',x:150,y:150,
    lines:['The Quest Board! Finish a quest, earn a reward.'],quest:true},
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
  const near=(x,y)=>LOCS.some(l=>Math.abs(l.x-x)<24&&Math.abs(l.y-y)<20)||Math.abs(PLAZA.x-x)<26&&Math.abs(PLAZA.y-12-y)<24;
  for(let i=0;i<220;i++){const x=(i*131+17)%W,y=(i*71+i*7)%H;
    if(landF(x+3,y+8)<.78&&!near(x+3,y+4)){let ok=true;for(let dy=0;dy<10&&ok;dy++)for(let dx=-1;dx<8;dx++)if(pathMask[Math.min(H-1,y+dy)*W+Math.max(0,x+dx)])ok=false;if(ok)tree(x,y)}}
  // --- Saigon café ---
  const s=LOCS[1];const {L:sl,T:st}=house(s.x,s.y,28,15,'#fff1d6','#d9825b');
  for(let i=0;i<28;i+=2){R(sl+i,st,2,3,(i/2)%2?'#fff7e6':'#d94f3f')}R(sl-1,st+3,30,1,INK);
  R(s.x-16,s.y-3,3,3,'#d94f3f');R(s.x+13,s.y-3,3,3,'#3f8fd9');R(s.x-12,s.y-4,5,2,'#8a5a3b');R(s.x+9,s.y-4,5,2,'#8a5a3b');
  R(s.x+8,st-12,3,6,'#7a4a2b');
  // --- Arvo Hills ---
  const a=LOCS[2];
  for(let x=-34;x<=34;x++){const hh=Math.round(14*Math.sqrt(Math.max(0,1-(x/34)**2)));R(a.x-10+x,a.y-hh,1,hh,x%5?'#5f9a48':'#5a9343')}
  house(a.x+4,a.y,18,12,'#f4efe6','#5e7f4e');
  R(a.x-20,a.y-14,2,14,'#ece6dc');R(a.x-26,a.y-22,14,8,INK);R(a.x-25,a.y-21,12,6,'#8fa36f');R(a.x-23,a.y-24,8,3,'#8fa36f');
  // --- Someday Tower ---
  const t=LOCS[3];R(t.x-9,t.y-33,18,33,INK);R(t.x-8,t.y-32,16,32,'#9dadc9');R(t.x-8,t.y-32,4,32,'#8c9cbb');
  for(let i=0;i<5;i++)R(t.x-9+i*4,t.y-36,2,4,INK),R(t.x-8+i*4,t.y-35,1,3,'#9dadc9');
  R(t.x-3,t.y-27,6,5,'#ffe28a');R(t.x-3,t.y-17,6,5,'#ffe28a');R(t.x-2,t.y-7,4,7,'#6b4329');
  R(t.x,t.y-46,1,10,INK);R(t.x+1,t.y-46,7,4,'#f6a7c1');
  // --- Crabit port ---
  const p=LOCS[4];R(p.x-34,p.y+1,30,5,INK);R(p.x-33,p.y+2,28,3,'#8a5a3b');for(let i=0;i<28;i+=4)R(p.x-33+i,p.y+2,1,3,'#6b4329');
  R(p.x-34,p.y+6,2,4,'#6b4329');R(p.x-8,p.y+6,2,4,'#6b4329');
  house(p.x+4,p.y,18,11,'#e7dccd','#7a4a2b');
  R(p.x+16,p.y-7,7,7,INK);R(p.x+17,p.y-6,5,5,'#c9a37a');R(p.x+17,p.y-4,5,1,'#a07a52');
  R(p.x-6,p.y-6,6,6,INK);R(p.x-5,p.y-5,4,4,'#b07a4f');
  // --- Quest board ---
  const q=LOCS[5];R(q.x-10,q.y-12,2,12,'#6b4329');R(q.x+8,q.y-12,2,12,'#6b4329');
  R(q.x-13,q.y-22,26,13,INK);R(q.x-12,q.y-21,24,11,'#b07a4f');
  R(q.x-10,q.y-19,5,6,'#fff7e6');R(q.x-3,q.y-20,6,7,'#f6a7c1');R(q.x+5,q.y-19,5,6,'#cde3f5');R(q.x-6,q.y-12,4,2,'#fff7e6');
  // --- General store ---
  const g=LOCS[0];const {L:gl,T:gt}=house(g.x,g.y,36,18,'#fbe3c8','#7E9172');
  for(let i=0;i<36;i+=3)R(gl+i,gt,3,3,(i/3)%2?'#fff7e6':'#7E9172');R(gl-1,gt+3,38,1,INK);
  R(g.x-8,gt-17,16,6,INK);R(g.x-7,gt-16,14,4,'#fff7e6');R(g.x-5,gt-15,2,2,'#d9825b');R(g.x-2,gt-15,2,2,'#7E9172');R(g.x+1,gt-15,2,2,'#9dadc9');R(g.x+4,gt-15,1,2,INK);
  [['#2B2927',gl+4],['#D49B7B',gl+6],['#A9B49C',gl+8],['#9DADC9',gl+28],['#E7DED2',gl+30]].forEach(([c,x])=>R(x,gt+5,2,4,c));
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
  R(bx,by,24,5,INK,ctx);R(bx+1,by+1,22,3,'#6b4329',ctx);R(bx+3,by-1,18,1,INK,ctx);
  R(bx+11,by-16,1,15,INK,ctx);for(let i=0;i<12;i++)R(bx+12,by-15+i,Math.ceil(i*.7)+1,1,'#fff7e6',ctx);
  // quest "!"
  const q=LOCS[5],qb=Math.round(Math.abs(Math.sin(tt*3))*3);R(q.x-1,q.y-34-qb,3,6,'#ffd25e',ctx);R(q.x-1,q.y-27-qb,3,2,'#ffd25e',ctx);
  // café steam
  const s=LOCS[1];for(let i=0;i<3;i++){const yy=s.y-30-((tt*8+i*5)%14);R(s.x+9+((i+(tt|0))%2),yy,1,1,'#ffffff',ctx)}
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
