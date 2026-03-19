import { Injectable } from '@angular/core';
import { initwizard, Wizard } from './wizard/types';
import axios from 'axios';

const fallbackWizards: Wizard[] = [
  { name: 'Harry Potter', alternateName: 'The Boy Who Lived', house: 'Gryffindor', ancestry: 'half-blood', image: '' },
  { name: 'Hermione Granger', alternateName: '', house: 'Gryffindor', ancestry: 'muggleborn', image: '' },
  { name: 'Ron Weasley', alternateName: 'Ronnie', house: 'Gryffindor', ancestry: 'pure-blood', image: '' },
  { name: 'Draco Malfoy', alternateName: '', house: 'Slytherin', ancestry: 'pure-blood', image: '' },
  { name: 'Luna Lovegood', alternateName: '', house: 'Ravenclaw', ancestry: 'half-blood', image: '' },
  { name: 'Cedric Diggory', alternateName: '', house: 'Hufflepuff', ancestry: 'half-blood', image: '' },
  { name: 'Severus Snape', alternateName: 'Half-Blood Prince', house: 'Slytherin', ancestry: 'half-blood', image: '' },
  { name: 'Albus Dumbledore', alternateName: '', house: 'Gryffindor', ancestry: 'half-blood', image: '' },
];

@Injectable({
  providedIn: 'root'
})
export class GryffindorService {
  wizard: Wizard = { ...initwizard };
  loading = false;
  error: string | null = null;

  async setWizard() {
    this.loading = true;
    this.error = null;
    try {
      const res = await axios.get('https://hp-api.onrender.com/api/characters', { timeout: 5000 });
      const characters = res.data.filter((c: any) => c.name && c.house);
      const idx = Math.floor(Math.random() * Math.min(characters.length, 40));
      const c = characters[idx];
      this.wizard = {
        name: c.name,
        alternateName: c.alternate_names?.[0] ?? '',
        house: c.house,
        ancestry: c.ancestry ?? 'unknown',
        image: c.image ?? ''
      };
    } catch {
      const idx = Math.floor(Math.random() * fallbackWizards.length);
      this.wizard = { ...fallbackWizards[idx] };
      this.error = 'API unavailable - showing offline data';
    } finally {
      this.loading = false;
    }
  }
}
