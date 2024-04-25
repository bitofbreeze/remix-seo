import { EntryContext, AppLoadContext } from "@remix-run/server-runtime";
import { SEOOptions } from "../types";
import { getSitemapXml } from "./utils";

export async function generateSitemap(
  request: Request,
  remixEntryContent: EntryContext,
  options: SEOOptions,
  context?: AppLoadContext
) {
  const { siteUrl, headers } = options;
  const sitemap = await getSitemapXml(request, remixEntryContent, {
    siteUrl,
  }, context);
  const bytes = new TextEncoder().encode(sitemap).byteLength
  
  return new Response(sitemap, {
    headers: {
      ...headers,
      "Content-Type": "application/xml",
      "Content-Length": String(bytes),
    },
  });
}
