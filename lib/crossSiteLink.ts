// Cross-site link rule: a link that points to a DIFFERENT sosmed site (www / studio /
// umkm) opens in a new tab; same-site links (relative, or absolute to the current host)
// open in the same tab. Returns spreadable anchor props — apply at each render site:
//   <a href={h} {...crossSiteProps(h, OWN_HOST)}>
// This repo serves umkm.sosmed.io, so OWN_HOST is "umkm.sosmed.io".

const SOSMED_HOSTS = new Set([
  "www.sosmed.io",
  "studio.sosmed.io",
  "umkm.sosmed.io",
  "sosmed.io",
]);

export function crossSiteProps(
  href: string,
  ownHost: string,
): { target: "_blank"; rel: "noopener noreferrer" } | Record<string, never> {
  try {
    // Relative hrefs resolve against ownHost → same host → no target.
    const u = new URL(href, `https://${ownHost}`);
    if (u.host !== ownHost && SOSMED_HOSTS.has(u.host)) {
      return { target: "_blank", rel: "noopener noreferrer" };
    }
  } catch {
    // malformed href → leave untouched
  }
  return {};
}
