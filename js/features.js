/* =========================================================
   NAZMA MANSION — ফিচার তালিকা (একমাত্র উৎস)

   নতুন কোনো ফিচার (যেমন: পানির বিল) যোগ করতে হলে:
   ১. নিচের অ্যারেতে একটা নতুন অবজেক্ট যোগ করুন (icon, label, href)
   ২. href-এ যে নামের HTML ফাইল দিয়েছেন, সেই নামে একটা নতুন পেজ বানান
      (যেকোনো বিদ্যমান পেজ কপি করে ভেতরের কনটেন্ট বদলে দিলেই হবে)
   ব্যাস — হোমপেজের গ্রিড আর তিন-ডট মেনু দুই জায়গাতেই এটা
   স্বয়ংক্রিয়ভাবে যোগ হয়ে যাবে। কোনো অতিরিক্ত কোড লেখার দরকার নেই।
   ========================================================= */
window.NAZMA_FEATURES = [
  {
    id: "home",
    label: "হোম",
    href: "index.html",
    menuOnly: true, // এটা শুধু মেনুতে দেখাবে, হোমপেজের গ্রিডে না
    icon: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9"/>'
  },
  {
    id: "tenant-registration",
    label: "ভাড়াটিয়া নিবন্ধন",
    href: "tenant-registration.html",
    icon: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.8-3.2 3-4.8 5.5-4.8s4.7 1.6 5.5 4.8"/><path d="M18 8v5M20.5 10.5h-5"/>'
  },
  {
    id: "electricity-calculator",
    label: "কারেন্ট বিল ক্যালকুলেটর",
    href: "electricity-calculator.html",
    icon: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>'
  },
  {
    id: "rent-payment",
    label: "ভাড়া পরিশোধ",
    href: "rent-payment.html",
    icon: '<rect x="3" y="6.5" width="18" height="12" rx="2"/><path d="M3 10h18"/><circle cx="16.5" cy="14" r="1"/>'
  },
  {
    id: "notices",
    label: "নোটিশ বোর্ড",
    href: "notices.html",
    icon: '<path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z"/><path d="M10 18a2 2 0 0 0 4 0"/>'
  },
  {
    id: "complaints",
    label: "অভিযোগ / কমপ্লেইন",
    href: "complaints.html",
    icon: '<path d="M4 12a8 8 0 1 1 3 6.2L4 20l1.6-3.3A7.96 7.96 0 0 1 4 12Z"/>'
  },
  {
    id: "emergency",
    label: "জরুরি যোগাযোগ",
    href: "emergency.html",
    icon: '<path d="M6 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2C10 18 4 12 4 5a2 2 0 0 1 2-2Z"/>'
  },
  {
    id: "house-rules",
    label: "বাড়ির নিয়মাবলী",
    href: "house-rules.html",
    icon: '<path d="M12 6c-2-1.3-4.5-1.5-7-1v13c2.5-.5 5-.3 7 1 2-1.3 4.5-1.5 7-1V5c-2.5-.5-5-.3-7 1Z"/><path d="M12 6v13"/>'
  },
  {
    id: "downloads",
    label: "ডাউনলোড",
    href: "downloads.html",
    icon: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 19h16"/>'
  },
  {
    id: "contact",
    label: "যোগাযোগ",
    href: "contact.html",
    icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 6 8 7 8-7"/>'
  }

  /* -------------------------------------------------------
     উদাহরণ — পানির বিল সিস্টেম যোগ করতে চাইলে এভাবে যোগ করুন:

     {
       id: "water-bill",
       label: "পানির বিল",
       href: "water-bill.html",
       icon: '<path d="M12 2s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11Z"/>'
     }
     ------------------------------------------------------- */
];
