(() => {
  "use strict";
  const surprise = document.getElementById("surprise-button");
  const toast = document.getElementById("toast");
  const celebrationLayer = document.getElementById("celebration-layer");
  const birthdayBanner = document.getElementById("birthday-banner");
  let toastTimer;
  let audioCtx;

  const surprises = [
    "Birthday patch installed. Maturity remains an optional feature.",
    "Official permission granted to ignore one assignment today.",
    "Achievement unlocked: survived another year of questionable decisions.",
    "Today's agenda: cake first, responsibilities after a system restart."
  ];

  function playDrumSound() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return;
    audioCtx ??= new AudioCtor();
    const ctx = audioCtx;
    const now = ctx.currentTime;

    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = "sine";
    bassOsc.frequency.setValueAtTime(72, now);
    bassOsc.frequency.exponentialRampToValueAtTime(30, now + 0.18);
    bassGain.gain.setValueAtTime(0.0001, now);
    bassGain.gain.exponentialRampToValueAtTime(0.85, now + 0.01);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    bassOsc.connect(bassGain).connect(ctx.destination);
    bassOsc.start(now);
    bassOsc.stop(now + 0.26);

    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.18, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      const env = 1 - i / data.length;
      data[i] = (Math.random() * 2 - 1) * env * 0.8;
    }

    const noise = ctx.createBufferSource();
    const noiseFilter = ctx.createBiquadFilter();
    const noiseGain = ctx.createGain();
    noise.buffer = buffer;
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 1800;
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.35, now + 0.01);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.19);
  }

  function triggerCelebration() {
    const count = 18;
    for (let i = 0; i < count; i += 1) {
      const balloon = document.createElement("span");
      balloon.className = "balloon";
      const colors = ["#e74c3c", "#2851bd", "#f4b400", "#2ecc71", "#9b59b6", "#f39c12", "#f071a9", "#00a8c6", "#ff7a59", "#4e7cff"];
      const birthdayMsgs = ["A", "M", "A", "N", "★", "B", "D", "A", "Y", "!", "🎉", "✦"];
      const color = colors[i % colors.length];
      const left = Math.random() * 90 + 2;
      balloon.style.setProperty("--color", color);
      balloon.style.setProperty("--left", `${left}%`);
      balloon.style.setProperty("--dur", `${6.2 + Math.random() * 3.4}s`);
      balloon.style.setProperty("--drift-a", `${(Math.random() - 0.5) * 170}px`);
      balloon.style.setProperty("--drift-b", `${(Math.random() - 0.5) * 220}px`);
      balloon.style.setProperty("--drift-c", `${(Math.random() - 0.5) * 280}px`);
      balloon.title = birthdayMsgs[i % birthdayMsgs.length];
      celebrationLayer.appendChild(balloon);
      window.setTimeout(() => balloon.remove(), 9000);
    }

    birthdayBanner.classList.remove("show");
    void birthdayBanner.offsetWidth;
    birthdayBanner.classList.add("show");
    window.clearTimeout(window.__birthdayHideTimer);
    window.__birthdayHideTimer = window.setTimeout(() => birthdayBanner.classList.remove("show"), 1800);
  }

  let lastSurprise = -1;
  surprise.addEventListener("click", () => {
    let n;
    do { n = Math.floor(Math.random() * surprises.length); } while (surprises.length > 1 && n === lastSurprise);
    lastSurprise = n;
    toast.textContent = surprises[n];
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
    playDrumSound();
    triggerCelebration();
  });

  const roasts = [
    "Aman's assignment strategy: open the file, stare at it, call it progress.",
    "He doesn't miss deadlines. He gives them a chance to miss him.",
    "His attendance is a limited-edition collectible.",
    "Group project role: morale manager and professional 'bro, I'll do it tonight' specialist.",
    "His brain has 47 tabs open. One is playing music. Nobody knows which.",
    "Aman treats the syllabus like a terms-and-conditions page: scroll, scroll, accept.",
    "The study plan is premium. The execution is still on the free trial.",
    "Maturity update failed, but the vibes are fully supported."
  ];
  const roastLine = document.getElementById("roast-line");
  const roastButton = document.getElementById("roast-button");
  const roastCounter = document.getElementById("roast-counter");
  let roastIndex = 0;
  roastButton.addEventListener("click", () => {
    roastIndex = (roastIndex + 1) % roasts.length;
    roastLine.animate(
      [{ opacity: 0, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 260, easing: "ease-out" }
    );
    roastLine.textContent = roasts[roastIndex];
    roastCounter.textContent = `${String(roastIndex + 1).padStart(2, "0")} / ${String(roasts.length).padStart(2, "0")}`;
  });

  const giftButton = document.getElementById("gift-button");
  const giftReveal = document.getElementById("gift-reveal");
  giftButton.addEventListener("click", () => {
    const opening = giftReveal.hidden;
    giftReveal.hidden = !opening;
    giftButton.setAttribute("aria-expanded", String(opening));
    const label = opening ? "Hide the patch notes" : "One last thing";
    giftButton.innerHTML = '<span class="gift-icon" aria-hidden="true">✳</span> ' + label + ' <span class="gift-arrow" aria-hidden="true">↗</span>';
    if (opening) {
      playDrumSound();
      triggerCelebration();
      giftReveal.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
    }
  });
})();