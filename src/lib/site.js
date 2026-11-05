// One place for the facts the SEO tags, sitemap, robots, manifest and structured data share.

// Production address. Override per deployment (e.g. a staging URL) with NEXT_PUBLIC_SITE_URL.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://yourcreativecorner.com").replace(/\/$/, "");

export const site = {
  name: "Creative Corner",
  url: SITE_URL,
  // ~60 characters so search results don't cut it off
  title: "Creative Corner | Digital Marketing, Influencer & Video Agency",
  // ~155 characters, the length Google shows in results
  description:
    "Creative Corner is a digital marketing agency for social media growth, influencer marketing, video production and website development that gets brands noticed.",
  tagline: "We build digital experiences that stand out.",
  locale: "en_IN",
  email: "contact-us@yourcreativecorner.com",
  phone: "+91-77389-38443",
  whatsapp: "+91-75594-10689",
  services: [
    {
      name: "Digital Marketing",
      description: "Performance marketing: paid ads, funnels, landing pages, conversion optimisation, email and automation.",
    },
    {
      name: "Influencer Marketing",
      description: "Influencer research, creator partnerships, UGC, reels and short-form content with ROI tracking.",
    },
    {
      name: "Video Production",
      description: "Video strategy, storyboarding, editing, motion graphics, ad films, reels and YouTube optimisation.",
    },
    {
      name: "Website Development",
      description: "Custom websites, from ideation through complex builds, designed to convert.",
    },
  ],
  keywords: [
    "Creative Corner",
    "digital marketing agency",
    "social media marketing agency",
    "influencer marketing agency",
    "video production agency",
    "reels production",
    "performance marketing",
    "website development",
    "content creation",
    "brand strategy",
    "India",
  ],
  social: {
    instagram: "https://www.instagram.com/_yourcreativecorner_/",
    facebook: "https://www.facebook.com/profile.php?id=61585698844927",
  },
};
