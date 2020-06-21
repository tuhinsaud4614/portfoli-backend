import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import TechnologyItemTitleBar from "../TechnologyItemTitleBar/TechnologyItemTitleBar";
import AlertBox from "../../../../shared/UI/alertBox/alertBox";
import ProgressIndicator from "../../../../shared/UI/progressIndicator/progressIndicator";
import LanguageItem from "../LanguageItem/LanguageItem";
import TechnologyForm from "../TechnologyForm/TechnologyForm";
import { TechnologyType } from "../../../../model";
import { TechniqueErrorTypes } from "../../../../store/technique/types";
import { PlatformErrorTypes } from "../../../../store/platform/types";

interface Props {
  name: string;
  contentName: string;
  contents: {
    [key: string]: {
      id: string;
      name: string;
    }[];
  };
  error: null | string;
  typeError: {
    type: TechnologyType | null;
    msg: TechniqueErrorTypes | PlatformErrorTypes | null;
  };
  technologyType: TechnologyType
  isAdding: boolean;
  isFetching: boolean;
  icon: IconDefinition;
  deleteActionMethod: (id: string) => void;
  submitActionMethod: (value: string) => void;
}

const TechnologyContent: React.FC<Props> = (props) => {
  console.log("TechnologyContent");
  const noData = `No ${props.name} Found!`;
  return (
    <div className={`mb-3 border`}>
      <TechnologyItemTitleBar title={props.name} icon={props.icon} />
      <div className={`p-3`}>
        {props.error && <AlertBox message={props.error} />}
        {props.typeError.type === props.technologyType && props.typeError.msg && <AlertBox message={props.typeError.msg} />}
        <TechnologyForm
          isSubmitting={props.isAdding}
          name={props.name}
          submitted={props.submitActionMethod}
        />
        {props.isFetching ? (
          <div className="d-flex justify-content-center">
            <ProgressIndicator size="40px" />
          </div>
        ) : (
          <div className="pt-1">
            {props.contents[props.contentName].length
              ? props.contents[props.contentName].map((l) => (
                  <LanguageItem
                    key={l.id}
                    lang={l}
                    onClick={props.deleteActionMethod}
                  />
                ))
              : noData}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnologyContent;
