import { Injectable } from '@angular/core';
import { initwizard, Wizard } from './wizard/types';
import axios from 'axios';

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
      const res = await axios.get('https://hp-api.onrender.com/api/characters');
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
      this.error = 'Failed to fetch wizard. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
