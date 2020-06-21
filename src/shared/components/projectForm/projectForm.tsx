import React, { useState, useEffect } from "react";
import validator from "validator";

import { Technique, Project, Platform } from "../../../model";
import Input from "../../UI/input/input";
import Button from "../../UI/button/button";
import TaggedInput from "../../UI/taggedInput/taggedInput";
import ProgressIndicator from "../../UI/progressIndicator/progressIndicator";
import classes from "./projectForm.module.css";

interface FormConfig {
  type?: string;
  placeholder?: string;
  options?: { value: string; displayValue: string }[];
}

interface FormValidator {
  required: boolean;
  maxLength?: number;
  minLength?: number;
  isUrl?: boolean;
}

interface FormState {
  addProjectForm: {
    [key: string]: {
      elementType: string;
      label: string;
      config: FormConfig;
      validator: FormValidator;
      value: string;
      touched: boolean;
      isValid: boolean;
    };
  };
  techniques: Technique[];
  formIsValid: boolean;
}

interface Props {
  title: string;
  techniques: Technique[];
  platforms: Platform[];
  submitted: (project: Project) => void;
  isSaving: boolean;
  project?: Project;
}

const ProjectForm: React.FC<Props> = (props) => {
  const platformValues: {
    value: string;
    displayValue: string;
  }[] = props.platforms.map((p) => {
    return { value: p.name, displayValue: p.name };
  });
  const [formState, setFormState] = useState<FormState>({
    addProjectForm: {
      name: {
        elementType: "input",
        label: "Project Name",
        config: {
          type: "text",
          placeholder: "Enter project name.",
        },
        validator: {
          maxLength: 120,
          minLength: 2,
          required: true,
        },
        value: "",
        touched: false,
        isValid: false,
      },
      projectType: {
        elementType: "select",
        label: "Project Platform/Type",
        config: {
          options: [
            ...platformValues,
            // { value: "React JS", displayValue: "React JS" },
            // { value: "React Native", displayValue: "React Native" },
            // { value: "MERN", displayValue: "MERN" },
            // { value: "Flutter", displayValue: "Flutter" },
            // { value: "TKinter", displayValue: "TKinter" },
          ],
        },
        validator: {
          required: true,
        },
        value: "React JS",
        touched: false,
        isValid: true,
      },
      projectUrl: {
        elementType: "input",
        label: "Project URL",
        config: {
          type: "url",
          placeholder: "Enter project url.",
        },
        validator: {
          isUrl: true,
          required: true,
        },
        value: "",
        touched: false,
        isValid: false,
      },
      projectImgUrl: {
        elementType: "input",
        label: "Project Image URL",
        config: {
          type: "url",
          placeholder: "Enter project image url.",
        },
        validator: {
          isUrl: true,
          required: true,
        },
        value: "",
        touched: false,
        isValid: false,
      },
      description: {
        elementType: "textarea",
        label: "Project Description",
        config: {
          placeholder: "Enter project description.",
        },
        validator: {
          required: true,
        },
        value: "",
        touched: false,
        isValid: false,
      },
    },
    techniques: [],
    formIsValid: false,
  });

  useEffect(() => {
    if (props.project) {
      const newFormState: FormState = JSON.parse(JSON.stringify(formState));
      newFormState.addProjectForm.name.value = props.project.name;
      newFormState.addProjectForm.projectType.value = props.project.platform;
      newFormState.addProjectForm.projectUrl.value = props.project.url;
      newFormState.addProjectForm.projectImgUrl.value = props.project.image;
      newFormState.addProjectForm.description.value = props.project.description;

      for (const key in newFormState.addProjectForm) {
        if (newFormState.addProjectForm.hasOwnProperty(key)) {
          newFormState.addProjectForm[key].isValid = true;
          newFormState.addProjectForm[key].touched = true;
        }
      }
      newFormState.techniques = props.project.techniques;
      newFormState.formIsValid = true;
      setFormState(newFormState);
    } else {
      return;
    }
    setFormState((prevFormState: FormState) => ({
      ...prevFormState,
      addProjectForm: {
        ...prevFormState.addProjectForm,
      },
    }));
  }, []);

  const checkValidation = (rules: FormValidator, value: string): boolean => {
    let isValid = true;
    if (rules.required) {
      isValid = !validator.isEmpty(value.trim()) && isValid;
    }

    if (rules.maxLength) {
      isValid =
        validator.isLength(value.trim(), {
          min: 2,
          max: 120,
        }) && isValid;
    }

    if (rules.isUrl) {
      isValid = validator.isURL(value.trim()) && isValid;
    }

    return isValid;
  };

  const onChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    elementType: string
  ): void => {
    let newProjectData = JSON.parse(JSON.stringify(formState.addProjectForm));
    newProjectData[elementType].value = event.target.value;
    newProjectData[elementType].touched = true;
    newProjectData[elementType].isValid = checkValidation(
      newProjectData[elementType].validator,
      newProjectData[elementType].value
    );

    let formIsValid = true;

    for (let key in newProjectData) {
      formIsValid = newProjectData[key].isValid && formIsValid;
    }

    setFormState({
      addProjectForm: newProjectData,
      formIsValid: formIsValid,
      techniques: formState.techniques,
    });
  };

  const tagInputHandler = (techniques: Technique[]): void => {
    // console.log(techniques);
    setFormState({ ...formState, techniques: techniques });
  };

  const submitHandler = (): void => {
    const newProject: Project = {
      id: "",
      name: formState.addProjectForm.name.value,
      platform: formState.addProjectForm.projectType.value,
      techniques: formState.techniques,
      url: formState.addProjectForm.projectUrl.value,
      image: formState.addProjectForm.projectImgUrl.value,
      description: formState.addProjectForm.description.value,
    };
    props.submitted(newProject);
    // props.createProject(newProject);
  };

  let addProjectForm = [];
  for (let key in formState.addProjectForm) {
    addProjectForm.push({ key: key, ...formState.addProjectForm[key] });
  }

  return (
    <div className={`card mb-3 ${classes.AddProjectForm}`}>
      <div
        className={`card-header text-center ${classes.AddProjectFormHeader}`}
      >
        {props.title}
      </div>
      <div className={`card-body form-row m-0 ${classes.AddProjectFormBody}`}>
        {addProjectForm.map((item) => {
          return (
            <div className={`mb-3 col-12 col-sm-6`} key={item.key}>
              <Input
                key={item.key}
                title={item.label}
                inputType={item.elementType}
                name={item.key}
                id={item.key}
                value={item.value}
                validClassName={item.isValid ? "is-valid" : "is-invalid"}
                touched={item.touched}
                config={item.config}
                changed={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                  >
                ) => onChangeHandler(event, item.key)}
              />
            </div>
          );
        })}
        {/* tagged Input */}
        <div className={`mb-3 col-12 col-sm-6`}>
          <TaggedInput
            tagInputted={tagInputHandler}
            data={props.techniques}
            valueData={formState.techniques}
          />
        </div>
      </div>
      <div className={`card-footer text-center`}>
        {props.isSaving && formState.formIsValid ? (
          <span className="badge" style={{ width: "5rem" }}>
            <ProgressIndicator />
          </span>
        ) : (
          <Button valid={formState.formIsValid} clicked={submitHandler}>
            SAVE
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
