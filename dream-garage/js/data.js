// js/data.js
export async function getCars() {
    try {
      const res = await fetch('cars.json', {cache: "no-store"});
      if (!res.ok) throw new Error(`Network response not ok: ${res.status}`);
      const data = await res.json();
      // basic validation
      if (!Array.isArray(data)) throw new Error('Invalid data format');
      return data;
    } catch (err) {
      console.error('getCars error', err);
      throw err; // let caller handle UI
    }
  }
  