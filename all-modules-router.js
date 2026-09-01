(() => {
  "use strict";

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

  function currentLearnerExists() {
    try {
      const state = JSON.parse(localStorage.getItem("inclusiveHealthTraining.module1.v1"));
      return !!(state?.currentLearnerKey && state?.learners?.[state.currentLearnerKey]);
    } catch {
      return false;
    }
  }

  function activateCards() {
    const cards = [...document.querySelectorAll(".module-card")];

    cards.forEach(card => {
      const numberText = card.querySelector(".module-number")?.textContent.trim() || "";
      const match = numberText.match(/^Module\s+(1\.\d+)$/);
      if (!match) return;

      const id = match[1];
      if (!routes[id]) return;

      const button = card.querySelector(".module-action");
      const status = card.querySelector(".module-status");
      if (!button || !status) return;

      button.disabled = false;
      button.textContent = id === "1.2" ? button.textContent.replace("Coming next", "Start course") : "Open module";

      if (id !== "1.2") {
        status.textContent = "Active";
        status.className = "module-status pill ready";
      }

      if (!button.dataset.allModulesBound) {
        button.dataset.allModulesBound = "true";
        button.addEventListener("click", event => {
          event.preventDefault();
          event.stopImmediatePropagation();

          if (!currentLearnerExists()) {
            const learnerButton = document.getElementById("learnerButton");
            learnerButton?.click();
            return;
          }

          window.location.href = routes[id];
        }, true);
      }
    });
  }

  activateCards();
  const observer = new MutationObserver(activateCards);
  observer.observe(document.body, { childList: true, subtree: true });
})();