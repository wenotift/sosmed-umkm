"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Client-side category filter for the /blog post grid. Receives the posts
 * (with precomputed thumbnail URLs) from the server page; holds the active
 * category in state and filters the grid. "Semua" shows all. Categories with
 * no posts show a friendly empty state rather than a blank grid. The tab row
 * is a single-line horizontal slider on mobile (see .blog-page .tabs CSS).
 */

export type BlogCard = {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  thumb: string;
};

// All tabs are always shown, even categories with zero posts.
const CATEGORIES = ["Semua", "Tips Bisnis", "Panduan", "Produk", "Cerita"];

export default function BlogGrid({ posts }: { posts: BlogCard[] }) {
  const [active, setActive] = useState("Semua");
  const filtered =
    active === "Semua" ? posts : posts.filter((p) => p.tag === active);

  return (
    <>
      <div className="tabbar">
        <div className="tabs" role="tablist" aria-label="Kategori artikel">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              className={`t${active === cat ? " active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid">
          {filtered.map((post) => (
            <Link
              className="card"
              href={`/blog/${post.slug}`}
              key={post.slug}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="thumb"
                style={{ backgroundImage: `url('${post.thumb}')` }}
              ></div>
              <div className="cbody">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="divider"></div>
                <div className="byline">
                  <span className="av">S</span> <b>Tim Sosmed AI</b>
                </div>
                <div className="meta-row">
                  <span>2 Juni 2026</span>
                  <span className="sep"></span>
                  <span className="tag">{post.tag}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-cat">Belum ada artikel di kategori ini.</div>
      )}
    </>
  );
}
