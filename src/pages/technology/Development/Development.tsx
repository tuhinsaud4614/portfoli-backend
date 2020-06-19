import React, { useEffect } from "react";
import {
  faCalculator,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import TechnologyItemTitleBar from "../components/TechnologyItemTitleBar/TechnologyItemTitleBar";
import { useSelector, useDispatch } from "react-redux";
import { PlatformState } from "../../../store/platform/types";
import {
  fetchPlatforms,
  deletePlatform,
  createPlatform,
} from "../../../store/platform/action";
import { AppState } from "../../../store";

import TechnologyContent from "../components/TechnologyContent/TechnologyContent";
import { TechniqueState } from "../../../store/technique/types";
import {
  fetchTechniques,
  deleteTechnique,
  createTechnique,
} from "../../../store/technique/action";
import { TechnologyType } from "../../../model";

interface PlatformAndTechniqueProps {
  technologyType: TechnologyType;
}

interface Props extends PlatformAndTechniqueProps {
  title: string;
  icon: IconDefinition;
}

const Development: React.FC<Props> = ({ title, icon, technologyType }) => {
  return (
    <div className="mb-3 border">
      <TechnologyItemTitleBar title={title} icon={icon} />
      {/* <TechnologyForm /> */}
      <Platform technologyType={technologyType} />
      <Technique technologyType={technologyType} />
    </div>
  );
};

const Platform: React.FC<PlatformAndTechniqueProps> = ({ technologyType }) => {
  const dispatch = useDispatch();

  const { error, platforms, isAdding, isFetching } = useSelector<AppState>(
    (state) => state.platforms
  ) as PlatformState;

  useEffect(() => {
    dispatch(fetchPlatforms());
  }, []);

  const deleteHandler = (id: string): void => {
    dispatch(deletePlatform(id));
  };

  const submitHandler = (value: string): void => {
    dispatch(createPlatform(value, technologyType));
  };
  return (
    <div className="p-3">
      <TechnologyContent
        contentName="platforms"
        name="Platform"
        contents={{
          ["platforms"]: platforms.filter(
            (p) => p.technologyId === technologyType
          ),
        }}
        error={error}
        isAdding={isAdding}
        isFetching={isFetching}
        icon={faCalculator}
        deleteActionMethod={deleteHandler}
        submitActionMethod={submitHandler}
      />
    </div>
  );
};

const Technique: React.FC<PlatformAndTechniqueProps> = ({ technologyType }) => {
  const dispatch = useDispatch();

  const { error, techniques, isAdding, isFetching } = useSelector<AppState>(
    (state) => state.techniques
  ) as TechniqueState;

  useEffect(() => {
    dispatch(fetchTechniques());
  }, []);

  const deleteHandler = (id: string): void => {
    dispatch(deleteTechnique(id));
  };

  const submitHandler = (value: string): void => {
    dispatch(createTechnique(value, technologyType));
  };
  return (
    <div className="p-3">
      <TechnologyContent
        contentName="techniques"
        name="Technique"
        contents={{
          ["techniques"]: techniques.filter(
            (t) => t.technologyId === technologyType
          ),
        }}
        error={error}
        isAdding={isAdding}
        isFetching={isFetching}
        icon={faCalculator}
        deleteActionMethod={deleteHandler}
        submitActionMethod={submitHandler}
      />
    </div>
  );
};

export default Development;
