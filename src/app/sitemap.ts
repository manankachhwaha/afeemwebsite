import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { serviceCategories } from "@/data/services";
import { courses } from "@/data/courses";
import { branches } from "@/data/branches";
import { journalPosts } from "@/data/journal";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/salon-spa",
    "/bridal",
    "/beauty-school",
    "/transformations",
    "/about",
    "/journal",
    "/locations",
    "/contact",
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = serviceCategories.map((c) => ({
    url: `${site.url}/salon-spa/${c.slug}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = serviceCategories.flatMap((c) =>
    c.services.map((s) => ({
      url: `${site.url}/salon-spa/${c.slug}/${s.slug}`,
      lastModified: new Date(),
    }))
  );

  const courseRoutes = courses.map((c) => ({
    url: `${site.url}/beauty-school/${c.slug}`,
    lastModified: new Date(),
  }));

  const branchRoutes = branches.map((b) => ({
    url: `${site.url}/locations/${b.slug}`,
    lastModified: new Date(),
  }));

  const journalRoutes = journalPosts.map((p) => ({
    url: `${site.url}/journal/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes, ...courseRoutes, ...branchRoutes, ...journalRoutes];
}
