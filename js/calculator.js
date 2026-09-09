/* =========================================================
   NAZMA MANSION — বিদ্যুৎ বিল ক্যালকুলেটর (নতুন সংস্করণ)

   ধাপ ১ — শুধু মোট ব্যবহৃত ইউনিট দিয়ে প্রগ্রেসিভ স্ল্যাব অনুযায়ী
           মূল এনার্জি কস্ট বের করা হয় (getEnergyCost)
   ধাপ ২ — মূল এনার্জি কস্ট ÷ মোট ইউনিট = গড় প্রতি ইউনিট দাম
           (এই গড় দাম দিয়েই প্রতিটি সাব-মিটার ব্যবহারকারীর
           এনার্জি বিল হিসাব হয়)
   ধাপ ৩ — মোট ভ্যাট ÷ মোট ব্যবহারকারী = জনপ্রতি ভ্যাট
   ধাপ ৪ — প্রতিটি ব্যবহারকারীর চূড়ান্ত বিল = এনার্জি বিল + জনপ্রতি ভ্যাট
   ========================================================= */
(function () {
  "use strict";

  /**
   * ভাসমান-দশমিক (floating point) ত্রুটি এড়িয়ে ২ দশমিক ঘরে রাউন্ড করার সাহায্যকারী ফাংশন।
   */
  function round2(n) {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

  /**
   * ডেসিমেল ইউনিটসহ (যেমন: ৯৩.২১) প্রগ্রেসিভ স্ল্যাব অনুযায়ী
   * বিদ্যুৎ বিলের এনার্জি চার্জ বের করার ফাংশন।
   * @param {number} units - মোট ব্যবহৃত ইউনিট
   * @returns {number} - মোট এনার্জি কস্ট (টাকা, দশমিকের পর ২ ঘর পর্যন্ত)
   */
  function getEnergyCost(units) {
    var u = parseFloat(units);
    // ইনপুট ভ্যালিডেশন
    if (isNaN(u) || u < 0) {
      return 0;
    }

    var cost;
    if (u <= 75) {
      cost = u * 5.26;
    } else if (u <= 200) {
      cost = 394.50 + (u - 75) * 8.50;
    } else if (u <= 300) {
      cost = 1457.00 + (u - 200) * 9.10;
    } else if (u <= 400) {
      cost = 2367.00 + (u - 300) * 9.62;
    } else if (u <= 600) {
      cost = 3329.00 + (u - 400) * 15.01;
    } else {
      cost = 6331.00 + (u - 600) * 17.35;
    }
    // দশমিকের পর ২ ঘর পর্যন্ত নির্ভুলভাবে রাউন্ড করে সংখ্যা হিসেবে রিটার্ন করবে
    return round2(cost);
  }

  var els = {
    totalUnits: document.getElementById("mainTotalUnits"),
    totalVat: document.getElementById("mainTotalVat"),
    totalUsers: document.getElementById("mainTotalUsers"),
    generateBtn: document.getElementById("generateUsersBtn"),
    usersContainer: document.getElementById("usersContainer"),
    usersSection: document.getElementById("usersSection"),
    calcBtn: document.getElementById("calculateBtn"),
    resetBtn: document.getElementById("resetBtn"),
    printBtn: document.getElementById("printBtn"),
    pdfBtn: document.getElementById("pdfBtn"),
    resultsSection: document.getElementById("resultsSection"),
    resultsBody: document.getElementById("resultsBody"),
    resultsFoot: document.getElementById("resultsFoot"),
    summaryStrip: document.getElementById("summaryStrip"),
    mismatchAlert: document.getElementById("mismatchAlert"),
    formError: document.getElementById("formError"),
    mainEnergyPreview: document.getElementById("mainEnergyPreview"),
  };

  var bnDigits = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
  function toBn(num) {
    return String(num).replace(/[0-9]/g, function (d) { return bnDigits[+d]; });
  }
  function fmt(num, decimals) {
    if (decimals === undefined) decimals = 2;
    var n = Number(num);
    if (!isFinite(n)) n = 0;
    var s = n.toFixed(decimals);
    if (decimals === 2 && s.endsWith(".00")) s = s.slice(0, -3);
    var parts = s.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return toBn(parts.join("."));
  }

  function clearChildren(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  /* ---------- মূল ইউনিট দিলেই এনার্জি কস্ট প্রিভিউ দেখানো ---------- */
  function updateMainEnergyPreview() {
    var u = parseFloat(els.totalUnits.value);
    if (!els.mainEnergyPreview) return;
    if (isNaN(u) || u <= 0) {
      els.mainEnergyPreview.textContent = "—";
      return;
    }
    els.mainEnergyPreview.textContent = "৳" + fmt(getEnergyCost(u));
  }

  /* ---------- ব্যবহারকারী কার্ড তৈরি ---------- */
  function generateUserCards() {
    var count = parseInt(els.totalUsers.value, 10);
    hideError();
    if (!count || count < 1) {
      showError("অনুগ্রহ করে প্রথমে সঠিক 'মোট ব্যবহারকারী সংখ্যা' লিখুন (কমপক্ষে ১)।");
      return;
    }
    if (count > 60) {
      showError("একসাথে সর্বোচ্চ ৬০ জন ব্যবহারকারী যোগ করা যাবে।");
      return;
    }
    clearChildren(els.usersContainer);
    for (var i = 1; i <= count; i++) {
      els.usersContainer.appendChild(buildUserCard(i));
    }
    els.usersSection.style.display = "block";
    els.resultsSection.style.display = "none";
    els.usersSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function buildUserCard(index) {
    var card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML =
      '<span class="user-card__index">ব্যবহারকারী ' + toBn(index) + '</span>' +
      '<div class="form-grid form-grid--2">' +
        '<div class="field">' +
          '<label for="flat-' + index + '">ফ্ল্যাট নম্বর</label>' +
          '<input type="text" id="flat-' + index + '" data-role="flat" placeholder="যেমনঃ A-2" required>' +
        '</div>' +
        '<div class="field">' +
          '<label for="name-' + index + '">ভাড়াটিয়ার নাম</label>' +
          '<input type="text" id="name-' + index + '" data-role="name" placeholder="পূর্ণ নাম" required>' +
        '</div>' +
      '</div>' +
      '<div class="field" style="max-width:220px">' +
        '<label for="units-' + index + '">ব্যবহৃত ইউনিট</label>' +
        '<input type="number" id="units-' + index + '" data-role="units" min="0" step="0.01" placeholder="0" required>' +
      '</div>';
    return card;
  }

  /* ---------- হিসাব ---------- */
  function calculate() {
    hideError();
    var totalUnits = parseFloat(els.totalUnits.value);
    var totalVat = parseFloat(els.totalVat.value);
    var totalUsers = parseInt(els.totalUsers.value, 10);

    if (!totalUnits || totalUnits <= 0 || isNaN(totalVat) || totalVat < 0 || !totalUsers || totalUsers < 1) {
      showError("অনুগ্রহ করে মূল মিটারের সবগুলো তথ্য সঠিকভাবে পূরণ করুন।");
      return;
    }

    var cards = els.usersContainer.querySelectorAll(".user-card");
    if (cards.length === 0) {
      showError("প্রথমে 'ব্যবহারকারী তালিকা তৈরি করুন' বাটনে চেপে ব্যবহারকারীদের তথ্য যোগ করুন।");
      return;
    }

    // ধাপ ১: প্রগ্রেসিভ স্ল্যাব অনুযায়ী মূল এনার্জি কস্ট
    var mainEnergyCost = getEnergyCost(totalUnits);
    // ধাপ ২: গড় প্রতি ইউনিট দাম (এই দামেই সাব-মিটারগুলো ভাগ হবে)
    var perUnitPrice = mainEnergyCost / totalUnits;
    // ধাপ ৩: জনপ্রতি ভ্যাট
    var perUserVat = totalVat / totalUsers;

    var rows = [];
    var enteredUnitsSum = 0;
    var ok = true;

    cards.forEach(function (card) {
      var flat = card.querySelector('[data-role="flat"]').value.trim() || "—";
      var name = card.querySelector('[data-role="name"]').value.trim() || "—";
      var unitsVal = card.querySelector('[data-role="units"]').value;
      var units = parseFloat(unitsVal);
      if (isNaN(units) || units < 0) { units = 0; ok = false; }

      var energyBill = units * perUnitPrice;
      var finalBill = energyBill + perUserVat;

      enteredUnitsSum += units;
      rows.push({ flat: flat, name: name, units: units, energyBill: energyBill, finalBill: finalBill });
    });

    if (!ok) {
      showError("এক বা একাধিক ব্যবহারকারীর ইউনিট ফাঁকা বা ভুল আছে — অনুগ্রহ করে যাচাই করুন।");
    }

    renderSummary(mainEnergyCost, perUnitPrice, perUserVat, totalUnits, enteredUnitsSum);
    renderResults(rows, perUnitPrice, perUserVat);
    checkMismatch(totalUnits, enteredUnitsSum);
    setPrintDate();

    els.resultsSection.style.display = "block";
    els.resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setPrintDate() {
    var el = document.getElementById("printDate");
    if (!el) return;
    var months = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];
    var d = new Date();
    el.textContent = toBn(d.getDate()) + " " + months[d.getMonth()] + ", " + toBn(d.getFullYear());
  }

  function renderSummary(mainEnergyCost, perUnitPrice, perUserVat, totalUnits, enteredUnitsSum) {
    els.summaryStrip.innerHTML =
      summaryItem("মূল এনার্জি কস্ট", "৳" + fmt(mainEnergyCost)) +
      summaryItem("গড় প্রতি ইউনিট দাম", "৳" + fmt(perUnitPrice)) +
      summaryItem("জনপ্রতি ভ্যাট", "৳" + fmt(perUserVat)) +
      summaryItem("মূল মিটার ইউনিট", fmt(totalUnits, 2)) +
      summaryItem("সর্বমোট প্রবেশকৃত ইউনিট", fmt(enteredUnitsSum, 2));
  }
  function summaryItem(label, value) {
    return '<div class="summary-strip__item"><strong>' + value + '</strong><span>' + label + '</span></div>';
  }

  function renderResults(rows, perUnitPrice, perUserVat) {
    clearChildren(els.resultsBody);
    var sumUnits = 0, sumEnergy = 0, sumVat = 0, sumFinal = 0;

    rows.forEach(function (r) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + escapeHtml(r.flat) + "</td>" +
        "<td>" + escapeHtml(r.name) + "</td>" +
        "<td class='num'>" + fmt(r.units, 2) + "</td>" +
        "<td class='num'>৳" + fmt(perUnitPrice) + "</td>" +
        "<td class='num'>৳" + fmt(r.energyBill) + "</td>" +
        "<td class='num'>৳" + fmt(perUserVat) + "</td>" +
        "<td class='num'><strong>৳" + fmt(r.finalBill) + "</strong></td>";
      els.resultsBody.appendChild(tr);
      sumUnits += r.units; sumEnergy += r.energyBill; sumVat += perUserVat; sumFinal += r.finalBill;
    });

    els.resultsFoot.innerHTML =
      "<tr>" +
        "<td colspan='2'>সর্বমোট</td>" +
        "<td class='num'>" + fmt(sumUnits, 2) + "</td>" +
        "<td class='num'>—</td>" +
        "<td class='num'>৳" + fmt(sumEnergy) + "</td>" +
        "<td class='num'>৳" + fmt(sumVat) + "</td>" +
        "<td class='num'>৳" + fmt(sumFinal) + "</td>" +
      "</tr>";
  }

  function checkMismatch(totalUnits, enteredUnitsSum) {
    var diff = Math.abs(totalUnits - enteredUnitsSum);
    if (diff > 0.01) {
      els.mismatchAlert.style.display = "flex";
      els.mismatchAlert.querySelector("[data-diff]").textContent =
        "মূল মিটারের ইউনিট (" + fmt(totalUnits, 2) + ") এবং সব ব্যবহারকারীর মোট ইউনিটের (" + fmt(enteredUnitsSum, 2) + ") মধ্যে " + fmt(diff, 2) + " ইউনিটের গরমিল রয়েছে। অনুগ্রহ করে সাব-মিটার রিডিং আবার যাচাই করুন।";
    } else {
      els.mismatchAlert.style.display = "none";
    }
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function showError(msg) {
    els.formError.querySelector("span").textContent = msg;
    els.formError.style.display = "flex";
    els.formError.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function hideError() {
    els.formError.style.display = "none";
  }

  function triggerPrint() {
    if (els.resultsSection.style.display === "none" || !els.resultsSection.style.display) {
      showError("প্রিন্ট করার আগে প্রথমে 'বিল হিসাব করুন' বাটনে চেপে ফলাফল বের করুন।");
      return;
    }
    window.print();
  }

  function resetAll() {
    els.totalUnits.value = "";
    els.totalVat.value = "";
    els.totalUsers.value = "";
    updateMainEnergyPreview();
    clearChildren(els.usersContainer);
    els.usersSection.style.display = "none";
    els.resultsSection.style.display = "none";
    hideError();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.addEventListener("DOMContentLoaded", function () {
    els.generateBtn.addEventListener("click", generateUserCards);
    els.calcBtn.addEventListener("click", calculate);
    els.resetBtn.addEventListener("click", resetAll);
    els.printBtn.addEventListener("click", function () { triggerPrint(); });
    els.pdfBtn.addEventListener("click", function () { triggerPrint(); });
    els.totalUnits.addEventListener("input", updateMainEnergyPreview);
  });
})();
