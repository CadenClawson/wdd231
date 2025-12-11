// js/storage.js
const KEY = 'dg-favorites';
export function getFavorites(){
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
export function saveFavorites(arr){
  try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch {}
}
export function toggleFavorite(id){
  const fav = new Set(getFavorites());
  if (fav.has(id)) fav.delete(id); else fav.add(id);
  saveFavorites([...fav]);
  return [...fav];
}
