import Skill from "../model/skill";
import Project from "../model/project";

export const getSkillsFromProjects = (projects: Project[]): Skill[] => {
  const newSkills: Skill[] = [];
  projects.forEach((project) => {
    project.skills.forEach((skill) => {
      const sI = newSkills.findIndex((sk) => sk.id === skill.id);
      if (sI < 0) {
        newSkills.push(skill);
      }
    });
  });
  return newSkills;
};
