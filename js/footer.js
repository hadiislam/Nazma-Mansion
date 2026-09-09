/* =========================================================
   NAZMA MANSION — ফুটার (একমাত্র উৎস)

   এই ফাইলটাই ফুটারের একমাত্র জায়গা। এখানে লেখা/লিংক/নম্বর
   বদলালে সাইটের প্রতিটি পেজে (যেখানে <div data-site-footer></div>
   বসানো আছে এবং এই স্ক্রিপ্টটা লোড করা আছে) স্বয়ংক্রিয়ভাবে বদলে যাবে।

   ব্যবহার — নতুন কোনো পেজে ফুটার বসাতে চাইলে:
   ১. যেখানে ফুটার দেখাতে চান, সেখানে বসান:
        <div data-site-footer></div>
   ২. পেজের নিচে (অন্যান্য js ফাইলের সাথে) যোগ করুন:
        <script src="js/footer.js"></script>
   ========================================================= */
(function () {
  "use strict";

  // ============================================================
  // এখানে ফুটারের লেখা/লিংক/ফোন নম্বর বদলান — শুধু এই একটা
  // জায়গায় বদলালেই পুরো সাইটের সব পেজে বদলে যাবে।
  // ============================================================
  var FOOTER_HTML = `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div align="center">
        <h4>জরুরি যোগাযোগ</h4>
        <p>বাড়ির মালিকঃ 0172-1661513</p>
        <a href="emergency.html">সকল জরুরি নম্বর দেখুন →</a>
      </div>
    </div>
    <div class="footer-bottom">© 2026 নাজমা মেনশন। সর্বস্বত্ব সংরক্ষিত।</div>
  </div>
</footer>`;

  function render() {
    document.querySelectorAll("[data-site-footer]").forEach(function (el) {
      el.innerHTML = FOOTER_HTML;
    });
  }

  document.addEventListener("DOMContentLoaded", render);
})();
