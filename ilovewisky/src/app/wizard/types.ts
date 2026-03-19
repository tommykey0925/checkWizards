export type Wizard = {
  name: string;
  alternateName: string;
  house: string;
  ancestry: string;
  image: string;
}

export const initWizard: Wizard = {
  name: '',
  alternateName: '',
  house: '',
  ancestry: '',
  image: ''
}

export interface HpApiCharacter {
  name: string;
  alternate_names: string[];
  house: string;
  ancestry: string;
  image: string;
}
