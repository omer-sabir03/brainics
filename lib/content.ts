// All visible text lives here, in English and Urdu.
// NOTE: Urdu text is a first draft — please have a fluent speaker review it.
export type Lang = "en" | "ur";

const en = {
  nav: {
    home: "Home",
    courses: "Courses",
    about: "About",
    results: "Results",
    gallery: "Gallery",
    contact: "Contact",
    enquire: "Enquire Now",
  },
  hero: {
    badge: "Admissions open · Classes 1–10",
    titleA: "Where young minds",
    titleB: "learn to think",
    subtitle:
      "Brainics is a tuition institute in Jammu & Kashmir that builds strong concepts, steady confidence and top results — one student at a time.",
    cta1: "Enquire on WhatsApp",
    cta2: "Explore Courses",
    stats: [
      { value: "1–10", label: "Classes covered" },
      { value: "All", label: "Core subjects" },
      { value: "Small", label: "Batch sizes" },
    ],
    cardTitle: "Personal attention",
    cardText: "Doubt-clearing, weekly tests and regular parent updates.",
  },
  courses: {
    eyebrow: "Courses",
    title: "Focused learning for every stage",
    subtitle: "Structured batches for Classes 1–10, with every core subject taught by dedicated teachers.",
    items: [
      {
        title: "Foundation",
        range: "Classes 1 – 5",
        desc: "Joyful, activity-based learning that builds reading, writing and number sense from the start.",
        tags: ["English", "Maths", "EVS", "Urdu", "Hindi"],
      },
      {
        title: "Middle School",
        range: "Classes 6 – 8",
        desc: "Concept clarity and problem-solving habits that prepare students for the demanding years ahead.",
        tags: ["Maths", "Science", "English", "Social Science", "Urdu"],
      },
      {
        title: "Board Focus",
        range: "Classes 9 – 10",
        desc: "Syllabus completion, chapter-wise tests, previous-year papers and exam-writing practice.",
        tags: ["Maths", "Science", "English", "Social Science", "Urdu"],
      },
    ],
    note: "Subjects and batch timings are placeholders — final list coming soon.",
    cta: "Ask about this batch",
  },
  about: {
    eyebrow: "About Brainics",
    title: "Teaching that goes beyond the textbook",
    text: "Brainics was founded with a simple belief: every child can do well when concepts are explained patiently and practised regularly. We keep batches small, tests frequent and communication with parents open.",
    points: [
      "Concept-first teaching, not rote learning",
      "Weekly tests with honest feedback",
      "Doubt-clearing in every session",
      "Regular parent–teacher updates",
    ],
    founderName: "Founder name", // TODO
    founderRole: "Founder & Lead Teacher",
    founderNote: "Add a short bio, qualifications and years of experience here.",
  },
  results: {
    eyebrow: "Results & Testimonials",
    title: "Proud of our students, and our parents",
    subtitle: "Sample placeholders — real achievements and feedback will go here.",
    stats: [
      { value: "00+", label: "Students taught" },
      { value: "00%", label: "Pass rate" },
      { value: "00+", label: "Top scorers" },
    ],
    items: [
      { quote: "My daughter’s confidence in Maths has improved a lot. The teachers are patient and caring.", name: "Parent name", meta: "Class 8 parent" },
      { quote: "Regular tests and clear feedback helped me prepare well for my board exams.", name: "Student name", meta: "Class 10 student" },
      { quote: "Small batches mean every child gets noticed. We see progress every month.", name: "Parent name", meta: "Class 5 parent" },
    ],
  },
  gallery: {
    eyebrow: "Gallery",
    title: "A look inside Brainics",
    subtitle: "Real classroom and event photos will be added here.",
    captions: ["Classroom", "Group study", "Annual day", "Prize distribution", "Test day", "Our students"],
  },
  contact: {
    eyebrow: "Contact & Enquiry",
    title: "Let’s talk about your child’s learning",
    subtitle: "Send an enquiry, WhatsApp us, or call — we’ll get back to you quickly.",
    whatsapp: "Chat on WhatsApp",
    call: "Call now",
    address: "Address",
    phone: "Phone",
    hours: "Timings",
    form: {
      name: "Parent / student name",
      phone: "Phone number",
      cls: "Class",
      classPlaceholder: "Select class",
      message: "Message (optional)",
      submit: "Send enquiry via WhatsApp",
      hint: "This opens WhatsApp with your details filled in.",
      msgIntro: "Hello Brainics, I'd like to enquire about admission.",
      lblName: "Name",
      lblPhone: "Phone",
      lblClass: "Class",
      lblMsg: "Message",
    },
  },
  footer: {
    tagline: "Brainics — Think. Learn. Excel.",
    rights: "All rights reserved.",
  },
};

const ur: typeof en = {
  nav: {
    home: "ہوم",
    courses: "کورسز",
    about: "ہمارے بارے میں",
    results: "نتائج",
    gallery: "گیلری",
    contact: "رابطہ",
    enquire: "ابھی پوچھیں",
  },
  hero: {
    badge: "داخلے جاری ہیں · جماعت 1 تا 10",
    titleA: "جہاں ذہن",
    titleB: "سوچنا سیکھتے ہیں",
    subtitle:
      "برینکس جموں و کشمیر کا ایک ٹیوشن ادارہ ہے جو مضبوط تصورات، اعتماد اور بہترین نتائج کی بنیاد رکھتا ہے — ہر طالب علم پر الگ توجہ کے ساتھ۔",
    cta1: "واٹس ایپ پر پوچھیں",
    cta2: "کورسز دیکھیں",
    stats: [
      { value: "1–10", label: "جماعتیں" },
      { value: "تمام", label: "اہم مضامین" },
      { value: "چھوٹے", label: "بیچ" },
    ],
    cardTitle: "ذاتی توجہ",
    cardText: "سوالات کا حل، ہفتہ وار ٹیسٹ اور والدین کو باقاعدہ اطلاع۔",
  },
  courses: {
    eyebrow: "کورسز",
    title: "ہر مرحلے کے لیے بہترین تعلیم",
    subtitle: "جماعت 1 تا 10 کے لیے منظم بیچ، ہر مضمون کے لیے مخصوص اساتذہ۔",
    items: [
      {
        title: "بنیادی مرحلہ",
        range: "جماعت 1 تا 5",
        desc: "دلچسپ اور سرگرمی پر مبنی تعلیم جو پڑھنے، لکھنے اور گنتی کی مضبوط بنیاد رکھتی ہے۔",
        tags: ["انگریزی", "ریاضی", "ماحولیات", "اردو", "ہندی"],
      },
      {
        title: "درمیانی مرحلہ",
        range: "جماعت 6 تا 8",
        desc: "تصورات کی وضاحت اور مسئلہ حل کرنے کی عادت، تاکہ آنے والے سالوں کے لیے تیاری ہو۔",
        tags: ["ریاضی", "سائنس", "انگریزی", "سماجی علوم", "اردو"],
      },
      {
        title: "بورڈ کی تیاری",
        range: "جماعت 9 تا 10",
        desc: "نصاب کی تکمیل، باب وار ٹیسٹ، پچھلے سالوں کے پرچے اور امتحان لکھنے کی مشق۔",
        tags: ["ریاضی", "سائنس", "انگریزی", "سماجی علوم", "اردو"],
      },
    ],
    note: "مضامین اور اوقات ابھی عارضی ہیں — حتمی فہرست جلد۔",
    cta: "اس بیچ کے بارے میں پوچھیں",
  },
  about: {
    eyebrow: "برینکس کے بارے میں",
    title: "نصابی کتاب سے آگے کی تعلیم",
    text: "برینکس اس یقین پر قائم کیا گیا کہ ہر بچہ اچھا کر سکتا ہے جب تصورات صبر سے سمجھائے جائیں اور باقاعدہ مشق ہو۔ ہم بیچ چھوٹے، ٹیسٹ باقاعدہ اور والدین سے رابطہ کھلا رکھتے ہیں۔",
    points: [
      "رٹّے کے بجائے تصور پر مبنی تعلیم",
      "ہفتہ وار ٹیسٹ اور ایماندار رائے",
      "ہر کلاس میں سوالات کا حل",
      "والدین کو باقاعدہ اطلاع",
    ],
    founderName: "بانی کا نام",
    founderRole: "بانی اور سینئر استاد",
    founderNote: "یہاں مختصر تعارف، قابلیت اور تجربہ شامل کریں۔",
  },
  results: {
    eyebrow: "نتائج اور تاثرات",
    title: "ہمیں اپنے طلبہ اور والدین پر فخر ہے",
    subtitle: "نمونے کے طور پر — اصل نتائج اور آراء یہاں شامل ہوں گی۔",
    stats: [
      { value: "00+", label: "طلبہ" },
      { value: "00%", label: "کامیابی کی شرح" },
      { value: "00+", label: "ٹاپرز" },
    ],
    items: [
      { quote: "میری بیٹی کا ریاضی میں اعتماد بہت بہتر ہوا ہے۔ اساتذہ صبر والے اور مہربان ہیں۔", name: "والدین کا نام", meta: "جماعت 8 کے والد/والدہ" },
      { quote: "باقاعدہ ٹیسٹ اور واضح رائے نے مجھے بورڈ امتحان کی اچھی تیاری میں مدد دی۔", name: "طالب علم کا نام", meta: "جماعت 10 کا طالب علم" },
      { quote: "چھوٹے بیچ کی وجہ سے ہر بچے پر توجہ ہوتی ہے۔ ہر ماہ پیش رفت نظر آتی ہے۔", name: "والدین کا نام", meta: "جماعت 5 کے والد/والدہ" },
    ],
  },
  gallery: {
    eyebrow: "گیلری",
    title: "برینکس کی ایک جھلک",
    subtitle: "کلاس روم اور تقریبات کی اصل تصاویر یہاں شامل ہوں گی۔",
    captions: ["کلاس روم", "گروپ اسٹڈی", "سالانہ تقریب", "انعامات کی تقسیم", "ٹیسٹ کا دن", "ہمارے طلبہ"],
  },
  contact: {
    eyebrow: "رابطہ اور انکوائری",
    title: "آئیے آپ کے بچے کی تعلیم پر بات کریں",
    subtitle: "انکوائری بھیجیں، واٹس ایپ کریں یا کال کریں — ہم جلد جواب دیں گے۔",
    whatsapp: "واٹس ایپ پر بات کریں",
    call: "ابھی کال کریں",
    address: "پتہ",
    phone: "فون",
    hours: "اوقات",
    form: {
      name: "والدین / طالب علم کا نام",
      phone: "فون نمبر",
      cls: "جماعت",
      classPlaceholder: "جماعت منتخب کریں",
      message: "پیغام (اختیاری)",
      submit: "واٹس ایپ پر انکوائری بھیجیں",
      hint: "اس سے آپ کی تفصیلات کے ساتھ واٹس ایپ کھل جائے گا۔",
      msgIntro: "السلام علیکم برینکس، میں داخلے کے بارے میں معلومات لینا چاہتا/چاہتی ہوں۔",
      lblName: "نام",
      lblPhone: "فون",
      lblClass: "جماعت",
      lblMsg: "پیغام",
    },
  },
  footer: {
    tagline: "برینکس — سوچیں۔ سیکھیں۔ آگے بڑھیں۔",
    rights: "جملہ حقوق محفوظ ہیں۔",
  },
};

export const content: Record<Lang, typeof en> = { en, ur };
