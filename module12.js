(() => {
  "use strict";

  const STORAGE_KEY = "inclusiveHealthTraining.module1.v1";
  const COURSE_VERSION = "2026.09-source1";
  const PASSING_SCORE = 80;

  const roleLabels = {
    reception: "Reception / Front Desk",
    ma: "Medical Assistant / Clinical Support",
    provider: "Provider",
    management: "Management / Leadership"
  };

  const lessons = [
    {
      id: "hazards",
      title: "1. Know Your Hazards",
      html: `
        <p class="eyebrow">Lesson 1</p>
        <h2>Hazardous materials are part of everyday clinic work.</h2>
        <p>Your training source identifies common clinic hazards including disinfectants, lab reagents, sterilants, pharmaceuticals, cryogenic materials, compressed gases, contaminated sharps and biomedical waste, and maintenance chemicals.</p>
        <h3>Your responsibilities</h3>
        <ul>
          <li>Know where Safety Data Sheets (SDS) are located.</li>
          <li>Follow required PPE.</li>
          <li>Label secondary containers.</li>
          <li>Use chemicals only as directed.</li>
          <li>Report spills or exposures immediately.</li>
          <li>Never mix chemicals without explicit SDS guidance.</li>
        </ul>
        <div class="notice notice-info"><strong>Core rule:</strong> A familiar product can still be hazardous. Follow the label, SDS, PPE requirements, and clinic procedure every time.</div>`,
      check: {
        q: "Which action is consistent with the clinic HazMat responsibilities in this training?",
        options: ["Use an unlabeled secondary bottle if everyone recognizes it", "Mix cleaning products when a stronger cleaner is needed", "Know where SDS information is located and report spills promptly", "Skip PPE for products you have used before"],
        correct: 2,
        explanation: "The source training requires accessible SDS information, proper labeling/PPE, directed use, and prompt spill or exposure reporting."
      }
    },
    {
      id: "sds",
      title: "2. Safety Data Sheets",
      html: `
        <p class="eyebrow">Lesson 2</p>
        <h2>Use the SDS instead of guessing.</h2>
        <p>Safety Data Sheets provide standardized information about chemical hazards and safe handling. Your training highlights several sections that clinical staff should be able to find quickly.</p>
        <table>
          <thead><tr><th>SDS section</th><th>What to look for</th></tr></thead>
          <tbody>
            <tr><td>Section 2</td><td>Hazards</td></tr>
            <tr><td>Section 4</td><td>First aid</td></tr>
            <tr><td>Section 6</td><td>Spill response</td></tr>
            <tr><td>Section 7</td><td>Safe handling and storage</td></tr>
            <tr><td>Section 8</td><td>Required PPE / exposure controls</td></tr>
            <tr><td>Section 10</td><td>Stability and reactivity</td></tr>
          </tbody>
        </table>
        <div class="notice notice-info"><strong>Clinic setup item:</strong> The source curriculum still contains placeholders for the physical SDS binder location and digital SDS path. Management should fill those in before treating this module as the final clinic-specific version.</div>`,
      check: {
        q: "Which SDS section does this training identify for required PPE?",
        options: ["Section 2", "Section 4", "Section 8", "Section 10"],
        correct: 2,
        explanation: "The supplied training identifies SDS Section 8 for required PPE and exposure controls."
      }
    },
    {
      id: "ppe",
      title: "3. PPE Selection",
      html: `
        <p class="eyebrow">Lesson 3</p>
        <h2>Match PPE to the task and hazard.</h2>
        <p>The supplied quick-reference material pairs common clinic hazards with PPE selections. Always follow the product SDS, manufacturer directions, and clinic policy for the specific task.</p>
        <table>
          <thead><tr><th>Task / hazard</th><th>Training quick-reference</th></tr></thead>
          <tbody>
            <tr><td>Using disinfectants</td><td>Gloves + eye protection</td></tr>
            <tr><td>Handling blood/body fluids</td><td>Gloves + gown + eyewear</td></tr>
            <tr><td>Using sterilants</td><td>Gloves + goggles + mask</td></tr>
            <tr><td>Liquid nitrogen procedures</td><td>Cryo gloves + face shield</td></tr>
            <tr><td>Large chemical spill cleanup</td><td>Waterproof gloves + eye protection + gown</td></tr>
            <tr><td>Chemotherapy/spill cleanup</td><td>Chemo-rated gloves + gown + eye protection</td></tr>
          </tbody>
        </table>
        <div class="notice notice-warning"><strong>Do not treat a cheat sheet as a substitute for the SDS.</strong> PPE must match the actual product, concentration, route of exposure, and procedure.</div>`,
      check: {
        q: "According to the supplied PPE quick-reference, what is listed for liquid nitrogen procedures?",
        options: ["Standard exam gloves only", "Cryo gloves + face shield", "Gown only", "No PPE if the container is closed"],
        correct: 1,
        explanation: "The source material lists cryogenic gloves and a face shield for liquid nitrogen procedures."
      }
    },
    {
      id: "spill",
      title: "4. Spill Response",
      html: `
        <p class="eyebrow">Lesson 4</p>
        <h2>STOP — PROTECT — CONTAIN — CLEAN — REPORT.</h2>
        <p>The training flowchart uses a five-step approach to chemical spills:</p>
        <ol>
          <li><strong>Identify:</strong> Determine whether the spill is chemical, biological, pharmaceutical, or unknown.</li>
          <li><strong>Protect:</strong> Use required PPE, alert others, and restrict the area.</li>
          <li><strong>Contain:</strong> Follow SDS instructions and use appropriate spill-kit materials. Never mix chemicals.</li>
          <li><strong>Clean and dispose:</strong> Use the appropriate waste stream and remove PPE properly.</li>
          <li><strong>Report:</strong> Notify the supervisor and complete required incident documentation.</li>
        </ol>
        <h3>When symptoms occur</h3>
        <p>The source scenarios repeatedly direct staff to stop the task, move away from the exposure, notify supervision/clinical leadership, and document the event when fumes or chemicals cause symptoms.</p>`,
      check: {
        q: "What does the supplied spill-response training identify as the first priority before cleanup?",
        options: ["Finish cleaning before anyone notices", "Protect yourself with appropriate PPE and control access to the area", "Neutralize every spill with bleach", "Photograph the spill for the chart"],
        correct: 1,
        explanation: "The training puts identification and self-protection before containment and cleanup."
      }
    },
    {
      id: "waste",
      title: "5. Waste & Exposure First Aid",
      html: `
        <p class="eyebrow">Lesson 5</p>
        <h2>Use the correct waste stream and respond immediately to exposure.</h2>
        <h3>Waste examples from the supplied guide</h3>
        <ul>
          <li><strong>Sharps:</strong> approved sharps container; never recap or overfill.</li>
          <li><strong>Red bag:</strong> blood-soaked materials, pathology specimens, contaminated PPE.</li>
          <li><strong>Chemical waste:</strong> sterilants, lab reagents, expired flammable liquids.</li>
          <li><strong>Pharmaceutical waste:</strong> hazardous drugs, controlled/narcotic waste according to applicable protocol, and expired medications.</li>
        </ul>
        <h3>First aid in the training source</h3>
        <ul>
          <li><strong>Skin:</strong> rinse and remove contaminated clothing.</li>
          <li><strong>Eyes:</strong> use eyewash for 15–20 minutes.</li>
          <li><strong>Inhalation:</strong> move to fresh air and obtain medical evaluation as indicated.</li>
          <li><strong>Ingestion:</strong> follow the SDS; do not induce vomiting unless directed.</li>
          <li><strong>Afterward:</strong> report and document the exposure.</li>
        </ul>`,
      check: {
        q: "How long does the supplied training direct staff to rinse the eyes after chemical exposure?",
        options: ["30 seconds", "2 minutes", "5 minutes", "15–20 minutes"],
        correct: 3,
        explanation: "The source handout states 15–20 minutes of eyewash for chemical eye exposure."
      }
    },
    {
      id: "role",
      title: "6. Role-Based Practice",
      scenario: true,
      html: `
        <p class="eyebrow">Lesson 6</p>
        <h2>Apply the rules to your role.</h2>
        <p>Your scenario is selected from the role-based examples in the supplied HazMat curriculum.</p>
        <div id="scenarioHost"></div>`
    },
    {
      id: "assessment",
      title: "7. Final Assessment",
      assessment: true,
      html: `
        <p class="eyebrow">Final assessment</p>
        <h2>Demonstrate what you learned.</h2>
        <p>You must score at least 80% to pass Module 1.2.</p>
        <div id="quizHost"></div>`
    },
    {
      id: "completion",
      title: "8. Attestation & Completion",
      completion: true,
      html: `
        <p class="eyebrow">Completion</p>
        <h2>Attest and save your record.</h2>
        <div id="completionHost"></div>`
    }
  ];

  const scenarios = {
    reception: {
      title: "Disinfectant Spill at Check-In",
      text: "Disinfectant spills on the reception counter while patients are present.",
      q: "What is the best response based on the supplied scenario training?",
      options: ["Leave it until the lobby is empty", "Block the area, use appropriate spill materials and PPE, clean per SDS, and report it", "Cover it with paper and continue check-in", "Mix in another cleaner to neutralize it"],
      correct: 1,
      explanation: "The source reception scenario directs staff to block the area, use spill materials, wear appropriate PPE, clean according to the SDS, and report the spill."
    },
    ma: {
      title: "Sharps Container Overfilled",
      text: "A sharps container is filled to the top and someone tries to force another needle into it.",
      q: "What should you do?",
      options: ["Push the needle in carefully", "Stop using the container, seal/remove it, replace it, and reinforce safe practice", "Move the container to another room", "Recap the needle until space is available"],
      correct: 1,
      explanation: "The supplied clinical scenario calls for stopping use, sealing/removing the container, replacing it immediately, and educating staff."
    },
    provider: {
      title: "Liquid Nitrogen Splash",
      text: "Liquid nitrogen splashes near a provider during a procedure.",
      q: "Which response best matches the supplied scenario?",
      options: ["Ignore it unless pain develops the next day", "Remove affected PPE/clothing, rinse if skin contact occurred, seek evaluation, document, and review PPE compliance", "Apply heat immediately", "Finish the procedure before reporting"],
      correct: 1,
      explanation: "The source clinical scenario emphasizes immediate exposure response, medical evaluation, documentation, and review of PPE compliance."
    },
    management: {
      title: "Outdated SDS Binder",
      text: "An audit finds Safety Data Sheets in the clinic binder that are more than ten years old.",
      q: "What does the supplied management scenario direct you to do?",
      options: ["Keep them because old SDS never change", "Replace outdated SDS, audit the chemical inventory, and review the digital SDS system", "Discard the binder and keep no SDS", "Only update sheets after an exposure"],
      correct: 1,
      explanation: "The supplied administration scenario calls for replacing outdated SDS, auditing chemical inventory, and reviewing the digital SDS platform."
    }
  };

  const quiz = [
    { q: "What document provides instructions for safe handling of chemicals?", options: ["SDS", "Patient label", "Encounter note", "Claim form"], correct: 0 },
    { q: "Which SDS section is identified in this training for required PPE?", options: ["2", "4", "8", "10"], correct: 2 },
    { q: "True or false: It is acceptable to mix bleach with another cleaner if the spill is large.", options: ["True", "False"], correct: 1 },
    { q: "What is the first priority in the supplied spill-response sequence?", options: ["Documentation", "Protect yourself / use appropriate PPE", "Dispose of everything", "Call billing"], correct: 1 },
    { q: "According to the supplied quick-reference, what PPE is listed for liquid nitrogen?", options: ["Cryo gloves + face shield", "No PPE", "Surgical mask only", "Exam gloves only"], correct: 0 },
    { q: "An overfilled sharps container increases the risk of what?", options: ["Needlestick injury", "Network outage", "Medication shortage", "Scheduling delay"], correct: 0 },
    { q: "Which chemical does the supplied quiz say should never be mixed with bleach?", options: ["Water", "Ammonia", "Saline", "Distilled water"], correct: 1 },
    { q: "How should chemicals be stored according to the supplied standard quiz?", options: ["Alphabetically only", "According to compatibility", "Wherever shelf space is open", "By bottle color"], correct: 1 },
    { q: "How long does the source training direct eye irrigation after chemical exposure?", options: ["1 minute", "5 minutes", "15–20 minutes", "Until the shift ends"], correct: 2 },
    { q: "Who does the supplied training identify as responsible for reporting hazardous incidents/exposures?", options: ["Only management", "Only providers", "All staff/employees", "Only the person who ordered the chemical"], correct: 2 }
  ];

  const els = {
    noLearner: document.getElementById("noLearner"),
    learnerIdentity: document.getElementById("learnerIdentity"),
    lessonNav: document.getElementById("lessonNav"),
    lessonHost: document.getElementById("lessonHost"),
    progressBar: document.getElementById("progressBar"),
    progressText: document.getElementById("progressText")
  };

  let state = loadState();
  let learner = currentLearner();
  let activeIndex = 0;

  function loadState() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return value && value.learners ? value : { currentLearnerKey: null, learners: {} };
    } catch {
      return { currentLearnerKey: null, learners: {} };
    }
  }

  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function currentLearner() { return state.currentLearnerKey ? state.learners[state.currentLearnerKey] : null; }
  function now() { return new Date().toISOString(); }
  function esc(value) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
  function fmt(value) { if (!value) return "—"; const d = new Date(value); return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString([], { year:"numeric", month:"short", day:"numeric", hour:"numeric", minute:"2-digit" }); }

  function blankRecord() {
    return {
      moduleId: "1.2",
      lessonsDone: [],
      checks: {},
      scenarioCorrect: false,
      quizAttempts: [],
      bestScore: null,
      passed: false,
      attestedAt: null,
      completedAt: null,
      lastActivityAt: null,
      courseVersion: COURSE_VERSION
    };
  }

  function record() {
    if (!learner) return null;
    learner.records ||= {};
    learner.records["1.2"] ||= blankRecord();
    return learner.records["1.2"];
  }

  function isDone(id) { return !!record()?.lessonsDone.includes(id); }
  function markDone(id) {
    const r = record();
    if (!r.lessonsDone.includes(id)) r.lessonsDone.push(id);
    r.lastActivityAt = now();
    saveState();
    renderNav();
    renderProgress();
  }

  function requiredBeforeAssessmentDone() {
    return lessons.slice(0, 6).every(l => isDone(l.id));
  }

  function renderProgress() {
    if (!learner) {
      els.progressBar.style.width = "0%";
      els.progressText.textContent = "0% complete";
      return;
    }
    const completed = new Set(record().lessonsDone).size;
    const pct = Math.round((completed / lessons.length) * 100);
    els.progressBar.style.width = `${pct}%`;
    els.progressText.textContent = `${pct}% complete`;
  }

  function renderNav() {
    els.lessonNav.replaceChildren();
    lessons.forEach((lesson, index) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = lesson.title;
      if (index === activeIndex) b.classList.add("active");
      if (isDone(lesson.id)) b.classList.add("done");
      b.addEventListener("click", () => {
        activeIndex = index;
        renderNav();
        renderLesson();
      });
      els.lessonNav.appendChild(b);
    });
  }

  function navHtml(canComplete = true, label = "Complete lesson") {
    const done = isDone(lessons[activeIndex].id);
    return `<div class="lesson-actions">
      <button id="prevLesson" class="secondary-button" type="button" ${activeIndex === 0 ? "disabled" : ""}>Previous</button>
      <div>
        ${done ? "" : `<button id="completeLesson" class="primary-button" type="button" ${canComplete ? "" : "disabled"}>${esc(label)}</button>`}
        <button id="nextLesson" class="secondary-button" type="button" ${activeIndex === lessons.length - 1 ? "disabled" : ""}>Next</button>
      </div>
    </div>`;
  }

  function wireNav(onComplete) {
    document.getElementById("prevLesson")?.addEventListener("click", () => move(-1));
    document.getElementById("nextLesson")?.addEventListener("click", () => move(1));
    document.getElementById("completeLesson")?.addEventListener("click", () => {
      if (onComplete) onComplete(); else markDone(lessons[activeIndex].id);
      if (activeIndex < lessons.length - 1) move(1); else renderLesson();
    });
  }

  function move(delta) {
    activeIndex = Math.max(0, Math.min(lessons.length - 1, activeIndex + delta));
    renderNav();
    renderLesson();
  }

  function renderKnowledgeCheck(lesson) {
    const r = record();
    const prior = r.checks[lesson.id] === true;
    els.lessonHost.insertAdjacentHTML("beforeend", `
      <section class="knowledge-check">
        <h3>Knowledge check</h3>
        <p><strong>${esc(lesson.check.q)}</strong></p>
        <div class="choice-list">${lesson.check.options.map((o,i) => `<label class="choice-row"><input type="radio" name="check" value="${i}" ${prior && i === lesson.check.correct ? "checked" : ""}> <span>${esc(o)}</span></label>`).join("")}</div>
        <button id="checkAnswer" class="secondary-button" type="button">Check answer</button>
        <div id="checkFeedback" aria-live="polite">${prior ? `<div class="feedback correct">Correct. ${esc(lesson.check.explanation)}</div>` : ""}</div>
      </section>
      ${navHtml(prior || isDone(lesson.id))}`);

    document.getElementById("checkAnswer").addEventListener("click", () => {
      const selected = els.lessonHost.querySelector('input[name="check"]:checked');
      const feedback = document.getElementById("checkFeedback");
      if (!selected) {
        feedback.innerHTML = `<div class="feedback incorrect">Choose an answer first.</div>`;
        return;
      }
      const correct = Number(selected.value) === lesson.check.correct;
      r.checks[lesson.id] = correct;
      r.lastActivityAt = now();
      saveState();
      feedback.innerHTML = `<div class="feedback ${correct ? "correct" : "incorrect"}">${correct ? "Correct." : "Not quite."} ${esc(lesson.check.explanation)}</div>`;
      if (correct) document.getElementById("completeLesson").disabled = false;
    });
    wireNav();
  }

  function renderScenario() {
    const s = scenarios[learner.role] || scenarios.ma;
    const r = record();
    const host = document.getElementById("scenarioHost");
    host.innerHTML = `
      <section class="scenario-card">
        <p class="eyebrow">${esc(roleLabels[learner.role] || learner.role)} scenario</p>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        <p><strong>${esc(s.q)}</strong></p>
        <div class="choice-list">${s.options.map((o,i) => `<label class="choice-row"><input type="radio" name="scenario" value="${i}" ${r.scenarioCorrect && i === s.correct ? "checked" : ""}> <span>${esc(o)}</span></label>`).join("")}</div>
        <button id="checkScenario" class="secondary-button" type="button">Check response</button>
        <div id="scenarioFeedback" aria-live="polite">${r.scenarioCorrect ? `<div class="feedback correct">Correct. ${esc(s.explanation)}</div>` : ""}</div>
      </section>
      ${navHtml(r.scenarioCorrect || isDone("role"), "Complete role practice")}`;

    document.getElementById("checkScenario").addEventListener("click", () => {
      const selected = host.querySelector('input[name="scenario"]:checked');
      const feedback = document.getElementById("scenarioFeedback");
      if (!selected) {
        feedback.innerHTML = `<div class="feedback incorrect">Choose a response first.</div>`;
        return;
      }
      const correct = Number(selected.value) === s.correct;
      r.scenarioCorrect = correct;
      r.lastActivityAt = now();
      saveState();
      feedback.innerHTML = `<div class="feedback ${correct ? "correct" : "incorrect"}">${correct ? "Correct." : "Not quite."} ${esc(s.explanation)}</div>`;
      if (correct) document.getElementById("completeLesson").disabled = false;
    });
    wireNav();
  }

  function renderAssessment() {
    const r = record();
    const host = document.getElementById("quizHost");

    if (!requiredBeforeAssessmentDone()) {
      host.innerHTML = `<div class="notice notice-warning">Complete Lessons 1–6 before submitting the final assessment.</div>${navHtml(false, "Complete assessment")}`;
      wireNav();
      return;
    }

    if (r.passed) {
      host.innerHTML = `<div class="notice notice-info"><strong>Passed.</strong> Best score: ${r.bestScore}%. Attempts: ${r.quizAttempts.length}.</div>${navHtml(true, "Continue")}`;
      if (!isDone("assessment")) markDone("assessment");
      wireNav();
      return;
    }

    host.innerHTML = `<form id="quizForm">${quiz.map((q,qi) => `
      <section class="quiz-question">
        <h3>${qi + 1}. ${esc(q.q)}</h3>
        <div class="choice-list">${q.options.map((o,oi) => `<label class="choice-row"><input type="radio" name="q${qi}" value="${oi}" required> <span>${esc(o)}</span></label>`).join("")}</div>
      </section>`).join("")}
      <button class="primary-button" type="submit">Submit assessment</button>
    </form><div id="quizResult" aria-live="polite"></div>
    <div class="lesson-actions"><button id="prevLesson" class="secondary-button" type="button">Previous</button></div>`;

    document.getElementById("prevLesson").addEventListener("click", () => move(-1));
    document.getElementById("quizForm").addEventListener("submit", event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      let correctCount = 0;
      quiz.forEach((q,qi) => { if (Number(form.get(`q${qi}`)) === q.correct) correctCount += 1; });
      const score = Math.round((correctCount / quiz.length) * 100);
      const passed = score >= PASSING_SCORE;
      r.quizAttempts.push({ score, passed, completedAt: now(), questionCount: quiz.length });
      r.bestScore = r.bestScore == null ? score : Math.max(r.bestScore, score);
      r.passed = r.passed || passed;
      r.lastActivityAt = now();
      if (passed && !r.lessonsDone.includes("assessment")) r.lessonsDone.push("assessment");
      saveState();
      renderNav();
      renderProgress();
      document.getElementById("quizResult").innerHTML = `<div class="knowledge-check"><p class="eyebrow">${passed ? "Passed" : "Retake required"}</p><div class="score-big">${score}%</div><p>${correctCount} of ${quiz.length} correct. ${passed ? "You met the 80% requirement." : "Review the material and try again."}</p><button id="quizNext" class="${passed ? "primary-button" : "secondary-button"}" type="button">${passed ? "Continue to attestation" : "Retake assessment"}</button></div>`;
      document.getElementById("quizNext").addEventListener("click", () => passed ? move(1) : renderLesson());
    });
  }

  function certificateHtml(r) {
    return `<div class="certificate">
      <p class="eyebrow">Inclusive Health Employee Learning Center</p>
      <h2>Certificate of Completion</h2>
      <p>This certifies that</p>
      <div class="certificate-name">${esc(learner.name)}</div>
      <p>completed</p>
      <h3>Module 1.2 — OSHA &amp; HazMat</h3>
      <p>Final assessment: <strong>${r.bestScore}%</strong></p>
      <p>Completed: <strong>${esc(fmt(r.completedAt))}</strong></p>
      <p>Course version: ${esc(r.courseVersion)}</p>
      <button id="printCertificate" class="secondary-button" type="button">Print certificate</button>
    </div>`;
  }

  function renderCompletion() {
    const r = record();
    const host = document.getElementById("completionHost");
    if (!r.passed) {
      host.innerHTML = `<div class="notice notice-warning">Pass the final assessment before completing the course.</div>${navHtml(false, "Complete Module 1.2")}`;
      wireNav();
      return;
    }

    if (r.completedAt) {
      host.innerHTML = `${certificateHtml(r)}<div class="lesson-actions"><button id="prevLesson" class="secondary-button" type="button">Previous</button><a class="primary-button" href="index.html">Return to training dashboard</a></div>`;
      document.getElementById("printCertificate")?.addEventListener("click", () => window.print());
      document.getElementById("prevLesson")?.addEventListener("click", () => move(-1));
      return;
    }

    host.innerHTML = `
      <label class="choice-row"><input id="attest" type="checkbox"> <span>I acknowledge that I completed this training and will follow the clinic's approved hazard communication, PPE, SDS, spill, waste, and exposure-response procedures.</span></label>
      <button id="completeCourse" class="primary-button" type="button" disabled>Complete Module 1.2</button>
      <p class="source-note">This interactive course is based on the OSHA/HazMat training material supplied for this project. Clinic-specific placeholders such as the SDS binder and digital SDS locations should be completed before final production use.</p>
      <div class="lesson-actions"><button id="prevLesson" class="secondary-button" type="button">Previous</button></div>`;
    const attest = document.getElementById("attest");
    const complete = document.getElementById("completeCourse");
    attest.addEventListener("change", () => { complete.disabled = !attest.checked; });
    document.getElementById("prevLesson").addEventListener("click", () => move(-1));
    complete.addEventListener("click", () => {
      const stamp = now();
      r.attestedAt = stamp;
      r.completedAt = stamp;
      r.lastActivityAt = stamp;
      if (!r.lessonsDone.includes("completion")) r.lessonsDone.push("completion");
      saveState();
      renderNav();
      renderProgress();
      renderCompletion();
    });
  }

  function renderLesson() {
    if (!learner) {
      els.lessonHost.innerHTML = `<h2>Learner profile required</h2><p>Return to the training dashboard, select or create a learner profile, and then open Module 1.2 again.</p><a class="primary-button" href="index.html">Return to dashboard</a>`;
      return;
    }
    const lesson = lessons[activeIndex];
    els.lessonHost.innerHTML = lesson.html;
    if (lesson.scenario) renderScenario();
    else if (lesson.assessment) renderAssessment();
    else if (lesson.completion) renderCompletion();
    else renderKnowledgeCheck(lesson);
    record().lastActivityAt = now();
    saveState();
    els.lessonHost.focus();
  }

  function start() {
    if (!learner) {
      els.noLearner.classList.remove("hidden");
      els.learnerIdentity.innerHTML = `<strong>No learner selected</strong><p>Return to the dashboard to choose a learner.</p>`;
      renderProgress();
      renderNav();
      renderLesson();
      return;
    }

    const r = record();
    els.learnerIdentity.innerHTML = `<strong>${esc(learner.name)}</strong><p>${esc(roleLabels[learner.role] || learner.role)}</p>`;
    const firstIncomplete = lessons.findIndex(l => !r.lessonsDone.includes(l.id));
    activeIndex = firstIncomplete === -1 ? 0 : firstIncomplete;
    renderProgress();
    renderNav();
    renderLesson();
  }

  start();
})();
