export type RootState = {
  version: string;
}

export type Wizard = {
  name: string;
  firstAlternateName: string;
  house: string;
  ancestry: string;
}
export const initWizard: Wizard = {
  name: "",
  firstAlternateName: "",
  house: "",
  ancestry: ""
}

export type WizardState = {
  wizard: Wizard
}

export const initWizardState: WizardState = {
  wizard: initWizard
}