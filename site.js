(function(){
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'),function(btn){
    var label=btn.querySelector('span')||btn, d=label.textContent, t;
    btn.addEventListener('click',function(){
      function show(x){label.textContent=x;clearTimeout(t);t=setTimeout(function(){label.textContent=d;},1800);}
      var m=btn.getAttribute('data-copy');
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(m).then(function(){show('복사됨');}).catch(function(){show(m);});}else{show(m);}
    });
  });
})();
(function(){
  var cards=Array.prototype.slice.call(document.querySelectorAll('.pc'));
  if(!cards.length||typeof HTMLDialogElement==='undefined')return;
  var PREFIX='#project-', root=document.documentElement;
  var dlg=document.getElementById('sheet'), box=dlg.querySelector('.sh');
  var q=function(s){return dlg.querySelector(s);};
  var idx=-1;
  function slugOf(c){return c.getAttribute('data-slug');}
  function render(i){
    idx=(i+cards.length)%cards.length;
    var c=cards[idx];
    q('.shmeta').textContent=c.getAttribute('data-meta');
    q('.shtitle').textContent=c.getAttribute('data-title');
    q('.shres').textContent=c.getAttribute('data-res');
    q('.shidx').textContent=(idx+1)+' / '+cards.length;
    var im=c.querySelector('.dev img'), si=q('.shmedia img'); si.src=im.getAttribute('src'); si.alt=im.getAttribute('alt')||'';
    var body=q('.shbody'); body.innerHTML='';
    var t=document.getElementById('t-'+slugOf(c)); if(t) body.appendChild(t.content.cloneNode(true));
    var n=cards[(idx+1)%cards.length];
    q('.shnext b').textContent=n.getAttribute('data-title');
    box.scrollTop=0;
  }
  function setHash(push){
    var h=PREFIX+slugOf(cards[idx]);
    try{ if(location.hash===h)return; if(push)history.pushState({pm:1},'',h); else history.replaceState(history.state,'',h);}catch(e){}
  }
  function open(i,push){
    render(i);
    if(!dlg.open){dlg.showModal();root.classList.add('sheet-open');}
    setHash(push);
  }
  function cleanup(){
    if(dlg.open||!root.classList.contains('sheet-open'))return;
    root.classList.remove('sheet-open');
    try{
      if(location.hash.indexOf(PREFIX)===0){
        if(history.state&&history.state.pm)history.back(); else history.replaceState(null,'',location.pathname+location.search);
      }
    }catch(e){}
  }
  function closeSheet(){if(dlg.open)dlg.close();cleanup();}
  function step(d){open(idx+d,false);}
  dlg.addEventListener('close',cleanup);
  dlg.addEventListener('click',function(e){if(e.target===dlg)closeSheet();});
  q('.shclose').addEventListener('click',closeSheet);
  q('.shprev').addEventListener('click',function(){step(-1);});
  q('.shnextbtn').addEventListener('click',function(){step(1);});
  q('.shnext').addEventListener('click',function(){step(1);});
  dlg.addEventListener('keydown',function(e){
    if(e.key==='ArrowLeft'){e.preventDefault();step(-1);} else if(e.key==='ArrowRight'){e.preventDefault();step(1);}
  });
  cards.forEach(function(c,i){
    c.addEventListener('click',function(e){
      if(e.target.closest('.plinks a'))return;
      var a=e.target.closest('a.stretch');
      if(a&&(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0))return;
      e.preventDefault(); open(i,true);
    });
  });
  function fromHash(){
    if(location.hash.indexOf(PREFIX)!==0){if(dlg.open)dlg.close();root.classList.remove('sheet-open');return;}
    var s=location.hash.slice(PREFIX.length);
    for(var i=0;i<cards.length;i++)if(slugOf(cards[i])===s){open(i,false);return;}
  }
  window.addEventListener('popstate',fromHash);
  fromHash();
})();

(function(){
  var dlg=document.getElementById('sheet'); if(!dlg)return;
  var tip=document.createElement('div'); tip.className='tip'; tip.id='termTip'; tip.setAttribute('role','tooltip'); tip.hidden=true;
  dlg.appendChild(tip);
  var cur=null, lastType='mouse';
  function place(t){
    var r=t.getBoundingClientRect(), tw=tip.offsetWidth, th=tip.offsetHeight, m=12;
    var left=Math.min(Math.max(m,r.left),Math.max(m,innerWidth-tw-m));
    var top=r.bottom+8; if(top+th>innerHeight-m)top=Math.max(m,r.top-th-8);
    tip.style.left=left+'px'; tip.style.top=top+'px';
  }
  function show(t){
    if(cur&&cur!==t)cur.removeAttribute('aria-describedby');
    cur=t; tip.textContent='';
    var b=document.createElement('b'); b.textContent=t.textContent;
    var s=document.createElement('span'); s.textContent=t.getAttribute('data-tip');
    tip.appendChild(b); tip.appendChild(s); tip.hidden=false;
    t.setAttribute('aria-describedby','termTip'); place(t);
  }
  function hide(){ if(cur){cur.removeAttribute('aria-describedby');cur=null;} tip.hidden=true; }
  function termOf(e){ return e.target.closest?e.target.closest('.term'):null; }
  dlg.addEventListener('pointerdown',function(e){lastType=e.pointerType||'mouse';},true);
  dlg.addEventListener('pointerover',function(e){ if(e.pointerType==='touch')return; var t=termOf(e); if(t&&t!==cur)show(t); });
  dlg.addEventListener('pointerout',function(e){ if(e.pointerType==='touch')return; var t=termOf(e); if(t&&!(e.relatedTarget&&t.contains(e.relatedTarget)))hide(); });
  dlg.addEventListener('focusin',function(e){ var t=termOf(e); if(t)show(t); });
  dlg.addEventListener('focusout',function(e){ if(termOf(e))hide(); });
  dlg.addEventListener('click',function(e){
    var t=termOf(e);
    if(!t){hide();return;}
    if(lastType==='mouse'){show(t);return;}
    if(cur===t)hide(); else show(t);
  });
  dlg.addEventListener('scroll',hide,true);
  dlg.addEventListener('keydown',hide);
  dlg.addEventListener('close',hide);
  window.addEventListener('resize',hide);
})();
