const openWindows = new Set();

function openWin(id) {// Optimized by KittenKatja
    document.getElementById(id).classList.remove("minimized", "closed");
    if (!openWindows.has(id)) {
        openWindows.add(id);
        addTaskbarItem(id);
    }
    activateTaskbar(id);
}

function minimizeWin(id) {// Optimized by KittenKatja
    document.getElementById(id).classList.add("minimized");
    deactivateTaskbar(id);
}

function closeWin(id) {// Optimized by KittenKatja
    document.getElementById(id).classList.add("closed", "minimized");
    openWindows.delete(id);
    removeTaskbarItem(id);
}

function toggleWin(id) {// Changed a bit by KittenKatja
    const w = document.getElementById(id).classList;
    if (w.contains("minimized") || w.contains("closed")) {
        openWin(id);
    } else {
        minimizeWin(id);
    }
}

function addTaskbarItem(id) {
    const w = document.getElementById(id);
    const label = w.dataset.label || id;
    const icon = w.dataset.icon || "";
    const container = document.getElementById("taskbar-items");
    const btn = document.createElement("button");
    btn.className = "taskbar-item active";
    btn.id = "tb-" + id;
    btn.onclick = () => toggleWin(id);
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
}

function tetrisError() {// KittenKatja: Removed Indent
    document.getElementById("error-dialog").classList.remove("hidden");
}

function closeError() {
    document.getElementById("error-dialog").classList.add("hidden");
}

function driverInstall() {// KittenKatja: Removed Indent
    document.getElementById("error-dialog2").classList.remove("hidden");
}

function closeError2() {// KittenKatja: Removed Indent
    document.getElementById("error-dialog2").classList.add("hidden");
}

function maximizeBrowser() {// Optimized by KittenKatja
    document.getElementById("browser-window").classList.toggle("browser-maximized");
}

function browseBack() {// Optimized by KittenKatja
    try {
        document.getElementById("browser-frame").contentWindow.goBack();
    } catch (e) {}
}

function browseFwd() {// Optimized by KittenKatja
    try {
        document.getElementById("browser-frame").contentWindow.goFwd();
    } catch (e) {}
}

function browseRefresh() {// Optimized by KittenKatja
    try {
        document.getElementById("browser-frame").contentWindow.refresh();
    } catch (e) {}
}

function notImpl(name) {
    alert(name + " is not implemented yet.");
}

function openPlayer() {
    openWin("player-window");
    setTimeout(() => {
        const audio = document.getElementById("audio-player");
        if (audio.paused) {
            audio.play();
            document.getElementById("play-btn").textContent = "Pause";
            document.querySelector("#player-window .player-status",).textContent = "Playing";
        }
    }, 100);
}

function playPause() {
    const audio = document.getElementById("audio-player");
    const btn = document.getElementById("play-btn");
    if (audio.paused) {
        audio.play();
        btn.textContent = "Pause";
        document.querySelector("#player-window .player-status",).textContent = "Playing";
    } else {
        audio.pause();
        btn.textContent = "Play";
        document.querySelector("#player-window .player-status",).textContent = "Paused";
    }
}

function seekAudio() {
    const audio = document.getElementById("audio-player");
    audio.currentTime = document.getElementById("seek-bar").value;
}

function makeDraggable(winId) {
    const win = document.getElementById(winId);
    const bar = win.querySelector(".title-bar");
    let offX, offY;
    bar.addEventListener("mousedown", function (e) {
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

function updateClock() {
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    document.getElementById("taskbar-time").textContent = h + ":" + m + " " + ampm;
}

window.onload = () => {//Addition by KittenKatja
    document.getElementById("audio-player").addEventListener("timeupdate", function () {// KittenKatja: Removed Indent
        const seek = document.getElementById("seek-bar");
        const audio = document.getElementById("audio-player");
        if (audio.duration) {
            seek.max = audio.duration;
            seek.value = audio.currentTime;
        }
    });

    document.getElementById("audio-player").addEventListener("ended", function () {//KittenKatja: Removed Indent
        document.getElementById("play-btn").textContent = "Play";
        document.querySelector("#player-window .player-status",).textContent = "Ready";
        document.getElementById("seek-bar").value = 0;
    });

    makeDraggable("balatro-window");
    makeDraggable("profile-window");
    makeDraggable("hang-window");
    makeDraggable("player-window");
    makeDraggable("browser-window");
    makeDraggable("error-dialog");
    makeDraggable("error-dialog2");

    updateClock();
    setInterval(updateClock, 10000);
    openWin("browser-window");
    openWin("profile-window");

    document.getElementById("balatro").addEventListener("click", ()=>{openWin("balastro-window");});
    document.getElementById("tetris").addEventListener("click", tetrisError);
    document.getElementById("epic").addEventListener("click", openPlayer);
    document.getElementById("profile").addEventListener("click", ()=>{openWin("profile-window");});
    document.getElementById("hang_in_there").addEventListener("click", ()=>{openWin("hang-window");});
    document.getElementById("browser").addEventListener("click", ()=>{opwnWin("browser-window");});
    document.getElementById("driver_install").addEventListener("click", driverInstall);
    document.getElementById("screenshot").addEventListener("click", ()=>{notImpl("Image");});
}
