import { getCollection } from 'astro:content';

// =============================================================================
// NAVIGATION CONFIGURATION - Single source of truth for ordering
// =============================================================================

/**
 * Docs sections with their display labels and page order.
 * Pages not listed in 'order' will be appended alphabetically.
 */
export const docsSections = [
  { id: '', label: 'Introduction', order: ['index', 'what', 'who', 'why', 'ethos', 'vibes'] },
  { id: 'getting-started', label: 'Getting Started', order: ['index', 'architecture', 'configuring', 'llms'] },
  { id: 'workflow', label: 'Workflow', order: ['index', 'cli', 'deployment', 'troubleshooting'] },
  { id: 'components', label: 'Components', order: ['index'] },
];

/**
 * Field guide page order. Pages not listed will be appended alphabetically.
 */
export const fieldguideOrder = ['index'];

// =============================================================================
// TYPES
// =============================================================================

export interface NavEntry {
  href: string;
  title: string;
  slug: string;
}

export interface NavSection {
  id: string;
  label: string;
  entries: NavEntry[];
}

interface PrevNextResult {
  prev?: NavEntry;
  next?: NavEntry;
}

// =============================================================================
// HELPER: Filter for published content
// =============================================================================

function isPublished(data: { status?: string }) {
  // Only show content explicitly marked as published (draft by default)
  return data.status === 'published';
}

// =============================================================================
// DOCS NAVIGATION
// =============================================================================

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
 * Sort docs by the defined order array, with unlisted items appended alphabetically
 */
function sortByOrder(docs: Array<{ slug: string; data: { title: string } }>, sectionId: string, order: string[]) {
  return docs.sort((a, b) => {
    const aName = a.slug === sectionId ? 'index' : (a.slug.split('/').pop() || a.slug);
    const bName = b.slug === sectionId ? 'index' : (b.slug.split('/').pop() || b.slug);
    const aIndex = order.indexOf(aName);
    const bIndex = order.indexOf(bName);
    if (aIndex === -1 && bIndex === -1) return a.data.title.localeCompare(b.data.title);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

/**
 * Get docs for a specific section, filtered to published only
 */
function filterDocsForSection(allDocs: Array<{ slug: string; data: { title: string } }>, sectionId: string) {
  return allDocs.filter(doc => {
    if (sectionId === '') {
      // Root level docs - exclude subdirectory files
      return !doc.slug.includes('/') &&
             !doc.slug.startsWith('getting-started') &&
             !doc.slug.startsWith('workflow') &&
             !doc.slug.startsWith('components');
    }
    return doc.slug.startsWith(sectionId + '/') || doc.slug === sectionId;
  });
}

/**
 * Get all docs sections with their published, ordered entries for navigation display
 */
export async function getDocsNavSections(): Promise<NavSection[]> {
  const allDocs = await getCollection('docs', ({ data }) => isPublished(data));

  return docsSections.map(section => {
    const sectionDocs = filterDocsForSection(allDocs, section.id);
    const sorted = sortByOrder(sectionDocs, section.id, section.order);

    return {
      id: section.id,
      label: section.label,
      entries: sorted.map(doc => ({
        slug: doc.slug,
        title: doc.data.title,
        href: getDocsHref(doc.slug),
      })),
    };
  });
}

/**
 * Get the flat ordered list of all published docs pages
 */
export async function getOrderedDocs() {
  const sections = await getDocsNavSections();
  return sections.flatMap(section => section.entries);
}

/**
 * Get prev/next navigation for a docs page
 */
export async function getDocsPrevNext(currentSlug: string): Promise<PrevNextResult> {
  const orderedDocs = await getOrderedDocs();
  const normalizedCurrent = currentSlug || 'index';

  const currentIndex = orderedDocs.findIndex(doc => {
    if (doc.slug === normalizedCurrent) return true;
    if (doc.slug === normalizedCurrent + '/index') return true;
    if (doc.slug.endsWith('/index') && doc.slug.replace('/index', '') === normalizedCurrent) return true;
    return false;
  });

  if (currentIndex === -1) return {};

  const result: PrevNextResult = {};
  if (currentIndex > 0) {
    result.prev = orderedDocs[currentIndex - 1];
  }
  if (currentIndex < orderedDocs.length - 1) {
    result.next = orderedDocs[currentIndex + 1];
  }
  return result;
}

// =============================================================================
// FIELDGUIDE NAVIGATION
// =============================================================================

/**
 * Get all published fieldguide entries, properly ordered for navigation
 */
export async function getFieldguideNavEntries(): Promise<NavEntry[]> {
  const entries = await getCollection('fieldguide', ({ data }) => isPublished(data));

  // Sort by defined order, then alphabetically for unlisted items
  const sorted = entries.sort((a, b) => {
    const aIndex = fieldguideOrder.indexOf(a.slug);
    const bIndex = fieldguideOrder.indexOf(b.slug);
    if (aIndex === -1 && bIndex === -1) return a.data.title.localeCompare(b.data.title);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return sorted.map(entry => ({
    slug: entry.slug,
    title: entry.data.title,
    href: entry.slug === 'index' ? '/fieldguide/' : `/fieldguide/${entry.slug}/`,
  }));
}

/**
 * Get the flat ordered list of all published fieldguide pages (alias for consistency)
 */
export async function getOrderedFieldguide() {
  return getFieldguideNavEntries();
}

/**
 * Get prev/next navigation for a fieldguide page
 */
export async function getFieldguidePrevNext(currentSlug: string): Promise<PrevNextResult> {
  const orderedEntries = await getOrderedFieldguide();
  const normalizedCurrent = currentSlug || 'index';
  const currentIndex = orderedEntries.findIndex(entry => entry.slug === normalizedCurrent);

  if (currentIndex === -1) return {};

  const result: PrevNextResult = {};
  if (currentIndex > 0) {
    result.prev = orderedEntries[currentIndex - 1];
  }
  if (currentIndex < orderedEntries.length - 1) {
    result.next = orderedEntries[currentIndex + 1];
  }
  return result;
}
