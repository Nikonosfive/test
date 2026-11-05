/** GitHub Pages の project site でも壊れない内部 URL を返します。 */
export const baseUrl = import.meta.env.BASE_URL;

export function sitePath(path = '/') {
  const cleanPath = path.replace(/^\/+/, '');
  return `${baseUrl}${cleanPath}`;
}
