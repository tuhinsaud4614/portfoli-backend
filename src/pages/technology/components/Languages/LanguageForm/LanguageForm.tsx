import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { checkValidation } from "../../../../../utility/formUtility";
import ProgressIndicator from "../../../../../component/UI/progressIndicator/progressIndicator";
import SubmitButton from "../../../../../shared/components/button/SubmitButton";
import { createLanguage } from "../../../../../store/language/action";

interface Props {
  isSubmitting: boolean;
}

const LanguageForm: React.FC<Props> = ({ isSubmitting }) => {
  const dispatch = useDispatch();
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
    dispatch(createLanguage({ name: formData.value.trim() }));
    setFormData({
      value: "",
      touched: false,
      isValid: false,
    });
  };

  return (
    <div className="mb-4">
      {isSubmitting ? (
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
              placeholder="Enter Language Name"
              value={formData.value}
              onChange={onChangeHandler}
            />
            {formData.touched && !formData.isValid ? (
              <div className={`invalid-tooltip`}>Please enter correct name</div>
            ) : null}
          </div>
          <SubmitButton valid={formData.isValid}>Add Language</SubmitButton>
        </form>
      )}
    </div>
  );
};

export default LanguageForm;
