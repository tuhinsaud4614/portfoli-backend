export interface Project {
  id: string;
  name: string;
  platform: string;
  techniques: Technique[];
  url: string;
  image: string;
  description: string;
}

export interface ProjectWithoutId {
  name: string;
  platform: string;
  techniques: Technique[];
  url: string;
  image: string;
  description: string;
}

export interface Language {
  id: string;
  name: string;
}

export interface LanguageWithoutId {
  name: string;
}

export interface Platform {
  id: string;
  name: string;
  technologyId: TechnologyType;
}

export interface PlatformWithoutId {
  name: string;
  technologyId: TechnologyType;
}

export interface Technique {
  id: string;
  name: string;
  technologyId: TechnologyType;
}

export interface TechniqueWithoutId {
  name: string;
  technologyId: TechnologyType;
}

export enum TechnologyType {
  WEB_DEVELOPMENT = "WEB_DEVELOPMENT",
  MOBILE_DEVELOPMENT = "MOBILE_DEVELOPMENT",
  DATABASE_DEVELOPMENT = "DATABASE_DEVELOPMENT",
}
