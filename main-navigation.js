(() => {
  "use strict";

  const STORAGE_KEY = "inclusiveHealthTraining.module1.v1";
  const routes = {
    "1.2": "module12.html",
    "1.3": "module-hub.html?m=1.3",
    "1.4": "module-hub.html?m=1.4",
    "1.5": "module-hub.html?m=1.5",
    "1.6": "module-hub.html?m=1.6",
    "1.7": "module-hub.html?m=1.7",
    "1.8": "module-hub.html?m=1.8",
    "1.9": "module-hub.html?m=1.9",
    "1.10": "module-hub.html?m=1.10",
    "1.11": "module-hub.html?m=1.11"
  };

  function getState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function currentLearner() {
    const state = getState();
    return state.currentLearnerKey ? state.learners?.[state.currentLearnerKey] : null;
  }

  function moduleRecord(id) {
    return currentLearner()?.records?.[id] || null;
  }

  function openLearnerSetup() {
    document.getElementById("learnerButton")?.click();
  }

  function wireCards() {
    document.querySelectorAll(".module-card").forEach(card => {
      const number = card.querySelector(".module-number")?.textContent.trim() || "";
      const match = number.match(/^Module\s+(1\.\d+)$/);
      if (!match) return;

      const id = match[1];
      const button = card.querySelector(".module-action");
      const status = card.querySelector(".module-status");
      if (!button || !status) return;

      // Keep every dashboard action label consistent, regardless of progress state.
      button.textContent = "Begin Module";

      // Module 1.1 keeps its existing app.js click handler.
      if (id === "1.1") return;

      const route = routes[id];
      if (!route) return;

      const record = moduleRecord(id);
      const complete = !!record?.completedAt;
      const started = !!record && ((record.lessonsDone?.length || 0) > 0 || (record.quizAttempts?.length || 0) > 0);

      button.disabled = false;
      status.textContent = complete ? "Complete" : started ? "In progress" : "Ready";
      status.className = `module-status pill ${complete ? "complete" : started ? "progress" : "ready"}`;

      if (button.dataset.mainNavBound === "true") return;
      button.dataset.mainNavBound = "true";
      button.addEventListener("click", () => {
        if (!currentLearner()) {
          openLearnerSetup();
          return;
        }
        window.location.href = route;
      });
    });
  }

  // app.js renders the cards synchronously before this file loads.
  wireCards();

  // Re-wire only when app.js replaces dashboard cards (for example after changing learner).
  const grid = document.getElementById("moduleGrid");
  if (grid) {
    const observer = new MutationObserver(() => wireCards());
    observer.observe(grid, { childList: true });
  }
})();
