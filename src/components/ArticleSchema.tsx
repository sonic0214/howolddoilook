interface ArticleSchemaProps {
  type: 'Article' | 'BlogPosting';
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  imageCreator?: string;
  imageCreditText?: string;
  imageCopyrightNotice?: string;
  url: string;
}

export default function ArticleSchema({
  type,
  title,
  description,
  author,
  datePublished,
  dateModified = datePublished,
  imageUrl,
  imageCreator = "Pexels",
  imageCreditText = "Photo provided by Pexels",
  imageCopyrightNotice = "© Pexels. Licensed under Pexels License.",
  url
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": type,
    "headline": title,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://howolddoilook.art/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Lumin AI",
      "url": "https://howolddoilook.art/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://howolddoilook.art/og-image.jpg"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(imageUrl && {
      "image": {
        "@type": "ImageObject",
        "url": imageUrl,
        "width": 1200,
        "height": 630,
        "creator": {
          "@type": "Organization",
          "name": imageCreator
        },
        "creditText": imageCreditText,
        "copyrightNotice": imageCopyrightNotice
      }
    }),
    "articleSection": "Beauty & Wellness",
    "keywords": ["skincare", "beauty", "health", "wellness", "age analysis"],
    "inLanguage": "en-US"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}