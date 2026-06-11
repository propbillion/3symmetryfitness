/* =========================================================
   SYMMETRY FITNESS CENTRE  -  interactions
   Single control block. Edit CONFIG only.
   ========================================================= */
(function () {
  "use strict";

  /* ----------  EDIT EVERYTHING HERE  ---------- */
  var CONFIG = {
    whatsapp: "918080493517",          // WhatsApp number (with country code, no +)
    call: "+919022610757",             // Call number
    messages: {
      join:           "Hi Symmetry Fitness, I want to join. Please share membership details and the current offer.",
      whatsapp:       "Hi Symmetry Fitness, I have an enquiry about your gym.",
      offer:          "Hi Symmetry Fitness, please send me this month's exclusive offer sheet.",
      assessment:     "Hi Symmetry Fitness, I would like to book my FREE fitness assessment.",
      annualOffer:    "Hi Symmetry Fitness, I want to unlock the BEST annual (12 month) offer. Please share your best price.",
      hiddenOffers:   "Hi Symmetry Fitness, please share any hidden / special membership offers currently available.",
      premiumTrainer: "Hi Symmetry Fitness, I want to RESERVE a personal training slot with your premium trainer. Please share availability and price.",
      priceSheet:     "Hi Symmetry Fitness, please send me the full Personal Training price sheet.",
      fatloss:        "Hi Symmetry Fitness, I want to start the Weight Loss / Fat Loss program. Please guide me.",
      muscle:         "Hi Symmetry Fitness, I want to start Muscle Building. Please share details.",
      strength:       "Hi Symmetry Fitness, I am interested in Strength Training. Please guide me.",
      functional:     "Hi Symmetry Fitness, I am interested in Functional Training. Please share details.",
      zumba:          "Hi Symmetry Fitness, please send me the current group class and Zumba batch timings.",
      timings:        "Hi Symmetry Fitness, please share your exact gym timings.",
      freeDiet:       "Hi Symmetry Fitness, I want my FREE starter diet plan. Please guide me.",
      paidDiet:       "Hi Symmetry Fitness, I want a custom diet plan on consultancy. Please share details.",
      brochure:       "Hi Symmetry Fitness, please send me the full brochure on WhatsApp.",
      founder:        "Hi Symmetry Fitness, I want to train with Nitish's team. Please guide me.",
      plan1:          "Hi Symmetry Fitness, I want the 1 Month membership (Rs 3000). Is a better rate available?",
      plan3:          "Hi Symmetry Fitness, I want the 3 Month membership (Rs 6500). Is a better rate available?",
      plan6:          "Hi Symmetry Fitness, I want the 6 Month membership (Rs 9000). Is a better rate available?",
      plan12:         "Hi Symmetry Fitness, I want the 12 Month annual membership (Rs 14000). Please share your best price."
    }
  };

  /* Quality scores: [label, percent] */
  var SCORES = [
    ["Trainer Quality", 96],
    ["Equipment Quality", 98],
    ["Hygiene Quality", 97],
    ["Member Satisfaction", 95],
    ["Transformation Success", 94]
  ];

  /* Transformations: [name, weeks, lost, gained] */
  var TRANSFORMS = [
    ["Aniket Deshmukh", "16 weeks", "12 kg fat lost", "Visible abs"],
    ["Priya Kulkarni", "20 weeks", "14 kg lost", "Toned & strong"],
    ["Rohan Jadhav", "24 weeks", "8 kg muscle gained", "Major strength up"],
    ["Sneha Patil", "12 weeks", "9 kg fat lost", "Postpartum comeback"],
    ["Vikram Shinde", "18 weeks", "15 kg lost", "Reversed lifestyle"],
    ["Tejas More", "22 weeks", "10 kg muscle gained", "Athletic build"],
    ["Pooja Joshi", "14 weeks", "8 kg fat lost", "Lean & defined"],
    ["Saurabh Pawar", "26 weeks", "Recomp", "Lean mass + strength"],
    ["Manasi Gokhale", "16 weeks", "11 kg lost", "Confident & fit"],
    ["Kunal Bhosale", "20 weeks", "13 kg lost", "Total transformation"]
  ];

  /* Reviews: [name, duration, text] */
  var REVIEWS = [
    ["Aditya Kale", "Member 1 yr", "Best gym in Gahunje. Coaches actually correct your form and the diet guidance changed everything for me."],
    ["Shruti Naik", "Member 8 mo", "Women friendly, super clean and the trainers are genuinely supportive. Lost 11 kg here."],
    ["Omkar Sawant", "Member 2 yr", "Equipment is premium and well maintained. PT with their senior coach is worth every rupee."],
    ["Neha Phadke", "Member 6 mo", "Joined for fat loss, stayed for the vibe. Structured programs, real results."],
    ["Harshad Patil", "Member 1.5 yr", "Strength went up massively. The progressive programming here is on another level."],
    ["Ketaki Joshi", "Member 10 mo", "Steam, AC, hygiene, parking, everything sorted. Feels premium without the pretension."],
    ["Sagar Wagh", "Member 1 yr", "Nutrition coaching is the real deal. Nitish sir knows his stuff. Highly recommend."],
    ["Ishwari Rao", "Member 7 mo", "Group classes are so much fun and the energy keeps me consistent. Love this place."]
  ];

  /* ----------  helpers  ---------- */
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function waLink(msg) { return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg); }
  function openWA(msg) { window.open(waLink(msg), "_blank"); }
  function initials(name) { return name.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase(); }
  function esc(s){var d=document.createElement("div");d.textContent=s;return d.innerHTML;}

  /* =========================================================
     RIPPLE  (Apple-style, on every .btn)
     ========================================================= */
  function ripple(e) {
    var btn = e.currentTarget;
    var r = btn.getBoundingClientRect();
    var size = Math.max(r.width, r.height);
    var span = document.createElement("span");
    span.className = "ripple";
    span.style.width = span.style.height = size + "px";
    var x = (e.clientX || (r.left + r.width / 2)) - r.left - size / 2;
    var y = (e.clientY || (r.top + r.height / 2)) - r.top - size / 2;
    span.style.left = x + "px";
    span.style.top = y + "px";
    btn.appendChild(span);
    setTimeout(function () { span.remove(); }, 700);
  }
  function bindRipple(el) { el.addEventListener("click", ripple); }

  /* =========================================================
     WHATSAPP ROUTING  (data-msg)
     ========================================================= */
  function bindMsg(el) {
    el.addEventListener("click", function (e) {
      if (el.tagName === "A") e.preventDefault();
      var key = el.getAttribute("data-msg");
      openWA(CONFIG.messages[key] || CONFIG.messages.whatsapp);
    });
  }

  /* data-scroll smooth scroll */
  function bindScroll(el) {
    el.addEventListener("click", function () {
      var t = $(el.getAttribute("data-scroll"));
      if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* =========================================================
     NAV
     ========================================================= */
  function initNav() {
    var nav = $("#nav"), burger = $("#burger"), mob = $("#navMobile");
    window.addEventListener("scroll", function () {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    });
    if (burger) {
      burger.addEventListener("click", function () {
        var open = mob.classList.toggle("open");
        burger.classList.toggle("open", open);
        burger.setAttribute("aria-expanded", open);
      });
      $$("#navMobile a").forEach(function (a) {
        a.addEventListener("click", function () {
          mob.classList.remove("open"); burger.classList.remove("open");
          burger.setAttribute("aria-expanded", false);
        });
      });
    }
    /* smooth anchors */
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length > 1 && $(id)) { e.preventDefault(); $(id).scrollIntoView({ behavior: "smooth", block: "start" }); }
      });
    });
  }

  /* pills */
  function initPills() {
    $$(".pill").forEach(function (p) {
      p.addEventListener("click", function () {
        var t = $(p.getAttribute("data-target"));
        if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* =========================================================
     REVEAL + COUNT-UP
     ========================================================= */
  function countUp(el) {
    var target = +el.getAttribute("data-count");
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = performance.now();
    function step(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initReveal() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$("[data-count]", en.target).forEach(function (c) {
          if (!c.dataset.done) { c.dataset.done = "1"; countUp(c); }
        });
        if (en.target.hasAttribute("data-count") && !en.target.dataset.done) {
          en.target.dataset.done = "1"; countUp(en.target);
        }
        io.unobserve(en.target);
      });
    }, { threshold: 0.18 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
    /* stat numbers that are not .reveal themselves */
    $$("[data-count]").forEach(function (el) {
      if (!el.closest(".reveal")) io.observe(el);
    });
  }

  /* =========================================================
     SCORES  (ring fill + animated check)
     ========================================================= */
  function buildScores() {
    var grid = $(".scores-grid");
    if (!grid) return;
    var C = 327; // 2*pi*r (r=52)
    SCORES.forEach(function (s) {
      var card = document.createElement("div");
      card.className = "score-card reveal";
      card.innerHTML =
        '<div class="ring-wrap">' +
          '<svg class="ring" viewBox="0 0 120 120">' +
            '<circle class="ring__bg" cx="60" cy="60" r="52"></circle>' +
            '<circle class="ring__fg" cx="60" cy="60" r="52"></circle>' +
          '</svg>' +
          '<div class="score-center">' +
            '<svg class="check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>' +
            '<span class="score-num" data-count="' + s[1] + '" data-suffix="%">0</span>' +
          '</div>' +
        '</div>' +
        '<p>' + esc(s[0]) + '</p>';
      grid.appendChild(card);

      var fg = $(".ring__fg", card);
      var io = new IntersectionObserver(function (ents) {
        ents.forEach(function (e) {
          if (e.isIntersecting) {
            fg.style.strokeDashoffset = (C - (C * s[1] / 100)).toFixed(1);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      io.observe(card);
    });
  }

  /* =========================================================
     TRANSFORMATIONS  (before/after slider)
     ========================================================= */
  function buildTransforms() {
    var rail = $("#transRail");
    if (!rail) return;
    TRANSFORMS.forEach(function (t, i) {
      var card = document.createElement("article");
      card.className = "trans-card";
      card.innerHTML =
        '<div class="ba">' +
          '<span class="ba__tag ba__tag--before">Before</span>' +
          '<span class="ba__tag ba__tag--after">After</span>' +
          '<div class="ba__layer ba__before"><span>BEFORE-' + (i + 1) + '.webp</span></div>' +
          '<div class="ba__layer ba__after"><span>AFTER-' + (i + 1) + '.webp</span></div>' +
          '<div class="ba__handle"></div>' +
          '<input class="ba__range" type="range" min="0" max="100" value="50" aria-label="Reveal after photo">' +
        '</div>' +
        '<div class="trans-card__meta">' +
          '<h3>' + esc(t[0]) + '</h3>' +
          '<div class="trans-card__stats">' +
            '<span><strong>' + esc(t[1]) + '</strong>Duration</span>' +
            '<span><strong>' + esc(t[2]) + '</strong>Result</span>' +
            '<span><strong>' + esc(t[3]) + '</strong>Outcome</span>' +
          '</div>' +
        '</div>';
      rail.appendChild(card);

      var range = $(".ba__range", card),
          after = $(".ba__after", card),
          handle = $(".ba__handle", card);
      function set(v) {
        after.style.clipPath = "inset(0 0 0 " + v + "%)";
        handle.style.left = v + "%";
      }
      range.addEventListener("input", function () { set(range.value); });
    });
  }

  /* =========================================================
     REVIEWS  (auto marquee + drag)
     ========================================================= */
  function buildReviews() {
    var rail = $("#revRail");
    if (!rail) return;
    REVIEWS.concat(REVIEWS).forEach(function (r) { // duplicate for seamless loop feel
      var card = document.createElement("article");
      card.className = "rev";
      card.innerHTML =
        '<div class="rev__top">' +
          '<div class="rev__pic">' + initials(r[0]) + '</div>' +
          '<div><div class="rev__name">' + esc(r[0]) + '</div><div class="rev__dur">' + esc(r[1]) + '</div></div>' +
        '</div>' +
        '<div class="rev__stars">\u2605\u2605\u2605\u2605\u2605</div>' +
        '<p class="rev__text">' + esc(r[2]) + '</p>';
      rail.appendChild(card);
    });
    autoScroll(rail);
  }

  function autoScroll(rail) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    var paused = false, raf;
    function tick() {
      if (!paused) {
        rail.scrollLeft += 0.5;
        if (rail.scrollLeft >= (rail.scrollWidth - rail.clientWidth - 1)) rail.scrollLeft = 0;
      }
      raf = requestAnimationFrame(tick);
    }
    rail.addEventListener("mouseenter", function () { paused = true; });
    rail.addEventListener("mouseleave", function () { paused = false; });
    rail.addEventListener("touchstart", function () { paused = true; }, { passive: true });
    raf = requestAnimationFrame(tick);
  }

  /* drag-to-scroll for rails */
  function dragScroll(rail) {
    var down = false, startX, startScroll;
    rail.addEventListener("pointerdown", function (e) {
      down = true; rail.classList.add("grabbing");
      startX = e.pageX; startScroll = rail.scrollLeft;
    });
    window.addEventListener("pointerup", function () { down = false; rail.classList.remove("grabbing"); });
    rail.addEventListener("pointermove", function (e) {
      if (!down) return;
      e.preventDefault();
      rail.scrollLeft = startScroll - (e.pageX - startX);
    });
  }

  function initRailButtons() {
    $$(".rail-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var rail = document.getElementById(b.getAttribute("data-rail"));
        if (!rail) return;
        var card = rail.querySelector("*");
        var amt = card ? card.getBoundingClientRect().width + 22 : 400;
        rail.scrollBy({ left: (+b.getAttribute("data-dir")) * amt, behavior: "smooth" });
      });
    });
  }

  /* =========================================================
     HERO PARALLAX
     ========================================================= */
  function initParallax() {
    var media = $(".hero__media");
    if (!media || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y < 700) media.style.transform = "translateY(" + (y * 0.04) + "px)";
    }, { passive: true });
  }

  /* =========================================================
     DIET BUILDER
     ========================================================= */
  function dietData() {
    return {
      name:     ($("#dName").value || "").trim(),
      gender:   $("#dGender").value,
      age:      +$("#dAge").value,
      height:   +$("#dHeight").value,
      weight:   +$("#dWeight").value,
      goal:     $("#dGoal").value,
      lifestyle:$("#dLifestyle").value,
      activitySel: $("#dActivity"),
      activity: $("#dActivity").value
    };
  }

  function validDiet(d) {
    return d.gender && d.age >= 12 && d.height >= 120 && d.weight >= 30 && d.goal && d.activity;
  }

  function computeFree(d) {
    // Mifflin-St Jeor
    var s = (d.gender === "Female") ? -161 : 5;
    var bmr = 10 * d.weight + 6.25 * d.height - 5 * d.age + s;
    var opt = d.activitySel.options[d.activitySel.selectedIndex];
    var factor = parseFloat(opt.getAttribute("data-f")) || 1.2;
    var tdee = bmr * factor;
    var goalAdj = { "Weight Loss": -500, "Fat Loss": -400, "Weight Gain": 400, "Muscle Gain": 300, "Lifestyle": 0 };
    var cal = Math.round((tdee + (goalAdj[d.goal] || 0)) / 10) * 10;
    var protein = Math.round(d.weight * 1.8);
    var water = Math.round(d.weight * 0.035 * 10) / 10;
    return { cal: cal, protein: protein, water: water };
  }

  function renderFree(d, r) {
    $("#vCal").textContent = r.cal;
    $("#vProtein").textContent = r.protein;
    $("#vWater").textContent = r.water;

    var split = [["Breakfast", 0.25], ["Lunch", 0.35], ["Snack", 0.15], ["Dinner", 0.25]];
    var ul = $("#mealList");
    ul.innerHTML = "";
    split.forEach(function (m) {
      var li = document.createElement("li");
      li.innerHTML = "<span>" + m[0] + "</span><strong>~ " + Math.round(r.cal * m[1] / 10) * 10 + " kcal</strong>";
      ul.appendChild(li);
    });

    $("#freeEmpty").hidden = true;
    $("#freePreview").hidden = false;
    $("#freePreview").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function customMsg(d) {
    return "Hello Symmetry Fitness Team,\n\nPlease create my custom diet plan.\n\nMy Details:\n" +
      "Name: " + (d.name || "-") + "\n" +
      "Age: " + (d.age || "-") + "\n" +
      "Gender: " + (d.gender || "-") + "\n" +
      "Height: " + (d.height ? d.height + " cm" : "-") + "\n" +
      "Weight: " + (d.weight ? d.weight + " kg" : "-") + "\n" +
      "Goal: " + (d.goal || "-") + "\n" +
      "Lifestyle: " + (d.lifestyle || "-") + "\n" +
      "Activity Level: " + (d.activity || "-") + "\n\n" +
      "Please guide me further.";
  }

  function flashForm() {
    var form = $("#dietForm");
    form.style.boxShadow = "0 0 0 4px rgba(0,113,227,.35)";
    setTimeout(function () { form.style.boxShadow = ""; }, 900);
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function initDiet() {
    var gen = $("#genFree");
    if (!gen) return;
    gen.addEventListener("click", function () {
      var d = dietData();
      if (!validDiet(d)) { flashForm(); return; }
      renderFree(d, computeFree(d));
    });

    // Custom plan -> WhatsApp (auto-fill)
    function toCustom() {
      var d = dietData();
      if (!validDiet(d)) { flashForm(); return; }
      openWA(customMsg(d));
    }
    $("#getCustom").addEventListener("click", toCustom);
    var unlock = $("#unlockCustom");
    if (unlock) unlock.addEventListener("click", toCustom);
  }

  /* =========================================================
     BOOT
     ========================================================= */
  function boot() {
    $("#year").textContent = new Date().getFullYear();

    buildScores();
    buildTransforms();
    buildReviews();

    initNav();
    initPills();
    initRailButtons();
    initDiet();
    initParallax();

    // bind dynamic + static after build
    $$("[data-msg]").forEach(bindMsg);
    $$("[data-scroll]").forEach(bindScroll);
    $$(".btn, .pill, .float, .rail-btn").forEach(bindRipple);

    [$("#transRail"), $("#revRail")].forEach(function (r) { if (r) dragScroll(r); });

    initReveal(); // last, so injected cards are observed
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
