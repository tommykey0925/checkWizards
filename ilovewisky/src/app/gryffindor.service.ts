import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';
import { initWizard, Wizard, HpApiCharacter } from './wizard/types';

const fallbackWizards: Wizard[] = [
  { name: 'Harry Potter', alternateName: 'The Boy Who Lived', house: 'Gryffindor', ancestry: 'half-blood', image: '' },
  { name: 'Hermione Granger', alternateName: '', house: 'Gryffindor', ancestry: 'muggleborn', image: '' },
  { name: 'Ron Weasley', alternateName: 'Ronnie', house: 'Gryffindor', ancestry: 'pure-blood', image: '' },
  { name: 'Draco Malfoy', alternateName: '', house: 'Slytherin', ancestry: 'pure-blood', image: '' },
  { name: 'Luna Lovegood', alternateName: '', house: 'Ravenclaw', ancestry: 'half-blood', image: '' },
  { name: 'Neville Longbottom', alternateName: '', house: 'Gryffindor', ancestry: 'pure-blood', image: '' },
  { name: 'Cedric Diggory', alternateName: '', house: 'Hufflepuff', ancestry: 'half-blood', image: '' },
  { name: 'Severus Snape', alternateName: 'Half-Blood Prince', house: 'Slytherin', ancestry: 'half-blood', image: '' },
  { name: 'Albus Dumbledore', alternateName: '', house: 'Gryffindor', ancestry: 'half-blood', image: '' },
  { name: 'Minerva McGonagall', alternateName: '', house: 'Gryffindor', ancestry: 'half-blood', image: '' },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

@Injectable({
  providedIn: 'root'
})
export class GryffindorService {
  wizard: Wizard = { ...initWizard };
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  async setWizard() {
    this.loading = true;
    this.error = null;
    try {
      const data = await firstValueFrom(
        this.http
          .get<HpApiCharacter[]>('https://hp-api.onrender.com/api/characters')
          .pipe(timeout(5000))
      );
      const characters = data.filter((c) => c.name && c.house);
      if (characters.length === 0) throw new Error('No characters found');
      const c = pickRandom(characters.slice(0, 40));
      this.wizard = {
        name: c.name,
        alternateName: c.alternate_names?.[0] ?? '',
        house: c.house,
        ancestry: c.ancestry ?? 'unknown',
        image: c.image ?? ''
      };
    } catch {
      this.wizard = { ...pickRandom(fallbackWizards) };
      this.error = 'API unavailable - showing offline data';
    } finally {
      this.loading = false;
    }
  }
}
