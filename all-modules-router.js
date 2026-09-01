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

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function setClass(node, value) {
    if (node && node.className !== value) node.className = value;
  }

  function activateCards() {
    const cards = document.querySelectorAll(".module-card");

    cards.forEach(card => {
      const numberText = card.querySelector(".module-number")?.textContent.trim() || "";
      const match = numberText.match(/^Module\s+(1\.\d+)$/);
      if (!match) return;

      const id = match[1];
      const route = routes[id];
      if (!route) return;

      const button = card.querySelector(".module-action");
      const status = card.querySelector(".module-status");
      if (!button || !status) return;

      if (button.disabled) button.disabled = false;

      if (id === "1.2") {
        if (button.textContent === "Coming next") setText(button, "Start course");
        if (status.textContent === "Curriculum loaded") {
          setText(status, "Ready");
          setClass(status, "module-status pill ready");
        }
      } else {
        setText(button, "Open module");
        setText(status, "Active");
        setClass(status, "module-status pill ready");
      }

      if (button.dataset.allModulesBound === "true") return;
      button.dataset.allModulesBound = "true";
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (!currentLearnerExists()) {
          document.getElementById("learnerButton")?.click();
          return;
        }

        window.location.assign(route);
      }, true);
    });
  }

  activateCards();

  const grid = document.getElementById("moduleGrid");
  if (grid) {
    const observer = new MutationObserver(() => activateCards());
    observer.observe(grid, { childList: true, subtree: true });
  }
})();