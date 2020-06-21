import { Project, Technique } from "../model";

export const getsTechniquesFromProjects = (projects: Project[]): Technique[] => {
  const newTechniques: Technique[] = [];
  projects.forEach((project) => {
    project.techniques.forEach((technique) => {
      const tI = newTechniques.findIndex((t) => t.id === technique.id);
      if (tI < 0) {
        newTechniques.push(technique);
      }
    });
  });
  return newTechniques;
};
