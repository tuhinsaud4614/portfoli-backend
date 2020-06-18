import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import classes from "./taggedInput.module.css";
import TagList from "./tagList/tagList";
import Skill from "../../../model/skill";

interface Props {
  data: Skill[];
  tagInputted: (skills: Skill[]) => void;
  valueData: Skill[];
}

const TaggedInput: React.FC<Props> = ({ data, tagInputted, valueData }) => {
  const elementRef = React.createRef<HTMLDivElement>();
  const [tags, setTags] = useState<Skill[]>(valueData);
  const [skills, setSkills] = useState<Skill[]>(data);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  //   const oldSkills = ["Bootstrap", "Redux"];

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setIsListOpen(false);
        setIsActive(false);
      }
    });
  }, [elementRef]);

  useEffect(() => {
    setTags(valueData);
  }, [valueData]);

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (inputValue && e.keyCode === 13) {
      const newTags = [...tags];
      const newTagIndex = tags.findIndex(
        (tag: Skill) =>
          inputValue.trim().toLocaleLowerCase() === tag.name.toLocaleLowerCase()
      );
      if (newTagIndex < 0) {
        newTags.push(new Skill(new Date().getTime().toString(), inputValue));
      }
      setTags(newTags);
      tagInputted(newTags);
      setInputValue("");
    }
  };

  const changedHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const tempValue = event.target.value;
    setInputValue(tempValue);
    if (tempValue) {
      const filteredSkills = data.filter(
        (skill: Skill) =>
          skill.name
            .toLocaleLowerCase()
            .indexOf(tempValue.trim().toLocaleLowerCase()) !== -1
      );
      setSkills(filteredSkills);
    } else {
      setSkills(data);
    }
  };

  const selectTagHandler = (value: Skill): void => {
    const newTags = [...tags];
    const newTagIndex = tags.findIndex((tag: Skill) => value.id === tag.id);
    if (newTagIndex < 0) {
      newTags.push(value);
    }
    setTags(newTags);
    tagInputted(newTags);
    setIsListOpen(false);
    setInputValue("");
    setSkills(data);
  };

  const removeTagHandler = (id: string): void => {
    const updatedTags = tags.filter((tag: Skill) => tag.id !== id);
    setTags(updatedTags);
    tagInputted(updatedTags);
  };

  const focusHandler = () => {
    setIsActive(true);
    setIsListOpen(true);
  };
  return (
    <>
      <label className={`${classes.TagInputLabel}`}>Skills</label>
      <div
        ref={elementRef}
        className={`d-flex flex-wrap ${classes.TagInput} ${
          isActive ? classes.TagInputActive : ""
        }`}
      >
        {tags.length >= 0
          ? tags.map((item: Skill) => {
              return (
                <span className={`badge ${classes.Tag} m-1 p-2`} key={item.id}>
                  <span className="mr-3">{item.name}</span>
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => removeTagHandler(item.id)}
                    className={`${classes.TagRemoveIcon}`}
                  />
                </span>
              );
            })
          : null}
        <input
          placeholder="Enter your skills"
          type="text"
          onChange={changedHandler}
          onFocus={focusHandler}
          onKeyDown={keyDownHandler}
          className={`py-2 ${classes.TagInputField}`}
          // name="inputValue"
          value={inputValue}
        />
        {isListOpen ? (
          <TagList skills={skills} clicked={selectTagHandler} />
        ) : null}
      </div>
    </>
  );
};

export default TaggedInput;
