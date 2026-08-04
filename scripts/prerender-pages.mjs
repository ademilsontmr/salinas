/**
 * Pré-renderiza rotas em HTML estático após o build.
 * Reduz solicitações ao Worker do Cloudflare Pages: páginas servidas direto do CDN.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const ssrEntry = join(root, "node_modules/.nitro/vite/services/ssr/index.js");

function getRoutes() {
  const postsContent = readFileSync(join(root, "src/lib/blog-posts.ts"), "utf8");
  const rawSection = postsContent.split("const rawPosts")[1]?.split("];")[0] ?? "";
  const slugs = [...rawSection.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
  return ["/", "/blog", ...slugs.map((slug) => `/blog/${slug}`)];
}

function routeToOutputPath(route) {
  if (route === "/") return join(dist, "index.html");
  return join(dist, route.slice(1), "index.html");
}

async function main() {
  const server = (await import(ssrEntry)).default;
  const routes = getRoutes();

  for (const route of routes) {
    const response = await server.fetch(new Request(`http://localhost${route}`));
    const html = await response.text();
    if (!response.ok) {
      throw new Error(`Falha ao pré-renderizar ${route}: HTTP ${response.status}`);
    }

    const outputPath = routeToOutputPath(route);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, html, "utf8");
    console.log(`  ${route} → ${outputPath.replace(root + "/", "")}`);
  }

  // Cloudflare exige ao menos 1 regra include. include/exclude em "/" desativa o Worker
  // para todo tráfego real (exclude tem prioridade; demais rotas não batem no include).
  const routesJson = {
    version: 1,
    include: ["/"],
    exclude: ["/"],
  };
  writeFileSync(join(dist, "_routes.json"), JSON.stringify(routesJson, null, 2) + "\n", "utf8");

  console.log(`\nPré-renderizadas ${routes.length} páginas. Worker inativo para tráfego normal (_routes.json include/exclude: /).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
