export interface Language {
  id: string;
  name: string;
}

export interface Platform {
  id: string;
  name: string;
  technologyId: TechnologyType;
}

export interface Technique {
  id: string;
  name: string;
  technologyId: TechnologyType;
}

export enum TechnologyType {
  WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
  MOBILE_DEVELOPMENT = "MOBILE_DEVELOPMENT",
  DATABASE_DEVELOPMENT = "DATABASE_DEVELOPMENT",
}
