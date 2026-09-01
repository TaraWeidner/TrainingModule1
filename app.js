(() => {
  "use strict";

  const catalog = window.TRAINING_CATALOG;
  const course = catalog.course11;
  const STORAGE_KEY = "inclusiveHealthTraining.module1.v1";

  const els = {
    learnerButton: document.getElementById("learnerButton"),
    learnerSummary: document.getElementById("learnerSummary"),
    learnerCard: document.getElementById("learnerCard"),
    moduleGrid: document.getElementById("moduleGrid"),
    moduleCardTemplate: document.getElementById("moduleCardTemplate"),
    overallProgressValue: document.getElementById("overallProgressValue"),
    recordSummary: document.getElementById("recordSummary"),
    exportCsvButton: document.getElementById("exportCsvButton"),
    resetButton: document.getElementById("resetButton"),
    backdrop: document.getElementById("modalBackdrop"),
    learnerModal: document.getElementById("learnerModal"),
    learnerForm: document.getElementById("learnerForm"),
    learnerName: document.getElementById("learnerName"),
    learnerId: document.getElementById("learnerId"),
    learnerRole: document.getElementById("learnerRole"),
    courseModal: document.getElementById("courseModal"),
    courseKicker: document.getElementById("courseKicker"),
    courseTitle: document.getElementById("courseTitle"),
    courseProgressText: document.getElementById("courseProgressText"),
    courseProgressBar: document.getElementById("courseProgressBar"),
    lessonNav: document.getElementById("lessonNav"),
    lessonContent: document.getElementById("lessonContent")
  };

  let state = loadState();
  let activeLessonIndex = 0;

  function blankState() {
    return { currentLearnerKey: null, learners: {} };
  }

  function blankRecord() {
    return {
      moduleId: "1.1",
      lessonsDone: [],
      checks: {},
      roleScenarios: {},
      quizAttempts: [],
      bestScore: null,
      passed: false,
      attestedAt: null,
      completedAt: null,
      lastActivityAt: null,
      courseVersion: catalog.version
    };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!parsed || typeof parsed !== "object" || !parsed.learners) return blankState();
      return parsed;
    } catch {
      return blankState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function currentLearner() {
    return state.currentLearnerKey ? state.learners[state.currentLearnerKey] : null;
  }

  function learnerRecord() {
    const learner = currentLearner();
    if (!learner) return null;
    learner.records ||= {};
    learner.records["1.1"] ||= blankRecord();
    return learner.records["1.1"];
  }

  function makeLearnerKey(name, employeeId) {
    const id = (employeeId || "").trim().toLowerCase();
    if (id) return `id:${id}`;
    return `name:${name.trim().toLowerCase().replace(/\s+/g, "-")}`;
  }

  function roleLabel(role) {
    return {
      reception: "Reception / Front Desk",
      ma: "Medical Assistant / Clinical Support",
      provider: "Provider",
      management: "Management / Leadership"
    }[role] || role;
  }

  function isoNow() { return new Date().toISOString(); }

  function formatDate(value) {
    if (!value) return "—";
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString([], { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function calculateProgress() {
    const record = learnerRecord();
    if (!record) return 0;
    const required = course.lessons.length;
    const completed = new Set(record.lessonsDone).size;
    return Math.round((completed / required) * 100);
  }

  function setActivity() {
    const record = learnerRecord();
    if (!record) return;
    record.lastActivityAt = isoNow();
    saveState();
  }

  function markLessonDone(id) {
    const record = learnerRecord();
    if (!record) return;
    if (!record.lessonsDone.includes(id)) record.lessonsDone.push(id);
    record.lastActivityAt = isoNow();
    saveState();
    renderDashboard();
    renderCourseNav();
  }

  function isLessonDone(id) {
    const record = learnerRecord();
    return !!record?.lessonsDone.includes(id);
  }

  function renderDashboard() {
    const learner = currentLearner();
    const record = learnerRecord();
    const progress = calculateProgress();

    els.overallProgressValue.textContent = `${progress}%`;
    els.learnerButton.textContent = learner ? "Change learner" : "Set learner";
    els.learnerSummary.textContent = learner ? `${learner.name} • ${roleLabel(learner.role)}` : "No learner selected";

    if (learner) {
      els.learnerCard.classList.remove("empty-state");
      els.learnerCard.innerHTML = `<strong>${escapeHtml(learner.name)}</strong><p>${escapeHtml(roleLabel(learner.role))}</p>${learner.employeeId ? `<p>ID / initials: ${escapeHtml(learner.employeeId)}</p>` : ""}<p>Profile created: ${escapeHtml(formatDate(learner.createdAt))}</p>`;
    } else {
      els.learnerCard.classList.add("empty-state");
      els.learnerCard.textContent = "Set a learner profile to begin.";
    }

    if (record && (record.lessonsDone.length || record.quizAttempts.length)) {
      const attemptText = record.quizAttempts.length === 1 ? "1 assessment attempt" : `${record.quizAttempts.length} assessment attempts`;
      els.recordSummary.innerHTML = `<p><strong>${progress}% complete</strong></p><p>Best score: ${record.bestScore == null ? "—" : `${record.bestScore}%`}</p><p>${attemptText}</p><p>Completed: ${escapeHtml(formatDate(record.completedAt))}</p>`;
      els.exportCsvButton.disabled = false;
      els.resetButton.disabled = false;
    } else {
      els.recordSummary.textContent = learner ? "No training activity yet." : "No activity yet.";
      els.exportCsvButton.disabled = !learner;
      els.resetButton.disabled = !learner;
    }

    renderModules();
  }

  function renderModules() {
    els.moduleGrid.replaceChildren();
    const record = learnerRecord();

    catalog.modules.forEach(module => {
      const fragment = els.moduleCardTemplate.content.cloneNode(true);
      const card = fragment.querySelector(".module-card");
      const number = fragment.querySelector(".module-number");
      const status = fragment.querySelector(".module-status");
      const title = fragment.querySelector(".module-title");
      const description = fragment.querySelector(".module-description");
      const meta = fragment.querySelector(".module-meta");
      const action = fragment.querySelector(".module-action");

      number.textContent = `Module ${module.id}`;
      title.textContent = module.title;
      description.textContent = module.description;
      meta.innerHTML = `<span>${escapeHtml(module.audience)}</span><span>•</span><span>${escapeHtml(module.estimate)}</span>`;

      if (module.available) {
        const complete = !!record?.completedAt;
        const started = !!record && (record.lessonsDone.length > 0 || record.quizAttempts.length > 0);
        status.textContent = complete ? "Complete" : started ? "In progress" : "Ready";
        status.className = `module-status pill ${complete ? "complete" : started ? "progress" : "ready"}`;
        action.textContent = complete ? "Review course" : started ? "Resume course" : "Start course";
        action.addEventListener("click", () => {
          if (!currentLearner()) return openLearnerModal();
          openCourse();
        });
      } else {
        status.textContent = "Curriculum loaded";
        status.className = "module-status pill";
        action.textContent = "Coming next";
        action.disabled = true;
        card.setAttribute("aria-label", `${module.title}, curriculum loaded, interactive course coming next`);
      }

      els.moduleGrid.appendChild(fragment);
    });
  }

  function openLearnerModal() {
    const learner = currentLearner();
    els.learnerName.value = learner?.name || "";
    els.learnerId.value = learner?.employeeId || "";
    els.learnerRole.value = learner?.role || "";
    els.backdrop.classList.remove("hidden");
    els.learnerModal.classList.remove("hidden");
    els.backdrop.setAttribute("aria-hidden", "false");
    setTimeout(() => els.learnerName.focus(), 0);
  }

  function closeLearnerModal() {
    els.backdrop.classList.add("hidden");
    els.learnerModal.classList.add("hidden");
    els.backdrop.setAttribute("aria-hidden", "true");
    els.learnerButton.focus();
  }

  function openCourse() {
    const learner = currentLearner();
    if (!learner) return openLearnerModal();
    learnerRecord();
    activeLessonIndex = firstIncompleteLessonIndex();
    els.courseKicker.textContent = course.kicker;
    els.courseTitle.textContent = course.title;
    els.courseModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    renderCourseNav();
    renderLesson();
  }

  function closeCourse() {
    els.courseModal.classList.add("hidden");
    document.body.style.overflow = "";
    renderDashboard();
    document.querySelector('.module-action:not([disabled])')?.focus();
  }

  function firstIncompleteLessonIndex() {
    const idx = course.lessons.findIndex(l => !isLessonDone(l.id));
    return idx === -1 ? 0 : idx;
  }

  function renderCourseNav() {
    const progress = calculateProgress();
    els.courseProgressText.textContent = `${progress}% complete`;
    els.courseProgressBar.style.width = `${progress}%`;
    els.lessonNav.replaceChildren();
    course.lessons.forEach((lesson, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = lesson.title;
      if (index === activeLessonIndex) btn.classList.add("active");
      if (isLessonDone(lesson.id)) btn.classList.add("done");
      btn.addEventListener("click", () => {
        activeLessonIndex = index;
        renderCourseNav();
        renderLesson();
      });
      els.lessonNav.appendChild(btn);
    });
  }

  function renderLesson() {
    const lesson = course.lessons[activeLessonIndex];
    els.lessonContent.innerHTML = lesson.html;

    if (lesson.roleBased) renderRoleScenarios();
    else if (lesson.assessment) renderAssessment();
    else if (lesson.completion) renderCompletion();
    else renderKnowledgeCheck(lesson);

    els.lessonContent.focus();
    setActivity();
  }

  function lessonNavigationHtml({ canComplete = true, completeLabel = "Complete lesson" } = {}) {
    const lesson = course.lessons[activeLessonIndex];
    const prevDisabled = activeLessonIndex === 0;
    const nextDisabled = activeLessonIndex === course.lessons.length - 1;
    const done = isLessonDone(lesson.id);
    return `<div class="lesson-actions">
      <button id="prevLesson" class="secondary-button" type="button" ${prevDisabled ? "disabled" : ""}>Previous</button>
      <div>
        ${!done ? `<button id="completeLesson" class="primary-button" type="button" ${canComplete ? "" : "disabled"}>${escapeHtml(completeLabel)}</button>` : ""}
        <button id="nextLesson" class="secondary-button" type="button" ${nextDisabled ? "disabled" : ""}>Next</button>
      </div>
    </div>`;
  }

  function wireLessonNavigation({ onComplete } = {}) {
    document.getElementById("prevLesson")?.addEventListener("click", () => changeLesson(-1));
    document.getElementById("nextLesson")?.addEventListener("click", () => changeLesson(1));
    document.getElementById("completeLesson")?.addEventListener("click", () => {
      const lesson = course.lessons[activeLessonIndex];
      if (onComplete) onComplete();
      else markLessonDone(lesson.id);
      if (activeLessonIndex < course.lessons.length - 1) changeLesson(1);
      else renderLesson();
    });
  }

  function changeLesson(delta) {
    activeLessonIndex = Math.max(0, Math.min(course.lessons.length - 1, activeLessonIndex + delta));
    renderCourseNav();
    renderLesson();
  }

  function renderKnowledgeCheck(lesson) {
    const inner = els.lessonContent.querySelector(".lesson-inner");
    const check = lesson.check;
    const record = learnerRecord();
    const priorCorrect = record.checks[lesson.id] === true;

    const block = document.createElement("section");
    block.className = "knowledge-check";
    block.innerHTML = `<fieldset><legend>Knowledge check: ${escapeHtml(check.question)}</legend><div class="choice-list">${check.options.map((opt, i) => `<label class="choice-row"><input type="radio" name="check-${lesson.id}" value="${i}" ${priorCorrect && i === check.correct ? "checked" : ""}> <span>${escapeHtml(opt)}</span></label>`).join("")}</div></fieldset><button id="checkAnswer" class="secondary-button" type="button">Check answer</button><div id="checkFeedback" aria-live="polite">${priorCorrect ? `<div class="feedback correct">Correct. ${escapeHtml(check.explanation)}</div>` : ""}</div>`;
    inner.appendChild(block);

    const nav = document.createElement("div");
    nav.innerHTML = lessonNavigationHtml({ canComplete: priorCorrect || isLessonDone(lesson.id), completeLabel: "Complete lesson" });
    inner.appendChild(nav.firstElementChild);

    document.getElementById("checkAnswer").addEventListener("click", () => {
      const selected = inner.querySelector(`input[name="check-${lesson.id}"]:checked`);
      const feedback = document.getElementById("checkFeedback");
      if (!selected) {
        feedback.innerHTML = `<div class="feedback incorrect">Choose an answer first.</div>`;
        return;
      }
      const correct = Number(selected.value) === check.correct;
      record.checks[lesson.id] = correct;
      record.lastActivityAt = isoNow();
      saveState();
      feedback.innerHTML = `<div class="feedback ${correct ? "correct" : "incorrect"}">${correct ? "Correct." : "Not quite."} ${escapeHtml(check.explanation)}</div>`;
      const completeBtn = document.getElementById("completeLesson");
      if (completeBtn && correct) completeBtn.disabled = false;
    });

    wireLessonNavigation();
  }

  function renderRoleScenarios() {
    const learner = currentLearner();
    const record = learnerRecord();
    const scenarios = course.roleScenarios[learner.role] || [];
    const host = document.getElementById("roleScenarioHost");
    const saved = record.roleScenarios[learner.role] || {};

    host.innerHTML = `<div class="notice notice-info"><strong>Your track:</strong> ${escapeHtml(roleLabel(learner.role))}</div>` + scenarios.map((s, idx) => `
      <section class="quiz-question" data-scenario="${idx}">
        <p class="eyebrow">Scenario ${idx + 1}</p>
        <h3>${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.text)}</p>
        <p><strong>${escapeHtml(s.question)}</strong></p>
        <div class="choice-list">${s.options.map((o, i) => `<label class="choice-row"><input type="radio" name="scenario-${idx}" value="${i}" ${saved[idx] === true && i === s.correct ? "checked" : ""}> <span>${escapeHtml(o)}</span></label>`).join("")}</div>
        <button class="secondary-button scenario-check" type="button" data-index="${idx}">Check response</button>
        <div class="scenario-feedback" aria-live="polite">${saved[idx] === true ? `<div class="feedback correct">Correct. ${escapeHtml(s.explanation)}</div>` : ""}</div>
      </section>`).join("");

    const allCorrect = scenarios.every((_, idx) => saved[idx] === true);
    host.insertAdjacentHTML("beforeend", lessonNavigationHtml({ canComplete: allCorrect || isLessonDone("role"), completeLabel: "Complete role practice" }));

    host.querySelectorAll(".scenario-check").forEach(btn => btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.index);
      const scenario = scenarios[idx];
      const section = host.querySelector(`[data-scenario="${idx}"]`);
      const selected = section.querySelector(`input[name="scenario-${idx}"]:checked`);
      const feedback = section.querySelector(".scenario-feedback");
      if (!selected) {
        feedback.innerHTML = `<div class="feedback incorrect">Choose a response first.</div>`;
        return;
      }
      const correct = Number(selected.value) === scenario.correct;
      saved[idx] = correct;
      record.roleScenarios[learner.role] = saved;
      record.lastActivityAt = isoNow();
      saveState();
      feedback.innerHTML = `<div class="feedback ${correct ? "correct" : "incorrect"}">${correct ? "Correct." : "Not quite."} ${escapeHtml(scenario.explanation)}</div>`;
      if (scenarios.every((_, i) => saved[i] === true)) document.getElementById("completeLesson").disabled = false;
    }));

    wireLessonNavigation();
  }

  function buildQuizQuestions() {
    const learner = currentLearner();
    const roleQuestions = (course.roleScenarios[learner.role] || []).map(s => ({ q: `${s.title}: ${s.question}`, options: s.options, correct: s.correct }));
    return [...course.quiz.core, ...roleQuestions];
  }

  function renderAssessment() {
    const host = document.getElementById("quizHost");
    const record = learnerRecord();
    const questions = buildQuizQuestions();

    if (record.passed) {
      host.innerHTML = `<div class="quiz-result"><p class="eyebrow">Passed</p><div class="score">${record.bestScore}%</div><p>Your best score meets the ${catalog.passingScore}% requirement.</p><p>Attempts: ${record.quizAttempts.length}</p></div>${lessonNavigationHtml({ canComplete: true, completeLabel: "Continue" })}`;
      if (!isLessonDone("assessment")) markLessonDone("assessment");
      wireLessonNavigation();
      return;
    }

    host.innerHTML = `<form id="quizForm">${questions.map((q, qi) => `<section class="quiz-question"><h3>${qi + 1}. ${escapeHtml(q.q)}</h3><div class="choice-list">${q.options.map((opt, oi) => `<label class="choice-row"><input type="radio" name="q${qi}" value="${oi}" required> <span>${escapeHtml(opt)}</span></label>`).join("")}</div></section>`).join("")}<button class="primary-button" type="submit">Submit assessment</button></form><div id="quizResultHost" aria-live="polite"></div><div class="lesson-actions"><button id="prevLesson" class="secondary-button" type="button">Previous</button></div>`;

    document.getElementById("prevLesson")?.addEventListener("click", () => changeLesson(-1));
    document.getElementById("quizForm").addEventListener("submit", event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      let correctCount = 0;
      questions.forEach((q, qi) => { if (Number(form.get(`q${qi}`)) === q.correct) correctCount += 1; });
      const score = Math.round((correctCount / questions.length) * 100);
      const passed = score >= catalog.passingScore;
      record.quizAttempts.push({ score, passed, completedAt: isoNow(), questionCount: questions.length });
      record.bestScore = record.bestScore == null ? score : Math.max(record.bestScore, score);
      record.passed = record.passed || passed;
      record.lastActivityAt = isoNow();
      if (passed && !record.lessonsDone.includes("assessment")) record.lessonsDone.push("assessment");
      saveState();
      renderDashboard();
      renderCourseNav();

      document.getElementById("quizResultHost").innerHTML = `<div class="quiz-result"><p class="eyebrow">${passed ? "Passed" : "Retake required"}</p><div class="score">${score}%</div><p>${passed ? `You met the ${catalog.passingScore}% passing requirement.` : `You need ${catalog.passingScore}% to pass. Review the lessons and try again.`}</p><p>Correct answers: ${correctCount} of ${questions.length}</p>${passed ? `<button id="continueAfterQuiz" class="primary-button" type="button">Continue to attestation</button>` : `<button id="retryQuiz" class="secondary-button" type="button">Retake assessment</button>`}</div>`;
      document.getElementById(passed ? "continueAfterQuiz" : "retryQuiz").addEventListener("click", () => passed ? changeLesson(1) : renderAssessment());
    });
  }

  function renderCompletion() {
    const host = document.getElementById("completionHost");
    const learner = currentLearner();
    const record = learnerRecord();

    if (!record.passed) {
      host.innerHTML = `<div class="notice notice-warning">You must pass the final assessment before completing the attestation.</div>${lessonNavigationHtml({ canComplete: false, completeLabel: "Complete training" })}`;
      wireLessonNavigation();
      return;
    }

    if (record.completedAt) {
      host.innerHTML = certificateHtml(learner, record);
      document.getElementById("printCertificate")?.addEventListener("click", () => window.print());
      const prev = document.createElement("div");
      prev.innerHTML = `<div class="lesson-actions"><button id="prevLesson" class="secondary-button" type="button">Previous</button><button id="exitTraining" class="primary-button" type="button">Return to dashboard</button></div>`;
      host.appendChild(prev.firstElementChild);
      document.getElementById("prevLesson").addEventListener("click", () => changeLesson(-1));
      document.getElementById("exitTraining").addEventListener("click", closeCourse);
      return;
    }

    host.innerHTML = `<label class="ack-row"><input id="attestationCheck" type="checkbox"><span>I acknowledge that I have completed this training, understand that clinic policy and current law govern my work, will access and disclose patient information only as permitted for my role, and will promptly report privacy/security questions or incidents through the clinic’s designated process.</span></label><button id="completeTraining" class="primary-button" type="button" disabled>Complete Module 1.1</button><div class="source-list"><strong>Regulatory references used for this draft:</strong><ul>${course.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.label)}</a></li>`).join("")}</ul><p>Course version: ${escapeHtml(catalog.version)} • Content review date: ${escapeHtml(catalog.reviewed)}</p></div><div class="lesson-actions"><button id="prevLesson" class="secondary-button" type="button">Previous</button></div>`;

    const checkbox = document.getElementById("attestationCheck");
    const complete = document.getElementById("completeTraining");
    checkbox.addEventListener("change", () => { complete.disabled = !checkbox.checked; });
    document.getElementById("prevLesson").addEventListener("click", () => changeLesson(-1));
    complete.addEventListener("click", () => {
      const timestamp = isoNow();
      record.attestedAt = timestamp;
      record.completedAt = timestamp;
      if (!record.lessonsDone.includes("completion")) record.lessonsDone.push("completion");
      record.lastActivityAt = timestamp;
      saveState();
      renderDashboard();
      renderCourseNav();
      renderCompletion();
    });
  }

  function certificateHtml(learner, record) {
    return `<div class="certificate"><p class="eyebrow">Inclusive Health Employee Learning Center</p><h2>Certificate of Completion</h2><p>This certifies that</p><div class="certificate-name">${escapeHtml(learner.name)}</div><p>completed</p><h3>Module 1.1 — HIPAA, WA Privacy, 42 CFR Part 2 &amp; Minor Privacy</h3><p>Final assessment: <strong>${record.bestScore}%</strong></p><p>Completed: <strong>${escapeHtml(formatDate(record.completedAt))}</strong></p><p>Course version: ${escapeHtml(record.courseVersion)}</p><button id="printCertificate" class="secondary-button" type="button">Print certificate</button></div>`;
  }

  function exportCsv() {
    const learner = currentLearner();
    const record = learnerRecord();
    if (!learner || !record) return;
    const attempts = record.quizAttempts.map((a, i) => `Attempt ${i + 1}: ${a.score}% (${a.passed ? "Pass" : "Fail"}) ${formatDate(a.completedAt)}`).join(" | ");
    const rows = [
      ["Employee Name", learner.name],
      ["Employee ID / Initials", learner.employeeId || ""],
      ["Role", roleLabel(learner.role)],
      ["Module", "1.1 HIPAA, WA Privacy, 42 CFR Part 2 & Minor Privacy"],
      ["Course Version", record.courseVersion],
      ["Progress", `${calculateProgress()}%`],
      ["Best Score", record.bestScore == null ? "" : `${record.bestScore}%`],
      ["Assessment Attempts", attempts],
      ["Attested", record.attestedAt ? "Yes" : "No"],
      ["Attestation Date", formatDate(record.attestedAt)],
      ["Completed", record.completedAt ? "Yes" : "No"],
      ["Completion Date", formatDate(record.completedAt)],
      ["Last Activity", formatDate(record.lastActivityAt)],
      ["Tracking Note", "Exported from browser-local training record; not a centralized LMS record."]
    ];
    const csv = rows.map(row => row.map(cell => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `InclusiveHealth_Module1.1_${learner.name.replace(/[^a-z0-9]+/gi, "_")}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function resetLearnerRecord() {
    const learner = currentLearner();
    if (!learner) return;
    const ok = window.confirm(`Reset all Module 1.1 training progress for ${learner.name}? This cannot be undone unless you exported the record.`);
    if (!ok) return;
    learner.records["1.1"] = blankRecord();
    saveState();
    renderDashboard();
  }

  els.learnerButton.addEventListener("click", openLearnerModal);
  els.backdrop.addEventListener("click", closeLearnerModal);
  els.learnerModal.querySelectorAll("[data-close-modal]").forEach(btn => btn.addEventListener("click", closeLearnerModal));
  els.courseModal.querySelectorAll("[data-close-course]").forEach(btn => btn.addEventListener("click", closeCourse));
  els.exportCsvButton.addEventListener("click", exportCsv);
  els.resetButton.addEventListener("click", resetLearnerRecord);

  els.learnerForm.addEventListener("submit", event => {
    event.preventDefault();
    const name = els.learnerName.value.trim();
    const employeeId = els.learnerId.value.trim();
    const role = els.learnerRole.value;
    if (!name || !role) return;
    const key = makeLearnerKey(name, employeeId);
    const existing = state.learners[key];
    state.learners[key] = {
      name,
      employeeId,
      role,
      createdAt: existing?.createdAt || isoNow(),
      updatedAt: isoNow(),
      records: existing?.records || { "1.1": blankRecord() }
    };
    state.currentLearnerKey = key;
    saveState();
    closeLearnerModal();
    renderDashboard();
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (!els.learnerModal.classList.contains("hidden")) closeLearnerModal();
    else if (!els.courseModal.classList.contains("hidden")) closeCourse();
  });

  renderDashboard();
})();
