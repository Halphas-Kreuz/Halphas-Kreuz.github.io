(function () {
  var mount = document.getElementById("l2d");
  var toggle = document.getElementById("l2d-toggle");
  if (!mount || !toggle) return;

  // ---- Config (Cubism 2) ----
  // Put your model files under assets/your_model/ and ensure model.json paths are correct.
  // Compute the correct URL based on where this script is hosted (works for GitHub Pages project sites too).
  var scriptUrl = (document.currentScript && document.currentScript.src) || "";
  var assetsBase = scriptUrl ? new URL(".", scriptUrl) : new URL("./assets/", document.baseURI);
  var MODEL_JSON = new URL("your_model/model.json", assetsBase).toString();
  var WIDTH = 320;
  var HEIGHT = 480;
  var SCRIPT_SRC = "https://unpkg.com/live2d-widget@3.1.4/lib/L2Dwidget.min.js";

  function setHidden(isHidden) {
    if (isHidden) mount.classList.add("hidden");
    else mount.classList.remove("hidden");
    try {
      localStorage.setItem("l2d:hidden", isHidden ? "1" : "0");
    } catch {}
  }

  function getHidden() {
    try {
      return localStorage.getItem("l2d:hidden") === "1";
    } catch {
      return false;
    }
  }

  function loadScriptOnce(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[data-live2d="1"]')) return resolve();
      var s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.dataset.live2d = "1";
      s.onload = function () {
        resolve();
      };
      s.onerror = function () {
        reject(new Error("Failed to load: " + src));
      };
      document.head.appendChild(s);
    });
  }

  function init() {
    mount.innerHTML = "";
    if (!window.L2Dwidget || !window.L2Dwidget.init) return;

    window.L2Dwidget.init({
      model: { jsonPath: MODEL_JSON, scale: 1 },
      display: {
        position: "right",
        width: WIDTH,
        height: HEIGHT,
        hOffset: 0,
        vOffset: 0,
      },
      mobile: { show: true, scale: 1, motion: true },
      react: { opacityDefault: 1, opacityOnHover: 1 },
    });
  }

  // Restore state
  setHidden(getHidden());

  toggle.addEventListener("click", function () {
    setHidden(!mount.classList.contains("hidden"));
  });

  // Lazy load widget
  loadScriptOnce(SCRIPT_SRC)
    .then(init)
    .catch(function (e) {
      // Silent fail: page should still work as an "old website" even if CDN is blocked.
      console.warn(e);
    });
})();
