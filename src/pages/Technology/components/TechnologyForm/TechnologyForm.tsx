import React, { useState } from "react";

import { checkValidation } from "../../../../utility/formUtility";
import ProgressIndicator from "../../../../shared/UI/progressIndicator/progressIndicator";
import SubmitButton from "../../../../shared/components/button/SubmitButton";

interface Props {
  isSubmitting: boolean;
  submitted: (value: string) => void;
  name: string;
}

const TechnologyForm: React.FC<Props> = (props) => {
  const [formData, setFormData] = useState({
    value: "",
    touched: false,
    isValid: false,
  });
  const validation = {
    maxLength: 120,
    minLength: 2,
    required: true,
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newForm = JSON.parse(JSON.stringify(formData)) as {
      value: string;
      touched: boolean;
      isValid: boolean;
    };
    newForm.value = event.target.value;
    newForm.touched = true;
    newForm.isValid = checkValidation(validation, event.target.value);
    setFormData(newForm);
  };

  const submitHandler = (event: React.FormEvent<EventTarget>): void => {
    event.preventDefault();
    props.submitted(formData.value.trim());
    setFormData({
      value: "",
      touched: false,
      isValid: false,
    });
  };

  console.log("TechnologyForm");

  return (
    <div className="mb-4">
      {props.isSubmitting ? (
        <div className="d-flex justify-content-center">
          <ProgressIndicator />
        </div>
      ) : (
        <form className={`d-flex`} onSubmit={submitHandler}>
          <div className="flex-grow-1 custom-control p-0 mr-3">
            <input
              style={{ fontSize: "1.3rem" }}
              type="text"
              className={`form-control ${
                formData.touched
                  ? formData.isValid
                    ? "is-valid"
                    : "is-invalid"
                  : ""
              }`}
              id="name"
              placeholder={`Enter ${props.name} Name`}
              value={formData.value}
              onChange={onChangeHandler}
            />
            {formData.touched && !formData.isValid ? (
              <div className={`invalid-tooltip`}>Please enter correct name</div>
            ) : null}
          </div>
          <SubmitButton valid={formData.isValid}>Add {props.name}</SubmitButton>
        </form>
      )}
    </div>
  );
};

export default TechnologyForm;
