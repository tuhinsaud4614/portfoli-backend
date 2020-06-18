import React from "react";
import classes from "./input.module.css";

interface Props {
  touched: boolean;
  validClassName: string;
  inputType: string;
  id: string;
  name: string;
  value: string;
  title: string;
  config: {
    type?: string;
    placeholder?: string;
    options?: { value: string; displayValue: string }[];
  };
  changed: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const Input: React.FC<Props> = (props) => {
  let inputElement;
  let temp = props.touched ? props.validClassName : "";
  let classList = `form-control ${classes.InputField} ${temp}`;
  switch (props.inputType) {
    case "input":
      inputElement = (
        <input
          className={classList}
          name={props.name}
          id={props.id}
          value={props.value}
          {...props.config}
          onChange={props.changed}
          required
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={`form-control ${classes.InputField}`}
          value={props.value}
          onChange={props.changed}
        >
          {props.config.options
            ? props.config.options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.displayValue}
                  </option>
                );
              })
            : null}
        </select>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classList}
          name={props.name}
          id={props.id}
          value={props.value}
          {...props.config}
          rows={3}
          onChange={props.changed}
          required
        />
      );
      break;

    default:
      inputElement = (
        <input
          className={classList}
          name={props.name}
          id={props.id}
          value={props.value}
          {...props.config}
          onChange={props.changed}
          required
        />
      );
      break;
  }
  return (
    <>
      <label htmlFor={props.id} className={`${classes.InputLabel}`}>
        {props.title}
      </label>
      {inputElement}
      {temp === "is-valid" ? null : (
        <div className={`invalid-feedback ${classes.InputValidField}`}>
          Please enter correct {props.name}
        </div>
      )}
    </>
  );
};

export default Input;
