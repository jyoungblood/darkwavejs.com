import { getCollection } from 'astro:content';

// Docs section configuration - defines the order of pages
const docsSections = [
  { id: '', order: ['index', 'what', 'who', 'why', 'ethos', 'vibes'] },
  { id: 'getting-started', order: ['index', 'architecture', 'configuring', 'llms'] },
  { id: 'workflow', order: ['index', 'cli', 'deployment', 'troubleshooting'] },
  { id: 'components', order: ['index'] }, // Rest added dynamically
];

interface NavEntry {
  href: string;
  title: string;
}

interface PrevNextResult {
  prev?: NavEntry;
  next?: NavEntry;
}

/**
 * Get the flat ordered list of all docs pages
 */
export async function getOrderedDocs() {
  const allDocs = await getCollection('docs', ({ data }) => {
    return !data.status || data.status === 'published';
  });

  const orderedDocs: Array<{ slug: string; title: string }> = [];

  for (const section of docsSections) {
    // Get docs for this section
    const sectionDocs = allDocs.filter(doc => {
      if (section.id === '') {
        return !doc.slug.includes('/') &&
               !doc.slug.startsWith('getting-started') &&
               !doc.slug.startsWith('workflow') &&
               !doc.slug.startsWith('components');
      }
      return doc.slug.startsWith(section.id + '/') || doc.slug === section.id;
    });

    // Sort by defined order
    const sorted = sectionDocs.sort((a, b) => {
      const aName = a.slug === section.id ? 'index' : (a.slug.split('/').pop() || a.slug);
      const bName = b.slug === section.id ? 'index' : (b.slug.split('/').pop() || b.slug);
      const aIndex = section.order.indexOf(aName);
      const bIndex = section.order.indexOf(bName);
      if (aIndex === -1 && bIndex === -1) return a.data.title.localeCompare(b.data.title);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

    for (const doc of sorted) {
      orderedDocs.push({ slug: doc.slug, title: doc.data.title });
    }
  }

  return orderedDocs;
}

/**
 * Get prev/next navigation for a docs page
 */
export async function getDocsPrevNext(currentSlug: string): Promise<PrevNextResult> {
  const orderedDocs = await getOrderedDocs();

  // Normalize the slug for comparison
  const normalizedCurrent = currentSlug || 'index';

  const currentIndex = orderedDocs.findIndex(doc => {
    // Handle various slug formats
    if (doc.slug === normalizedCurrent) return true;
    if (doc.slug === normalizedCurrent + '/index') return true;
    if (doc.slug.endsWith('/index') && doc.slug.replace('/index', '') === normalizedCurrent) return true;
    return false;
  });

  if (currentIndex === -1) {
    return {};
  }

  const result: PrevNextResult = {};

  if (currentIndex > 0) {
    const prev = orderedDocs[currentIndex - 1];
    result.prev = {
      href: getDocsHref(prev.slug),
      title: prev.title,
    };
  }

  if (currentIndex < orderedDocs.length - 1) {
    const next = orderedDocs[currentIndex + 1];
    result.next = {
      href: getDocsHref(next.slug),
      title: next.title,
    };
  }

  return result;
}

function getDocsHref(slug: string): string {
  if (slug === 'index') {
    return '/docs/';
  }
  if (slug.endsWith('/index')) {
    return `/docs/${slug.replace('/index', '')}/`;
  }
  return `/docs/${slug}/`;
}

/**
 * Get the flat ordered list of all fieldguide pages
 */
export async function getOrderedFieldguide() {
  const entries = await getCollection('fieldguide', ({ data }) => {
    return !data.status || data.status === 'published';
  });

  // Sort: index first, then alphabetically by title
  return entries.sort((a, b) => {
    if (a.slug === 'index') return -1;
    if (b.slug === 'index') return 1;
    return a.data.title.localeCompare(b.data.title);
  }).map(entry => ({ slug: entry.slug, title: entry.data.title }));
}

/**
 * Get prev/next navigation for a fieldguide page
 */
export async function getFieldguidePrevNext(currentSlug: string): Promise<PrevNextResult> {
  const orderedEntries = await getOrderedFieldguide();

  const normalizedCurrent = currentSlug || 'index';

  const currentIndex = orderedEntries.findIndex(entry => entry.slug === normalizedCurrent);

  if (currentIndex === -1) {
    return {};
  }

  const result: PrevNextResult = {};

  if (currentIndex > 0) {
    const prev = orderedEntries[currentIndex - 1];
    result.prev = {
      href: prev.slug === 'index' ? '/fieldguide/' : `/fieldguide/${prev.slug}/`,
      title: prev.title,
    };
  }

  if (currentIndex < orderedEntries.length - 1) {
    const next = orderedEntries[currentIndex + 1];
    result.next = {
      href: next.slug === 'index' ? '/fieldguide/' : `/fieldguide/${next.slug}/`,
      title: next.title,
    };
  }

  return result;
}
