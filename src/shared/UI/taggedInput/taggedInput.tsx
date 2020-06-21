import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {v4 as uuid} from "uuid";

import { Technique, TechnologyType } from "../../../model";
import classes from "./taggedInput.module.css";
import TagList from "./tagList/tagList";

interface Props {
  data: Technique[];
  tagInputted: (techniques: Technique[]) => void;
  valueData: Technique[];
}

const TaggedInput: React.FC<Props> = ({ data, tagInputted, valueData }) => {
  const elementRef = React.createRef<HTMLDivElement>();
  const [tags, setTags] = useState<Technique[]>(valueData);
  const [skills, setSkills] = useState<Technique[]>(data);
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
        (tag: Technique) =>
          inputValue.trim().toLocaleLowerCase() === tag.name.toLocaleLowerCase()
      );
      if (newTagIndex < 0) {
        newTags.push({
          id: uuid(),
          name: inputValue,
          technologyId: TechnologyType.WEB_DEVELOPMENT,
        });
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
        (skill: Technique) =>
          skill.name
            .toLocaleLowerCase()
            .indexOf(tempValue.trim().toLocaleLowerCase()) !== -1
      );
      setSkills(filteredSkills);
    } else {
      setSkills(data);
    }
  };

  const selectTagHandler = (value: Technique): void => {
    const newTags = [...tags];
    const newTagIndex = tags.findIndex((tag: Technique) => value.id === tag.id);
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
    const updatedTags = tags.filter((tag: Technique) => tag.id !== id);
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
          ? tags.map((item: Technique) => {
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
