import type { BlogPost } from "./blog-posts";
import { BLOG_SUBSECTIONS } from "./blog-subsections";
import { applyBoldPhrases, stripRichMarkup } from "./blog-rich-text";
import { DOMAIN, FORM_URL, OG_IMAGE, SITE_NAME, SITE_URL, formatDomainsListPt } from "./site";

const HOME_TITLE = `Cassino de Salinas à Venda | ${DOMAIN}`;
const HOME_DESCRIPTION =
  `Domínio premium ${DOMAIN} à venda. Oportunidade para turismo, resorts, hotelaria e entretenimento regulado em Salinas.`;

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cassino de Salinas",
    url: SITE_URL,
    logo: OG_IMAGE,
    email: "contato@cassinodesalinas.com.br",
    areaServed: {
      "@type": "City",
      name: "Salinas",
      containedInPlace: { "@type": "State", name: "Alagoas" },
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: "Cassino de Salinas", url: SITE_URL },
  };
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getHomeProductJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Domínio Premium — ${DOMAIN}`,
    description: HOME_DESCRIPTION,
    brand: { "@type": "Brand", name: "Cassino de Salinas" },
    category: "Domínio de internet",
    url: SITE_URL,
    image: OG_IMAGE,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "BRL",
      url: FORM_URL,
      seller: { "@type": "Organization", name: "Cassino de Salinas" },
    },
  };
}

export function getHomeWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    inLanguage: "pt-BR",
    isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
    about: [
      { "@type": "Thing", name: "Domínio premium à venda" },
      { "@type": "Place", name: "Salinas" },
      { "@type": "Thing", name: "Regulação de cassinos no Brasil" },
    ],
  };
}

export function getFaqJsonLd(faqItems: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function getHomeHeadMeta(faqItems: { q: string; a: string }[]) {
  return {
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESCRIPTION },
      {
        name: "keywords",
        content:
          "cassino Salinas, cassino Alagoas, domínio premium à venda, comprar domínio, cassinodesalinas.com.br, turismo salinas, hotelaria, resorts, regulação cassinos brasil, entretenimento regulado",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "author", content: "Cassino de Salinas" },
      { name: "geo.region", content: "BR-AL" },
      { name: "geo.placename", content: "Salinas" },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: "Domínio premium Cassino de Salinas à venda" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(getOrganizationJsonLd()) },
      { type: "application/ld+json", children: JSON.stringify(getWebSiteJsonLd()) },
      { type: "application/ld+json", children: JSON.stringify(getHomeWebPageJsonLd()) },
      { type: "application/ld+json", children: JSON.stringify(getHomeProductJsonLd()) },
      { type: "application/ld+json", children: JSON.stringify(getFaqJsonLd(faqItems)) },
    ],
  };
}

export function getBlogIndexHeadMeta(posts: BlogPost[]) {
  const title = "Blog | Cassino de Salinas — Emprego, Renda e Regulação";
  const description =
    "Artigos sobre cassinos regulados em Salinas e no Brasil: emprego formal, renda municipal, moderação, resorts integrados, turismo e jogo responsável.";
  const url = `${SITE_URL}/blog`;

  return {
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "blog cassino Salinas, regulação cassinos brasil, emprego hotelaria salinas, jogo responsável, resorts Alagoas, turismo entretenimento salinas",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog Cassino de Salinas",
          description,
          url,
          inLanguage: "pt-BR",
          publisher: { "@type": "Organization", name: "Cassino de Salinas", url: SITE_URL },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.date,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Artigos sobre cassino e regulação em Salinas",
          itemListElement: posts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/blog/${p.slug}`,
            name: p.title,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          getBreadcrumbJsonLd([
            { name: "Início", url: SITE_URL },
            { name: "Blog", url },
          ]),
        ),
      },
    ],
  };
}

function stripManualLinks(text: string): string {
  return stripRichMarkup(text);
}

function getPostPlainText(post: BlogPost): string {
  const subsectionText = (BLOG_SUBSECTIONS[post.slug] ?? []).flatMap((s) => [s.heading, ...s.paragraphs]);
  const faqText = post.faq.flatMap((f) => [f.q, f.a]);

  return [
    ...post.sections.flatMap((s) => [
      ...(s.listItems ?? []),
      ...s.paragraphs.map(applyBoldPhrases),
      ...(s.orderedItems ?? []),
      ...(s.highlights ?? []),
    ]),
    ...subsectionText.map(applyBoldPhrases),
    ...faqText.map(applyBoldPhrases),
  ]
    .map(stripManualLinks)
    .join(" ");
}

export function getBlogPostHeadMeta(post: BlogPost) {
  const title = `${post.title} | Blog Cassino de Salinas`;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const keywords = post.keywords.join(", ");
  const wordCount = getPostPlainText(post).split(/\s+/).length;

  return {
    meta: [
      { title },
      { name: "description", content: post.excerpt },
      { name: "keywords", content: keywords },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "Cassino de Salinas" },
      { property: "og:title", content: title },
      { property: "og:description", content: post.excerpt },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: OG_IMAGE },
      { property: "article:published_time", content: post.date },
      { property: "article:modified_time", content: post.date },
      { property: "article:section", content: "Regulação e turismo" },
      { property: "article:tag", content: post.keywords[0] },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: post.excerpt },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: "pt-BR",
          url,
          wordCount,
          keywords,
          image: OG_IMAGE,
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          articleBody: getPostPlainText(post),
          author: { "@type": "Organization", name: "Cassino de Salinas", url: SITE_URL },
          publisher: {
            "@type": "Organization",
            name: "Cassino de Salinas",
            url: SITE_URL,
            logo: { "@type": "ImageObject", url: OG_IMAGE },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          getBreadcrumbJsonLd([
            { name: "Início", url: SITE_URL },
            { name: "Blog", url: `${SITE_URL}/blog` },
            { name: post.title, url },
          ]),
        ),
      },
      ...(post.faq.length > 0
        ? [
            {
              type: "application/ld+json" as const,
              children: JSON.stringify(getFaqJsonLd(post.faq)),
            },
          ]
        : []),
    ],
  };
}
