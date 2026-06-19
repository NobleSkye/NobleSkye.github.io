const openWindows = new Set();
let zIndexCounter = 500;

/*function bringToFront(id) {
  const w = document.getElementById(id);
  if (!w) return;
  zIndexCounter++;
  w.style.zIndex = zIndexCounter;
  document.querySelectorAll(".window").forEach((win) => {
    const bar = win.querySelector(".title-bar");
    if (bar) bar.classList.toggle("inactive", win.id !== id);
  });
}*/

/*function doWin(action,id) {
  const a = document.getElementById(id);
  const b = a.classList;
  switch(action) {
    default:
    case "open":
      b.remove("minimized", "closed");
      if(!openWindows.has(id)) {
        openWindows.add(id);
        addTaskbar(id);
      }
      activateTaskbar(id);
      bringToFront(id);
    break;
    case "minimize":
      b.add("minimized");
      deactivateTaskbar(id);
    break;
    case "close":
      b.add("closed", "minimized");
      openWindows.delete(id);
      removeTaskbarItem(id);
      if(id==="player-window") {
        const audio = document.getElementById("audio-player");
        if(!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        }
        document.getElementById("play-btn").textContent = "Play";
        document.querySelector("#player-window .player-status").textContent = "Ready";
        document.getElementById("seek-bar").value = 0;
      }
    break;
    case "toggle":
      switch(true){
        case b.contains("minimized") || b.contains("closed"):
          doWin("open",id);
        break;
        case a.style.zIndex == zIndexCounter:
          doWin("minimize",id);
        break;
        default:
          bringToFront(id);
        break;
      }
    break;
  }
}*/

/*class Taskbar extends Win {// KittenKatja: Extensions of Win to have access to id and getters
  constructor() {
    this.label = this.a.dataset.label || id;
    this.icon = this.a.dataset.icon || "";
    this.container = document.getElementById("taskbar-items");
    this.btn = document.getElementById("button");
  }

  get itemAdd() {
    this.btn.className = "taskbar-item active";
    this.btn.id = "tb-" + id;
    this.btn.onclick = () => this.toggle;
    this.btn.oncontextmenu = e => {
      showContextMenu(e, [{ label: "close", action: () => this.close }]);
    }
    if(this.icon) {
      const img = document.createElement("img");
      img.src = this.icon;
      img.style.width = "16px";//can't CSS take this over?
      img.style.height = "16px";
      img.style.marginRight = "4px";
      img.style.imageRendering = "auto";
      this.btn.appendChild(img);
    }
    this.btn.appendChild(document.createTextNode(this.label));
    this.container.appendChild(this.btn);
  }

  get itemRemove() {
    if(this.btn)this.btn.remove();
  }

  get itemActivate() {
    if(this.btn)this.btn.classList.add("active");
  }

  get itemDeactivate() {
    if(this.btn)this.btn.classList.remove("active");
  }
}*/

// By KittenKatja - "Very experimental with lots of learning involved and minimizing DOM lookups."
//##################################################################################################
// Usage: const w = new Win(<id>);w.open; or Win(<id>).open; as single action
// Usage: const t = new Win(<id>).taskbar;t.itemAdd; or Win(<id>).taskbar.itemAdd; as single action

class Win {
  constructor(id) {
    this.a = document.getElementById(id);
    this.b = a.classList;
    this._taskbar = null;
  }
  
  get open() {
    this.b.remove("minimized", "closed");
    const t = this.taskbar;
    if(!openWindows.has(id)) {
      openWindows.add(id);
      t.itemAdd;
    }
    t.activate;
    t.bringToFront;
  }
  
  get minimize() {
    this.b.add("minimized");
    this.taskbar.deactivate;
  }
  
  get close() {
    this.b.add("closed", "minimized");
    openWindows.delete(id);
    this.taskbar.itemRemove;
    if(id==="player-window") {
      const audio = document.getElementById("audio-player");
      if(!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
      document.getElementById("play-btn").textContent = "Play";
      document.querySelector("#player-window .player-status").textContent = "Ready";
      document.getElementById("seek-bar").value = 0;
    }
  }
  
  get toggle() {
    const t = this.taskbar;
    switch(true) {
      case this.b.contains("minimized") || this.b.contains("closed"):
        this.open;
      break;
      case this.a.style.zIndex == zIndexCounter:
        t.minimize;
      break;
      default:
        this.bringToFront;
    }
  }

  get bringToFront() {
    if(!this.a) return;
    this.a.style.zIndex = ++zIndexCounter;
    document.querySelectorAll(".window").forEach((win) => {
      const bar = win.querySelector(".title-bar");
      if(bar) bar.classList.toggle("inactive", win.id !== id);
    });
  }

  get taskbar() {
    if(!this._taskbar) return {
      this.tb.label = this.a.dataset.label || id;
      this.tb.icon = this.a.dataset.icon || "";
      this.tb.container = document.getElementById("taskbar-items");
      this.tb.btn = document.getElementById("button");

      get itemAdd() {
        this.tb.btn.className = "taskbar-item active";
        this.tb.btn.id = "tb-" + id;
        this.tb.btn.onclick = () => this.toggle;
        this.tb.btn.oncontextmenu = e => {
          showContextMenu(e, [{ label: "close", action: () => this.close }]);
        }
        if(this.tb.icon) {
          const img = document.createElement("img");
          img.src = this.tb.icon;
          img.style.width = "16px";//can't CSS take this over?
          img.style.height = "16px";
          img.style.marginRight = "4px";
          img.style.imageRendering = "auto";
          this.taskbar.btn.appendChild(img);
        }
        this.tb.btn.appendChild(document.createTextNode(this.taskbar.label));
        this.tb.container.appendChild(this.taskbar.btn);
      }

      get itemRemove() {
        if(this.tb.btn)this.tb.btn.remove();
      }

      get itemActivate() {
        if(this.tb.btn)this.tb.btn.classList.add("active");
      }

      get itemDeactivate() {
        if(this.tb.btn)this.tb.btn.classList.remove("active");
      }
    }
  }
}

/*function openWin(id) {
  const w = document.getElementById(id);
  w.classList.remove("minimized", "closed");
  if (!openWindows.has(id)) {
    openWindows.add(id);
    addTaskbarItem(id);
  }
  activateTaskbar(id);
  bringToFront(id);
}

function minimizeWin(id) {
  document.getElementById(id).classList.add("minimized");
  deactivateTaskbar(id);
}

function closeWin(id) {
  document.getElementById(id).classList.add("closed", "minimized");
  openWindows.delete(id);
  removeTaskbarItem(id);
  if (id === "player-window") {
    const audio = document.getElementById("audio-player");
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
    document.getElementById("play-btn").textContent = "Play";
    document.querySelector("#player-window .player-status").textContent =
      "Ready";
    document.getElementById("seek-bar").value = 0;
  }
}

function toggleWin(id) {
  const w = document.getElementById(id);
  if (w.classList.contains("minimized") || w.classList.contains("closed")) {
    openWin(id);
  } else if (w.style.zIndex == zIndexCounter) {
    minimizeWin(id);
  } else {
    bringToFront(id);
  }
}*/

function showContextMenu(e, items) {
  e.preventDefault();
  const menu = document.getElementById("context-menu");
  menu.innerHTML = "";
  items.forEach((item) => {
    const btn = document.createElement("button");
    btn.textContent = item.label;
    if (item.disabled) btn.disabled = true;
    btn.onclick = (ev) => {
      ev.stopPropagation();
      menu.classList.add("hidden");
      item.action();
    };
    menu.appendChild(btn);
  });
  menu.style.left = e.clientX + "px";
  menu.style.top = e.clientY + "px";
  menu.classList.remove("hidden");
}

function showDesktopMenu(e, name, icon, openAction) {
  showContextMenu(e, [{ label: "Open", action: openAction }]);
}

/*function addTaskbarItem(id) {
  const w = document.getElementById(id);
  const label = w.dataset.label || id;
  const icon = w.dataset.icon || "";
  const container = document.getElementById("taskbar-items");
  const btn = document.createElement("button");
  btn.className = "taskbar-item active";
  btn.id = "tb-" + id;
  btn.onclick = () => toggleWin(id);
  btn.oncontextmenu = (e) => {
    showContextMenu(e, [{ label: "Close", action: () => closeWin(id) }]);
  }
  if (icon) {
    const img = document.createElement("img");
    img.src = icon;
    img.style.width = "16px";
    img.style.height = "16px";
    img.style.marginRight = "4px";
    img.style.imageRendering = "auto";
    btn.appendChild(img);
  }
  btn.appendChild(document.createTextNode(label));
  container.appendChild(btn);
}

function removeTaskbarItem(id) {
  const btn = document.getElementById("tb-" + id);
  if (btn) btn.remove();
}

function activateTaskbar(id) {
  const btn = document.getElementById("tb-" + id);
  if (btn) btn.classList.add("active");
}

function deactivateTaskbar(id) {
  const btn = document.getElementById("tb-" + id);
  if (btn) btn.classList.remove("active");
}*/

function tetrisError() {
  document.getElementById("error-dialog").classList.remove("hidden");
}

function closeError() {
  document.getElementById("error-dialog").classList.add("hidden");
}

function driverInstall() {
  document.getElementById("error-dialog2").classList.remove("hidden");
}

function closeError2() {
  document.getElementById("error-dialog2").classList.add("hidden");
}

function maximizeBrowser() {
  document.getElementById("browser-window").classList.toggle("browser-maximized");
}

function browseBack() {}
function browseFwd() {}

function browseRefresh() {
  document.getElementById("browser-frame").src = "home/index.html";
  document.getElementById("browser-url").value = "https://nobleskye.dev/";
}

function notImpl(name) {
  alert(name + " is not implemented yet.");
}

function openPlayer() {
  Win("player-window").open;
  setTimeout(() => {
    const audio = document.getElementById("audio-player");
    if (audio.paused) {
      audio.play();
      document.getElementById("play-btn").textContent = "Pause";
      document.querySelector("#player-window .player-status").textContent = "Playing";
    }
  }, 100);
}

function playPause() {
  const audio = document.getElementById("audio-player");
  const btn = document.getElementById("play-btn");
  if (audio.paused) {
    audio.play();
    btn.textContent = "Pause";
    document.querySelector("#player-window .player-status").textContent = "Playing";
  } else {
    audio.pause();
    btn.textContent = "Play";
    document.querySelector("#player-window .player-status").textContent = "Paused";
  }
}

function seekAudio() {
  document.getElementById("audio-player").currentTime = document.getElementById("seek-bar").value;
}

function makeDraggable(winId) {
  const win = document.getElementById(winId);
  const bar = win.querySelector(".title-bar");
  let offX, offY;
  bar.addEventListener("mousedown", function (e) {
    Win(winId).bringToFront;
    if (e.target.closest(".title-bar-controls")) return;
    offX = e.clientX - win.offsetLeft;
    offY = e.clientY - win.offsetTop;
    win.style.position = "fixed";
    win.style.left = win.offsetLeft + "px";
    win.style.top = win.offsetTop + "px";
    win.style.margin = "0";
    const mousemove = (ev) => {
      win.style.left = Math.max(0, ev.clientX - offX) + "px";
      win.style.top = Math.max(0, ev.clientY - offY) + "px";
    };
    const mouseup = () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };
    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  });
}

function runSteam() {
  const a = document.createElement("a");
  a.href = "steam://run/2379780";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  document.getElementById("taskbar-time").textContent =
    h + ":" + m + " " + ampm;
}

document.addEventListener("click", () => {
  document.getElementById("context-menu").classList.add("hidden");
});

window.addEventListener("load", () => {
  makeDraggable("balatro-window");
  makeDraggable("profile-window");
  makeDraggable("hang-window");
  makeDraggable("player-window");
  makeDraggable("browser-window");
  makeDraggable("error-dialog");
  makeDraggable("error-dialog2");

  updateClock();
  setInterval(updateClock, 10000);

  Win("profile-window").open;
  Win("browser-window").open;

  const path = window.location.pathname.replace(/\/$/, "");
  if (path.match(/\/(?:home\/)?certs(?:\.html)?$/)) {
    document.getElementById("browser-frame").src = "home/certs.html";
    document.getElementById("browser-url").value = "https://nobleskye.dev/certs";
  }

  document.getElementById("balatro").addEventListener("click", () => Win("balatro-window").open);
  document.getElementById("balatro").addEventListener("dblclick", runSteam);
  document.getElementById("balatro").addEventListener("contextmenu", (e) =>
    showDesktopMenu(
      e,
      "Balatro",
      "public/desktop/balatro/balatro-logo.png",
      () => runSteam(),
    ),
  );

  document.getElementById("tetris").addEventListener("click", tetrisError);
  document.getElementById("tetris").addEventListener("contextmenu", (e) =>
    showDesktopMenu(
      e,
      "Tetris",
      "public/desktop/tetris/tetris.png",
      tetrisError,
    ),
  );

  document.getElementById("epic").addEventListener("click", openPlayer);
  document.getElementById("epic").addEventListener("contextmenu", (e) =>
    showDesktopMenu(
      e,
      "epic.mp3",
      "public/desktop/shortcuts/audio_compression-1.png",
      openPlayer,
    ),
  );

  document.getElementById("profile").addEventListener("click", () => Win("profile-window").open);
  document.getElementById("profile").addEventListener("contextmenu", (e) =>
    showDesktopMenu(
      e,
      "profile.jpg",
      "public/desktop/shortcuts/paint_file-1.png",
      () => Win("profile-window").open,
    ),
  );

  document.getElementById("hang_in_there").addEventListener("click", () => Win("hang-window").open);
  document.getElementById("hang_in_there").addEventListener("contextmenu", (e) =>
    showDesktopMenu(
      e,
      "hang_in_there.png",
      "public/desktop/shortcuts/paint_file-1.png",
      () => Win("hang-window").open,
    ),
  );

  document.getElementById("browser").addEventListener("click", () => Win("browser-window").open);
  document.getElementById("browser").addEventListener("contextmenu", (e) =>
    showDesktopMenu(
      e,
      "Internet Explorer",
      "public/desktop/shortcuts/msie2-1.png",
      () => Win("browser-window").open,
    ),
  );

  document.getElementById("driver_install").addEventListener("click", driverInstall);
  document.getElementById("driver_install").addEventListener("contextmenu", (e) =>
    showDesktopMenu(
      e,
      "AGP Driver Install",
      "public/desktop/shortcuts/installer_generic_old-1.png",
      driverInstall,
    ),
  );

  document.getElementById("screenshot").addEventListener("click", () => notImpl("Image"));
  document.getElementById("screenshot").addEventListener("contextmenu", (e) =>
    showDesktopMenu(
      e,
      "Screenshot",
      "public/desktop/shortcuts/imagjpeg-1.png",
      () => notImpl("Image"),
    ),
  );

  document.querySelectorAll(".window .title-bar-controls").forEach((controls) => {
    const w = new Win(win.id);
    controls.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const win = btn.closest(".window");
      if (!win) return;
      const label = btn.getAttribute("aria-label");
      if (label === "Minimize") w.minimize;
      else if (label === "Close") w.close;
    });
  });

  document.getElementById("browse-back").addEventListener("click", browseBack);
  document.getElementById("browse-fwd").addEventListener("click", browseFwd);
  document.getElementById("browse-refresh").addEventListener("click", browseRefresh);

  document.getElementById("browser-url").addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const input = this.value.trim();
    const f = document.getElementById("browser-frame");
    let path = input.replace(/^https?:\/\/(?:www\.)?(?:98\.)?nobleskye\.dev\//, "").replace(/^https?:\/\/[^\/]+/, "");
    if (!path || path.startsWith("http://") || path.startsWith("https://")) {
      f.src = "home/index.html";
      this.value = "https://nobleskye.dev/";
      return;
    }
    path = path.replace(/^\//, "");
    if (path && !path.includes(".")) path = "home/" + path + ".html";
    f.src = path || "home/index.html";
    this.value = !path || path === "home/index.html" ? "https://nobleskye.dev/" : "https://nobleskye.dev/" + path.replace(/^home\//, "").replace(/\.html$/, "");
  });

  document.getElementById("browser-frame").addEventListener("load", function () {
    try {
      const path = this.contentWindow.location.href.replace(/^https?:\/\/[^\/]+/, "",);
      const display = path.replace(/^\/home\//, "/").replace(/\.html$/, "");
      document.getElementById("browser-url").value = path === "/" || path === "/home/index.html" ? "https://nobleskye.dev/" : "https://nobleskye.dev" + display;
    } catch (e) {
      document.getElementById("browser-url").value = "https://nobleskye.dev/";
    }
  });

  document.getElementById("play-btn").addEventListener("click", playPause);
  document.getElementById("seek-bar").addEventListener("input", seekAudio);

  document.getElementById("audio-player").addEventListener("timeupdate", function () {
    const seek = document.getElementById("seek-bar");
    const audio = document.getElementById("audio-player");
    if (audio.duration) {
      seek.max = audio.duration;
      seek.value = audio.currentTime;
    }
  });

  document.getElementById("audio-player").addEventListener("ended", function () {
    document.getElementById("play-btn").textContent = "Play";
    document.querySelector("#player-window .player-status").textContent = "Ready";
    document.getElementById("seek-bar").value = 0;
  });

  document.querySelectorAll("#error-dialog .ok-btn, #error-dialog2 .ok-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const win = btn.closest(".window");
      if (win.id === "error-dialog") closeError();
      else closeError2();
    });
  });
});
