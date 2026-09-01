(() => {
  "use strict";
  const STORAGE_KEY = "inclusiveHealthTraining.module1.v1";
  const PASSING_SCORE = 80;
  const params = new URLSearchParams(location.search);
  const moduleId = params.get("m");
  const course = window.IH_MODULE_COURSES?.[moduleId];
  const catalogModule = window.TRAINING_CATALOG?.modules?.find(m => m.id === moduleId);

  const els = {
    title: document.getElementById("moduleTitle"),
    desc: document.getElementById("moduleDescription"),
    learner: document.getElementById("learnerIdentity"),
    nav: document.getElementById("lessonNav"),
    host: document.getElementById("lessonHost"),
    progress: document.getElementById("progressText"),
    bar: document.getElementById("progressBar"),
    noLearner: document.getElementById("noLearner")
  };

  let state = loadState();
  let learner = currentLearner();
  let activeIndex = 0;

  function loadState(){
    try { const s = JSON.parse(localStorage.getItem(STORAGE_KEY)); return s?.learners ? s : {currentLearnerKey:null,learners:{}}; }
    catch { return {currentLearnerKey:null,learners:{}}; }
  }
  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function currentLearner(){ return state.currentLearnerKey ? state.learners[state.currentLearnerKey] : null; }
  function esc(v){ return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
  function now(){ return new Date().toISOString(); }
  function fmt(v){ if(!v) return "—"; const d=new Date(v); return Number.isNaN(d.getTime())?"—":d.toLocaleString([], {year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}); }

  function record(){
    if(!learner || !course) return null;
    learner.records ||= {};
    learner.records[moduleId] ||= {moduleId,lessonsDone:[],quizAttempts:[],bestScore:null,passed:false,attestedAt:null,completedAt:null,lastActivityAt:null,courseVersion:"2026.09-source1"};
    return learner.records[moduleId];
  }
  function done(id){ return record()?.lessonsDone?.includes(id); }
  function markDone(id){ const r=record(); if(!r.lessonsDone.includes(id)) r.lessonsDone.push(id); r.lastActivityAt=now(); save(); renderNav(); }
  function progress(){ const r=record(); if(!r) return 0; const total=course.lessons.length+2; const completed=r.lessonsDone.length + (r.passed?1:0) + (r.completedAt?1:0); return Math.round((completed/total)*100); }

  function renderHeader(){
    if(!course){ els.title.textContent="Module not found"; els.desc.textContent="Return to the dashboard and choose another module."; return; }
    document.title=`Module ${moduleId} | ${course.title} | Inclusive Health Training`;
    els.title.textContent=`Module ${moduleId}: ${course.title}`;
    els.desc.textContent=catalogModule?.description || "Interactive compliance training.";
    if(learner){ els.learner.innerHTML=`<strong>${esc(learner.name)}</strong><br><span>${esc(learner.role || "")}</span>`; els.noLearner.classList.add("hidden"); }
    else { els.learner.textContent="No learner selected"; els.noLearner.classList.remove("hidden"); }
  }

  function renderNav(){
    if(!course) return;
    const r=record();
    const p=progress(); els.progress.textContent=`${p}% complete`; els.bar.style.width=`${p}%`;
    els.nav.replaceChildren();
    course.lessons.forEach((l,i)=>addNav(l.title,i,done(l.id)));
    addNav("Final Assessment",course.lessons.length,!!r?.passed);
    addNav("Attestation & Completion",course.lessons.length+1,!!r?.completedAt);
  }
  function addNav(label,index,isDone){ const b=document.createElement("button"); b.type="button"; b.textContent=label; if(index===activeIndex)b.classList.add("active"); if(isDone)b.classList.add("done"); b.addEventListener("click",()=>{activeIndex=index;renderNav();render();}); els.nav.appendChild(b); }

  function render(){
    if(!course){ els.host.innerHTML="<p>Module not found.</p>"; return; }
    if(!learner){ els.host.innerHTML='<div class="notice notice-warning">Return to the dashboard and select a learner before starting this module.</div>'; return; }
    if(activeIndex < course.lessons.length) renderLesson(course.lessons[activeIndex]);
    else if(activeIndex === course.lessons.length) renderQuiz();
    else renderCompletion();
    els.host.focus();
  }

  function navButtons(includeComplete=true){
    const prev=activeIndex>0?'<button id="prevBtn" class="secondary-button" type="button">Previous</button>':'<span></span>';
    const complete=includeComplete && activeIndex<course.lessons.length && !done(course.lessons[activeIndex].id)?'<button id="completeBtn" class="primary-button" type="button">Mark lesson complete</button>':'';
    const next=activeIndex<course.lessons.length+1?'<button id="nextBtn" class="secondary-button" type="button">Next</button>':'';
    return `<div class="lesson-actions">${prev}<div>${complete}${next}</div></div>`;
  }
  function wireNav(){
    document.getElementById("prevBtn")?.addEventListener("click",()=>{activeIndex--;renderNav();render();});
    document.getElementById("nextBtn")?.addEventListener("click",()=>{activeIndex++;renderNav();render();});
    document.getElementById("completeBtn")?.addEventListener("click",()=>{markDone(course.lessons[activeIndex].id); if(activeIndex<course.lessons.length+1) activeIndex++; renderNav(); render();});
  }
  function renderLesson(lesson){ els.host.innerHTML=`${lesson.html}${navButtons(true)}`; record().lastActivityAt=now(); save(); wireNav(); }

  function allLessonsDone(){ return course.lessons.every(l=>done(l.id)); }
  function renderQuiz(){
    const r=record();
    if(!allLessonsDone()){
      els.host.innerHTML=`<p class="eyebrow">Final assessment</p><h2>Finish the lessons first.</h2><div class="notice notice-warning">Complete all course lessons before submitting the final assessment.</div>${navButtons(false)}`; wireNav(); return;
    }
    if(r.passed){ els.host.innerHTML=`<p class="eyebrow">Passed</p><h2>Final Assessment</h2><div class="score-big">${r.bestScore}%</div><p>You met the ${PASSING_SCORE}% passing score.</p>${navButtons(false)}`; wireNav(); return; }
    els.host.innerHTML=`<p class="eyebrow">Final assessment</p><h2>Score at least ${PASSING_SCORE}% to pass.</h2><form id="quizForm">${course.quiz.map((q,qi)=>`<section class="quiz-question"><h3>${qi+1}. ${esc(q.q)}</h3><div class="choice-list">${q.o.map((o,oi)=>`<label class="choice-row"><input type="radio" name="q${qi}" value="${oi}" required><span>${esc(o)}</span></label>`).join("")}</div></section>`).join("")}<button class="primary-button" type="submit">Submit assessment</button></form><div id="quizResult" aria-live="polite"></div>${navButtons(false)}`;
    wireNav();
    document.getElementById("quizForm").addEventListener("submit",e=>{
      e.preventDefault(); const fd=new FormData(e.currentTarget); let correct=0; course.quiz.forEach((q,i)=>{if(Number(fd.get(`q${i}`))===q.a)correct++;}); const score=Math.round(correct/course.quiz.length*100); const passed=score>=PASSING_SCORE;
      r.quizAttempts.push({score,passed,completedAt:now()}); r.bestScore=r.bestScore==null?score:Math.max(r.bestScore,score); r.passed=r.passed||passed; r.lastActivityAt=now(); save(); renderNav();
      document.getElementById("quizResult").innerHTML=`<div class="quiz-result"><div class="score-big">${score}%</div><p>${passed?"Passed. You may continue to attestation.":"Review the course and retake the assessment."}</p>${passed?'<button id="continueBtn" class="primary-button" type="button">Continue to completion</button>':'<button id="retryBtn" class="secondary-button" type="button">Retake</button>'}</div>`;
      document.getElementById(passed?"continueBtn":"retryBtn").addEventListener("click",()=>{ if(passed){activeIndex=course.lessons.length+1;renderNav();render();} else renderQuiz(); });
    });
  }

  function renderCompletion(){
    const r=record();
    if(!r.passed){ els.host.innerHTML=`<p class="eyebrow">Completion</p><h2>Pass the assessment first.</h2>${navButtons(false)}`; wireNav(); return; }
    if(r.completedAt){
      els.host.innerHTML=`<div class="certificate"><p class="eyebrow">Inclusive Health Employee Learning Center</p><h2>Certificate of Completion</h2><p>This certifies that</p><div class="certificate-name">${esc(learner.name)}</div><p>completed</p><h3>Module ${esc(moduleId)} — ${esc(course.title)}</h3><p>Final assessment: <strong>${r.bestScore}%</strong></p><p>Completed: <strong>${esc(fmt(r.completedAt))}</strong></p><button id="printCertificate" class="secondary-button" type="button">Print certificate</button></div><div class="lesson-actions"><a class="primary-button" href="index.html">Return to dashboard</a></div>`;
      document.getElementById("printCertificate")?.addEventListener("click",()=>window.print()); return;
    }
    els.host.innerHTML=`<p class="eyebrow">Attestation</p><h2>Complete this module.</h2><label class="ack-row"><input id="attest" type="checkbox"><span>I attest that I completed this training and will follow current Inclusive Health policy, manufacturer instructions, and applicable law/regulation for my role.</span></label><button id="finishBtn" class="primary-button" type="button" disabled>Complete Module ${esc(moduleId)}</button>${navButtons(false)}`;
    wireNav(); const c=document.getElementById("attest"), b=document.getElementById("finishBtn"); c.addEventListener("change",()=>b.disabled=!c.checked); b.addEventListener("click",()=>{const t=now();r.attestedAt=t;r.completedAt=t;r.lastActivityAt=t;save();renderNav();renderCompletion();});
  }

  renderHeader();
  if(course && learner){ record(); activeIndex=course.lessons.findIndex(l=>!done(l.id)); if(activeIndex<0) activeIndex=record().passed?course.lessons.length+1:course.lessons.length; }
  renderNav(); render();
})();