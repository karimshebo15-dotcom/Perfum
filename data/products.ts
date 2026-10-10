export type StoreProduct = {
  slug: string;
  name: string;
  subtitle: string;
  notes: string;
  price: number;
  displayPrice: string;
  category: "warm" | "fresh" | "woody";
  categoryLabel: string;
  tone: string;
  bottle: string;
  badge?: string;
  description: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  longevity: string;
};

export const storeProducts: StoreProduct[] = [
  { slug: "sohad", name: "سُهاد", subtitle: "ليلة عربية لا تنتهي", notes: "عود • عنبر • فانيليا مدخنة", price: 2850, displayPrice: "٢٬٨٥٠ ج.م", category: "warm", categoryLabel: "دافئ", tone: "tone-amber", bottle: "bottle-square", badge: "الأكثر مبيعًا", description: "عطر عميق يبدأ بوهج التوابل، ثم يكشف قلبًا من العود المعتّق قبل أن يستقر على عنبر ناعم وفانيليا مدخنة.", topNotes: "فلفل وردي، زعفران", heartNotes: "عود هندي، ورد داكن", baseNotes: "عنبر، فانيليا مدخنة، مسك", longevity: "٨–١٠ ساعات" },
  { slug: "nada", name: "نَدى", subtitle: "بداية مضيئة لكل صباح", notes: "برغموت • زهر البرتقال • مسك", price: 2450, displayPrice: "٢٬٤٥٠ ج.م", category: "fresh", categoryLabel: "منعش", tone: "tone-ivory", bottle: "bottle-round", badge: "جديد", description: "تركيبة نظيفة ومضيئة تستحضر أول ضوء في الصباح، بحمضيات رقيقة وزهر برتقال يذوب فوق مسك أبيض هادئ.", topNotes: "برغموت، ليمون أخضر", heartNotes: "زهر البرتقال، ياسمين", baseNotes: "مسك أبيض، أخشاب فاتحة", longevity: "٦–٨ ساعات" },
  { slug: "wajd", name: "وَجد", subtitle: "ورد جريء بنبض شرقي", notes: "ورد طائفي • زعفران • صندل", price: 2650, displayPrice: "٢٬٦٥٠ ج.م", category: "warm", categoryLabel: "دافئ", tone: "tone-olive", bottle: "bottle-tall", description: "لقاء بين الورد الطائفي والزعفران، يهدأ تدريجيًا على قاعدة كريمية من خشب الصندل والجلد الناعم.", topNotes: "زعفران، فلفل أسود", heartNotes: "ورد طائفي، سوسن", baseNotes: "صندل، جلد، مسك", longevity: "٧–٩ ساعات" },
  { slug: "raml", name: "رَمل", subtitle: "دفء الشمس على الحجر", notes: "هيل • تبغ • عنبر", price: 2750, displayPrice: "٢٬٧٥٠ ج.م", category: "woody", categoryLabel: "خشبي", tone: "tone-sand", bottle: "bottle-square", description: "عطر خشبي جاف ومطمئن، تتقدم فيه حبات الهيل نحو قلب من أوراق التبغ وقاعدة عنبرية دافئة.", topNotes: "هيل، قرفة", heartNotes: "تبغ، خشب الأرز", baseNotes: "عنبر، تونكا", longevity: "٨–١٠ ساعات" },
  { slug: "thill", name: "ظِل", subtitle: "هدوء أخضر عميق", notes: "سرو • بخور • فيتيفر", price: 2950, displayPrice: "٢٬٩٥٠ ج.م", category: "woody", categoryLabel: "خشبي", tone: "tone-forest", bottle: "bottle-tall", badge: "إصدار محدود", description: "حضور أخضر ودخاني يجمع السرو والبخور فوق جذور الفيتيفر، لعطر هادئ لكنه واضح الشخصية.", topNotes: "سرو، أوراق خضراء", heartNotes: "بخور، خشب الأرز", baseNotes: "فيتيفر، طحلب، مسك", longevity: "٩–١١ ساعة" },
  { slug: "safa", name: "صَفا", subtitle: "نقاء يلامس البشرة", notes: "تين • شاي أبيض • مسك", price: 2350, displayPrice: "٢٬٣٥٠ ج.م", category: "fresh", categoryLabel: "منعش", tone: "tone-mist", bottle: "bottle-round", description: "عطر يومي شفاف بنفحة تين خضراء وشاي أبيض رقيق، يستقر قريبًا من البشرة على مسك قطني ناعم.", topNotes: "تين أخضر، كمثرى", heartNotes: "شاي أبيض، نيرولي", baseNotes: "مسك قطني، أخشاب بيضاء", longevity: "٥–٧ ساعات" },
];

export const getProduct = (slug: string) => storeProducts.find(product => product.slug === slug);
