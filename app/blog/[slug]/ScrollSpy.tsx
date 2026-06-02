"use client";

import { useEffect } from "react";

/**
 * Scroll-spy for the article's right-side "Daftar Isi" TOC. Highlights the
 * active section link as you scroll. Renders nothing - the TOC markup itself
 * is server-rendered (works without JS); this only toggles the .active class.
 * Ported from the reference's inline scroll-spy script.
 */
export default function ScrollSpy() {
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".article-page .toc a"),
    );
    const sections = links.map((a) =>
      document.getElementById(a.getAttribute("href")!.slice(1)),
    );
    const onScroll = () => {
      let cur = sections[0]?.id;
      for (const s of sections) {
        if (s && s.getBoundingClientRect().top <= 120) cur = s.id;
      }
      links.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + cur),
      );
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
