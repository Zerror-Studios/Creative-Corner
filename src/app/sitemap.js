import { site } from "@/lib/site";

// Single-page site: the sections (#about, #services, #work) are part of "/", not separate URLs.
// Add an entry here for every new page.
export default function sitemap() {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${site.url}/opengraph-image.jpg`],
    },
  ];
}
