(() => {
  "use strict";
  const STORAGE_KEY = "inclusiveHealthTraining.module1.v1";

  function getState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  }

  function currentLearner() {
    const state = getState();
    return state.currentLearnerKey ? state.learners?.[state.currentLearnerKey] : null;
  }

  function record12() {
    return currentLearner()?.records?.["1.2"] || null;
  }

  function enhanceModule12Card() {
    const cards = [...document.querySelectorAll(".module-card")];
    const card = cards.find(c => c.querySelector(".module-number")?.textContent.trim() === "Module 1.2");
    if (!card) return;

    const button = card.querySelector(".module-action");
    const status = card.querySelector(".module-status");
    if (!button || !status) return;

    const learner = currentLearner();
    const rec = record12();
    const started = !!rec && ((rec.lessonsDone?.length || 0) > 0 || (rec.quizAttempts?.length || 0) > 0);
    const complete = !!rec?.completedAt;

    if (!learner) {
      button.disabled = true;
      button.textContent = "Set learner first";
      status.textContent = "Ready after learner setup";
      return;
    }

    button.disabled = false;
    button.textContent = complete ? "Review course" : started ? "Resume course" : "Start course";
    status.textContent = complete ? "Complete" : started ? "In progress" : "Ready";
    status.className = `module-status pill ${complete ? "complete" : started ? "progress" : "ready"}`;

    if (!button.dataset.module12Bound) {
      button.dataset.module12Bound = "true";
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.href = "module12.html";
      }, true);
    }
  }

  function addContinueButton() {
    const certificate = document.querySelector(".certificate");
    if (!certificate || certificate.querySelector("[data-module12-next]")) return;
    const state = getState();
    const learner = state.currentLearnerKey ? state.learners?.[state.currentLearnerKey] : null;
    if (!learner?.records?.["1.1"]?.completedAt) return;

    const button = document.createElement("a");
    button.href = "module12.html";
    button.className = "primary-button";
    button.dataset.module12Next = "true";
    button.textContent = "Continue to Module 1.2";
    button.style.marginLeft = "10px";
    certificate.appendChild(button);
  }

  function enhance() {
    enhanceModule12Card();
    addContinueButton();
  }

  enhance();
  const observer = new MutationObserver(enhance);
  observer.observe(document.body, { childList: true, subtree: true });
})();
