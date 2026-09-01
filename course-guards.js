(() => {
  "use strict";

  const STORAGE_KEY = "inclusiveHealthTraining.module1.v1";
  const prerequisites = ["foundations", "uses", "washington", "part2", "minors", "security", "breach", "role"];

  function currentRecord() {
    try {
      const state = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const learner = state?.learners?.[state?.currentLearnerKey];
      return learner?.records?.["1.1"] || null;
    } catch {
      return null;
    }
  }

  function missing(ids) {
    const record = currentRecord();
    const done = new Set(record?.lessonsDone || []);
    return ids.filter(id => !done.has(id));
  }

  document.addEventListener("submit", event => {
    if (event.target?.id !== "quizForm") return;
    const incomplete = missing(prerequisites);
    if (!incomplete.length) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    const host = document.getElementById("quizResultHost");
    if (host) {
      host.innerHTML = `<div class="notice notice-warning"><strong>Finish the course lessons first.</strong> The final assessment unlocks after all seven core lessons and your role-based practice are complete.</div>`;
      host.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, true);

  document.addEventListener("click", event => {
    const button = event.target.closest?.("#completeTraining");
    if (!button) return;
    const incomplete = missing([...prerequisites, "assessment"]);
    if (!incomplete.length) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    const host = document.getElementById("completionHost");
    if (host) {
      const message = document.createElement("div");
      message.className = "notice notice-warning";
      message.innerHTML = "<strong>Training is not complete yet.</strong> Complete all lessons and pass the final assessment before attesting.";
      host.prepend(message);
      message.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, true);
})();
