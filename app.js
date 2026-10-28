(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const { projects, sections } = window.PORTFOLIO;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  try { paused = paused || sessionStorage.getItem('ay-motion-paused') === 'true'; } catch {}
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const order = ['service','ams','amaza','face','solar','gforce','finbot','alpine','bogo','scraper'];
  const ordered = order.map(id => projects.find(p => p.id === id));
  const grid = $('#projects');
  ordered.forEach((p, i) => {
    const mobileImage = p.images.find(image => image.device === 'mobile');
    const article = document.createElement('article');
    article.className = `project reveal ${p.color}${mobileImage ? ' has-mobile' : ''}`;
    article.id = p.id;
    article.dataset.category = p.category;
    article.innerHTML = `<button class="project-button" data-project="${p.id}" aria-label="Explore ${escape(p.name)}"><div class="project-stage"><span class="project-number">PROJECT / ${String(i+1).padStart(2,'0')}</span><div class="project-screen"><div class="mini-bar"><i></i><i></i><i></i><span>${escape(p.name)}</span></div><img loading="lazy" decoding="async" src="${p.images[0].src}" width="1600" height="800" alt="${escape(p.images[0].caption)}${p.images[0].note ? ' — '+escape(p.images[0].note) : ''}"></div><span class="project-type">${escape(p.headline)}</span><span class="project-open" aria-hidden="true">↗</span></div><div class="project-info"><div><h3>${escape(p.name)}</h3><p>${escape(p.summary)}</p></div><span class="project-category">${escape(p.category)}</span></div></button>`;
    if (mobileImage) {
      const phone = document.createElement('span');
      phone.className = 'project-phone phone-crop';
      phone.innerHTML = `<img src="${mobileImage.src}" loading="lazy" decoding="async" alt="${escape(mobileImage.caption)} — demo data">`;
      $('.project-stage',article).append(phone);
      const badge = document.createElement('span');
      badge.className = 'mobile-indicator';
      badge.textContent = '▯ Desktop + mobile';
      $('.project-info>div',article).append(badge);
    }
    grid.append(article);
  });
  function setFilter(category) {
    $$('.filters button').forEach(b => {
      const selected = b.dataset.filter === category;
      b.classList.toggle('active', selected);
      b.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    $$('.project').forEach(p => {
      p.hidden = category !== 'All' && p.dataset.category !== category;
      if (!p.hidden) { count++; p.classList.add('visible'); }
    });
    $('#filter-result').textContent = `${count} ${category === 'All' ? 'selected projects' : category.toLowerCase() + ' projects'}`;
  }
  $$('.filters button').forEach(b => b.addEventListener('click', () => setFilter(b.dataset.filter)));
  $$('[data-category-link]').forEach(a => a.addEventListener('click', () => setFilter(a.dataset.categoryLink)));

  sections.more.forEach((html, i) => {
    const template = document.createElement('template');
    template.innerHTML = html;
    const heading = $('h4',template.content);
    const title = heading.textContent;
    heading.remove();
    const details = document.createElement('details');
    details.className = 'archive-item';
    details.innerHTML = `<summary><span>${String(i+1).padStart(2,'0')}</span>${escape(title)}<b aria-hidden="true">+</b></summary>`;
    details.append(template.content);
    $('#archive-list').append(details);
  });
  sections.depth.forEach(html => {
    const template = document.createElement('template');
    template.innerHTML = html;
    const heading = $('h4',template.content);
    const title = heading.textContent;
    heading.remove();
    $('.mono',template.content)?.remove();
    const details = document.createElement('details');
    details.innerHTML = `<summary>${escape(title)}</summary>`;
    details.append(template.content);
    $('#engineering-stories').append(details);
  });
  sections.beyond.forEach(html => {
    const content = document.createElement('div');
    content.innerHTML = html;
    $('#beyond-content').append(content);
  });
  sections.ai.forEach(html => {
    const content = document.createElement('div');
    content.innerHTML = html;
    $('#ai-workflows').append(content);
  });

  const dialog = $('#project-dialog');
  let activeProject = null;
  let imageIndex = 0;
  let activeImages = [];
  let opener = null;
  function showImage(index) {
    imageIndex = (index + activeImages.length) % activeImages.length;
    const item = activeImages[imageIndex];
    $('#dialog-image').src = item.src;
    $('#dialog-image').alt = item.caption;
    $('#full-image').href = item.src;
    $('#image-caption').textContent = `${imageIndex + 1} / ${activeImages.length} — ${item.caption}`;
    $('#image-note').textContent = item.note;
    $$('#gallery-thumbs button').forEach((b,i) => b.setAttribute('aria-pressed',String(i===imageIndex)));
    $('#previous-image').disabled = $('#next-image').disabled = activeImages.length < 2;
  }
  function renderGallery(device = 'desktop') {
    activeImages = activeProject.images.filter(image => (image.device || 'desktop') === device);
    $('#project-dialog').dataset.device = device;
    $$('.device-switcher button[data-device]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.device === device)));
    $('#gallery-thumbs').replaceChildren();
    activeImages.forEach((item,i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Show screenshot: ${item.caption}`);
      b.innerHTML = `<img src="${item.src}" alt="" width="160" height="80">`;
      b.addEventListener('click', () => showImage(i));
      $('#gallery-thumbs').append(b);
    });
    $('#device-description').textContent = device === 'mobile'
      ? activeProject.mobileDescription || 'The mobile experience, shown with sample data.'
      : 'Explore the desktop interface and its key screens.';
    showImage(0);
  }
  $$('.device-switcher button[data-device]').forEach(button => button.addEventListener('click',() => renderGallery(button.dataset.device)));
  function openProject(id, trigger, device = 'desktop') {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    activeProject = project;
    opener = trigger || document.activeElement;
    $('#dialog-title').textContent = project.name;
    $('#dialog-category').textContent = `${project.category} / ${project.status}`;
    $('#dialog-index').textContent = String(order.indexOf(id)+1).padStart(2,'0');
    $('#dialog-role').textContent = project.role;
    $('#dialog-story').innerHTML = project.story.map(p=>`<p>${p}</p>`).join('');
    $('#dialog-facts').innerHTML = project.facts.map(f=>`<div><b>${escape(f.value)}</b><span>${escape(f.label)}</span></div>`).join('');
    $('#dialog-tags').innerHTML = project.tags.map(t=>`<span class="tag">${escape(t)}</span>`).join('');
    const hasMobile = project.images.some(image => image.device === 'mobile');
    $('#device-switcher').hidden = !hasMobile;
    renderGallery(hasMobile ? device : 'desktop');
    document.body.classList.add('modal-open');
    dialog.showModal();
    dialog.scrollTop = 0;
    $('.close-dialog').focus({preventScroll:true});
  }
  document.addEventListener('click', e => {
    const button = e.target.closest('[data-project]');
    if (button) openProject(button.dataset.project,button,button.dataset.view || 'desktop');
  });
  $('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if(e.target===dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus({preventScroll:true}); });
  dialog.addEventListener('keydown', e => {
    if (e.key==='ArrowRight') { e.preventDefault(); showImage(imageIndex+1); }
    if (e.key==='ArrowLeft') { e.preventDefault(); showImage(imageIndex-1); }
  });
  $('#previous-image').addEventListener('click', () => showImage(imageIndex-1));
  $('#next-image').addEventListener('click', () => showImage(imageIndex+1));

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    document.documentElement.classList.add('js-reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), {threshold: .05});
    $$('.reveal').forEach(el => observer.observe(el));
  }
  function updateTime() {
    $('#local-time').textContent = new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Karachi',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());
  }
  updateTime();
  setInterval(updateTime,60000);
  $('#year').textContent = new Date().getFullYear();

  // A small, pausable narrative: typed code → build → the actual product.
  const workstation = $('#workstation');
  const playlist = [
    {id:'service',file:'service-portal.js',title:'Service Portal',description:'A whole business. One connected system.',image:'svc-dashboard.webp',lines:[
      ['comment','// A better way to keep everything connected.'],
      ['purple','import { idea } from "real-life";'],
      ['',''],
      ['blue','const servicePortal = createPlatform({'],
      ['','  requests: "every city, one place",'],
      ['','  dispatch: "the right person, on time",'],
      ['','  intelligence: "built in",'],
      ['blue','});'],
      ['',''],
      ['purple','await servicePortal.makeItReal();']
    ]},
    {id:'amaza',file:'amaza-studio.tsx',title:'Amaza Homes',description:'From a material swatch to a space you can imagine.',image:'amaza-vis.webp',lines:[
      ['comment','// What if you could see it before you chose it?'],
      ['purple','import { imagination } from "possibility";'],
      ['',''],
      ['blue','const studio = createExperience({'],
      ['','  materials: ["wood", "stone", "possibility"],'],
      ['','  visualiser: poweredBy("Gemini"),'],
      ['','  feeling: "this is my space",'],
      ['blue','});'],
      ['',''],
      ['purple','await studio.bringItToLife();']
    ]},
    {id:'face',file:'recognition.py',title:'Face Recognition',description:'A familiar face. A smarter way to clock in.',image:'face-enrol.webp',lines:[
      ['comment','# Less friction. A little more intelligence.'],
      ['purple','from possibilities import vision'],
      ['',''],
      ['blue','recognition = vision.create('],
      ['','    enrolment = "five guided poses",'],
      ['','    landmarks = "live feedback",'],
      ['','    duplicate_guard = True,'],
      ['blue',')'],
      ['',''],
      ['purple','recognition.make_every_entry_count()']
    ]}
  ];
  let buildIndex=0,elapsed=0,lastFrame=0,frame=0,visible=true,phase='',lastChars=-1;
  const CODE_TIME=3400,BUILD_TIME=1100,PREVIEW_TIME=6200;
  const CYCLE=CODE_TIME+BUILD_TIME+PREVIEW_TIME;
  let codeNodes=[];
  let totalChars=0;
  function updatePhase(next) {
    if(phase===next)return;
    phase=next;
    workstation.dataset.phase=next;
    $$('.chapter').forEach(el=>el.classList.toggle('active',el.dataset.chapter===next));
    const status={code:'Writing the first lines',build:'Connecting the pieces',live:'Built. Real. Ready to explore.'};
    $('#screen-status-text').textContent=status[next];
    $('#terminal-output').textContent=next==='code'?'An idea, taking shape.':next==='build'?'Building something that matters…':'✓ From the first line to the final product.';
    $('#screen-filename').textContent=next==='live'?playlist[buildIndex].title:playlist[buildIndex].file;
    $('#product-view').inert=next!=='live';
    $('#product-view').tabIndex=next==='live'?0:-1;
    $('#hero-mobile').inert=next!=='live';
    $('#hero-mobile').tabIndex=next==='live'?0:-1;
  }
  function renderBuild() {
    if(paused){updatePhase('live');return;}
    const next=elapsed<CODE_TIME?'code':elapsed<CODE_TIME+BUILD_TIME?'build':'live';
    updatePhase(next);
    const count=Math.floor(Math.min(elapsed/CODE_TIME,1)*totalChars);
    if(count!==lastChars){
      lastChars=count;
      let remaining=count;
      codeNodes.forEach(({text,node,row})=>{
        const length=Math.min(text.length,Math.max(remaining,0));
        node.textContent=text.slice(0,length);
        row.classList.toggle('typing',remaining>=0&&remaining<text.length);
        remaining-=text.length;
      });
    }
    const progress=Math.max(0,Math.min(1,(elapsed-CODE_TIME)/BUILD_TIME));
    $('.build-meter i').style.transform=`scaleX(${progress})`;
    $('.build-pagination .selected span').style.transform=`scaleX(${elapsed/CYCLE})`;
  }
  function selectBuild(index,showProduct=false) {
    buildIndex=(index+playlist.length)%playlist.length;
    elapsed=showProduct?CODE_TIME+BUILD_TIME+50:0;
    lastFrame=0;lastChars=-1;phase='';
    const item=playlist[buildIndex];
    $('#build-project-title').textContent=item.title;
    $('#build-project-description').textContent=item.description;
    $('#laptop-project-image').src=item.image;
    $('#laptop-project-image').alt=`${item.title}${item.id==='amaza'?' material visualiser':' — demo screen with sample data'}`;
    $('#product-view').dataset.project=item.id;
    $('#product-view').setAttribute('aria-label',`Explore ${item.title} on the laptop`);
    const mobileImage = projects.find(project => project.id === item.id).images.find(image => image.device === 'mobile');
    $('#hero-mobile').hidden = !mobileImage;
    if (mobileImage) {
      $('#hero-mobile').dataset.project = item.id;
      $('#hero-mobile img').src = mobileImage.src;
      $('#hero-mobile img').alt = `${item.title} mobile experience — demo data`;
      $('#hero-mobile').setAttribute('aria-label',`Explore ${item.title} mobile views`);
    }
    $('#typed-code').replaceChildren();
    codeNodes=item.lines.map(([color,text],i)=>{
      const row=document.createElement('div');row.className='code-line';
      const number=document.createElement('small');number.textContent=String(i+1).padStart(2,'0');
      const node=document.createElement('span');node.className=`code-${color||'default'}`;
      row.append(number,node);$('#typed-code').append(row);
      return {text,node,row};
    });
    totalChars=codeNodes.reduce((sum,line)=>sum+line.text.length,0);
    $$('[data-build]').forEach((button,i)=>{
      button.classList.toggle('selected',i===buildIndex);
      button.setAttribute('aria-pressed',String(i===buildIndex));
      $('span',button).style.transform='scaleX(0)';
    });
    renderBuild();
  }
  function animate(timestamp) {
    frame=0;
    if(paused||!visible||document.hidden||dialog.open)return;
    const inspecting = phase==='live' && ($('#product-view').matches(':hover') || document.activeElement===$('#product-view') || $('#hero-mobile').matches(':hover') || document.activeElement===$('#hero-mobile'));
    if(lastFrame&&!inspecting)elapsed+=Math.min(timestamp-lastFrame,80);
    lastFrame=timestamp;
    if(elapsed>=CYCLE)selectBuild(buildIndex+1);
    renderBuild();
    frame=requestAnimationFrame(animate);
  }
  function syncAnimation() {
    cancelAnimationFrame(frame);frame=0;lastFrame=0;
    document.documentElement.classList.toggle('motion-paused',paused);
    workstation.classList.toggle('scene-idle',paused||!visible||document.hidden||dialog.open);
    $('#motion-toggle').textContent=paused?'▷ Resume motion':'Ⅱ Pause motion';
    $('#motion-toggle').setAttribute('aria-pressed',String(paused));
    if(paused)renderBuild();
    else if(visible&&!document.hidden&&!dialog.open)frame=requestAnimationFrame(animate);
  }
  $('#motion-toggle').addEventListener('click',()=>{
    paused=!paused;
    if(!paused)elapsed=0;
    try{sessionStorage.setItem('ay-motion-paused',String(paused));}catch{}
    syncAnimation();
  });
  reducedMotion.addEventListener('change',e=>{paused=e.matches;syncAnimation();});
  document.addEventListener('visibilitychange',syncAnimation);
  dialog.addEventListener('close',syncAnimation);
  // The modal's native open attribute keeps the narrative from advancing behind a case study.
  new MutationObserver(syncAnimation).observe(dialog,{attributes:true,attributeFilter:['open']});
  if('IntersectionObserver' in window){
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncAnimation();},{threshold:0}).observe(workstation);
  }
  $('#next-build').addEventListener('click',()=>selectBuild(buildIndex+1,true));
  $$('[data-build]').forEach(button=>button.addEventListener('click',()=>selectBuild(Number(button.dataset.build),true)));
  $('#replay-build').addEventListener('click',()=>{
    if(paused){paused=false;try{sessionStorage.setItem('ay-motion-paused','false');}catch{}}
    selectBuild(buildIndex);syncAnimation();
  });
  workstation.addEventListener('pointermove',e=>{
    if(paused||e.pointerType==='touch')return;
    const r=workstation.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*2,y=((e.clientY-r.top)/r.height-.5)*2;
    workstation.style.setProperty('--look-x',`${x*4}deg`);
    workstation.style.setProperty('--look-y',`${-y*3}deg`);
  });
  workstation.addEventListener('pointerleave',()=>{
    workstation.style.setProperty('--look-x','0deg');workstation.style.setProperty('--look-y','0deg');
  });
  $('#launch').addEventListener('click',()=>{
    $('#work-title').tabIndex=-1;$('#work-title').focus({preventScroll:true});
  });
  selectBuild(0,paused);syncAnimation();

  // Preserve incoming anchors, including the original #more link.
  if(location.hash)requestAnimationFrame(()=>{
    const anchor=document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if(anchor){anchor.classList.add('visible');anchor.scrollIntoView({behavior:'instant'});}
  });
})();
