import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faCode } from "@fortawesome/free-solid-svg-icons";

import { Language as LanguageModel } from "../../../../model";
import { AppState } from "../../../../store";
import { LanguageState } from "../../../../store/language/types";
import {
  fetchLanguages,
  deleteLanguage,
} from "../../../../store/language/action";
import LanguageForm from "./LanguageForm/LanguageForm";
import ProgressIndicator from "../../../../component/UI/progressIndicator/progressIndicator";
import LanguageItem from "../LanguageItem/LanguageItem";
import AlertBox from "../../../../component/UI/alertBox/alertBox";
import TechnologyItemTitleBar from "../TechnologyItemTitleBar/TechnologyItemTitleBar";

interface Props {}

const Language: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const { error, languages, isAdding, isFetching } = useSelector<AppState>(
    (state) => state.languages
  ) as LanguageState;

  useEffect(() => {
    dispatch(fetchLanguages());
  }, []);

  const deleteHandler = (id: string): void => {
    dispatch(deleteLanguage(id));

    return;
  };

  return (
    <div className={`mb-3 border`}>
      <TechnologyItemTitleBar title="Languages" icon={faCode} />
      <div className={`p-3`}>
        {error && <AlertBox message={error} />}
        <LanguageForm isSubmitting={isAdding} />
        {isFetching ? (
          <div className="d-flex justify-content-center">
            <ProgressIndicator size="40px" />
          </div>
        ) : (
          <div className="pt-1">
            {languages.length
              ? languages.map((l: LanguageModel) => (
                  <LanguageItem key={l.id} lang={l} onClick={deleteHandler} />
                ))
              : "No Languages Found!"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Language;
