import { useEffect } from 'react';

/** Keeps document.title in step with the page. */
export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

/**
 * Points the canonical link and og:url at this page's own address under
 * `siteUrl`. Every route serves the same index.html, so it cannot be static.
 */
export function useCanonical(siteUrl: string | undefined, pathname: string) {
  useEffect(() => {
    if (!siteUrl) return;
    const href = siteUrl.replace(/\/+$/, '') + pathname;
    head('link', 'rel', 'canonical').setAttribute('href', href);
    head('meta', 'property', 'og:url').setAttribute('content', href);
  }, [siteUrl, pathname]);
}

function head(tag: 'link' | 'meta', attr: string, value: string): Element {
  let el = document.head.querySelector(`${tag}[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(attr, value);
    document.head.append(el);
  }
  return el;
}
