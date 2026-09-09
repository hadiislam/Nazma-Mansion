/* =========================================================
   NAZMA MANSION — ঘোষণা টিকার (একমাত্র উৎস)

   এই ফাইলটাই টিকারের একমাত্র জায়গা। এখানে লেখা বদলালে
   সাইটের প্রতিটি পেজে (যেখানে <div data-ticker></div> বসানো
   আছে এবং এই স্ক্রিপ্টটা লোড করা আছে) স্বয়ংক্রিয়ভাবে বদলে যাবে।

   ব্যবহার — নতুন কোনো পেজে টিকার বসাতে চাইলে:
   ১. <body> এর ভেতরে যেখানে টিকার দেখাতে চান, সেখানে বসান:
        <div data-ticker></div>
   ২. পেজের নিচে (অন্যান্য js ফাইলের সাথে) যোগ করুন:
        <script src="js/ticker.js"></script>
   ========================================================= */
(function () {
  "use strict";

  // ============================================================
  // এখানে টিকারের লেখা বদলান — শুধু এই একটা জায়গায় বদলালেই
  // পুরো সাইটের সব পেজে বদলে যাবে।
  // ============================================================
  var TICKER_HTML = `<div class="ticker">
  <div class="ticker__icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4l4 1v3a1 1 0 0 0 1 1h1v-5l9 2V5L9 7v0L3 10Z"/></svg>
    ঘোষণা
  </div>
  <div class="ticker__track">
    <!-- এই লেখা এখান থেকে সহজে পরিবর্তন করা যাবে -->
    <div class="ticker__text">📢 গুরুত্বপূর্ণ ঘোষণা: প্রতি মাসের ভাড়া  ও অন্যান্য  বিল পরিশোধের শেষ তারিখ ০৭ তারিখ। সময়মত ভাড়া ও বিল পরিশোধ করে সহযোগিতা করবেন — ধন্যবাদান্তে, নাজমা মেনশন কর্তৃপক্ষ।</div>
  </div>
</div>`;

  function render() {
    document.querySelectorAll("[data-ticker]").forEach(function (el) {
      el.innerHTML = TICKER_HTML;
    });
  }

  document.addEventListener("DOMContentLoaded", render);
})();
