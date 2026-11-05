// One place for the facts the SEO tags, sitemap, robots, manifest and structured data share.

// The address the site is actually served from. The share banner, canonical link and sitemap
// are absolute URLs built on it, so it must point at a host that serves THIS build — otherwise
// WhatsApp/LinkedIn/etc. fetch the banner from a host that 404s and show no image.
//   1. NEXT_PUBLIC_SITE_URL, if set
//   2. On Vercel: the project's production domain. That is yourcreativecorner.com once the domain
//      is added to the Vercel project, and the *.vercel.app domain until then.
//   3. Otherwise (local builds) the final domain
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const vercelHost =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;
  return "https://yourcreativecorner.com";
}

export const SITE_URL = resolveSiteUrl().replace(/\/$/, "");

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
