import { getCollection, getEntry } from 'astro:content';

/** Resolve a `pages` collection entry by slug id (e.g. `home`). */
export async function loadContentPage(id: string) {
  const ref = { collection: 'pages' as const, id };
  let entry = await getEntry(ref);
  if (!entry) {
    const pages = await getCollection('pages');
    entry = pages.find((page) => page.id === id);
  }
  if (!entry) {
    const available = (await getCollection('pages')).map((page) => page.id).join(', ');
    throw new Error(
      `Content page not found: ${id}${available ? `. Available: ${available}` : ' (pages collection is empty — run astro sync or restart dev)'}`,
    );
  }
  return entry;
}
