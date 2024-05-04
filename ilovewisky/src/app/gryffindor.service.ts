import { Injectable } from '@angular/core';
import { initwizard, Wizard } from './wizard/types';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GryffindorService {

  constructor() { }

  wizard: Wizard = initwizard;

  async setWizard() {
    const num: number = Math.floor(Math.random() * 20)
    const res = await axios.get('https://hp-api.onrender.com/api/characters');
    const tar = res.data.slice(0, 80).filter((e: any) => e.house == 'Gryffindor')[num];
    this.wizard = {
      name: tar.name,
      altername: tar.alternate_names[0],
      ancestry: tar.ancestry
    }
  }
}
