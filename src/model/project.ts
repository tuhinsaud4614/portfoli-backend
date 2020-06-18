import Skill from "./skill";

export type ProjectMapType = {
  name: string;
  platform: string;
  skills: Skill[];
  url: string;
  image: string;
  description: string;
};

class Project {
  constructor(
    public id: string,
    public name: string,
    public platform: string,
    public skills: Skill[],
    public url: string,
    public image: string,
    public description: string
  ) {}

  public toMap(): ProjectMapType {
    return {
      name: this.name,
      description: this.description,
      image: this.image,
      platform: this.platform,
      skills: this.skills,
      url: this.url,
    };
  }
}

export default Project;
