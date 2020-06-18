import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProjects, deleteProject } from "../../store/project/action";
import { ProjectState, ProjectErrorTypes } from "../../store/project/types";
import ProjectModel from "../../model/project";
import Skill from "../../model/skill";

import RoutePathName from "../routePathName";
import ProgressIndicator from "../../component/UI/progressIndicator/progressIndicator";
import DataTable from "../../component/dataTable/dataTable";
import LinkButton from "../../component/UI/linkButton/linkButton";
import { AppState } from "../../store";
import AlertBox from "../../component/UI/alertBox/alertBox";

// interface Props {
//   fetchProjects: () => void;
//   deleteProject: (id: string) => void;
//   projects: ProjectModel[];
//   loading: boolean;
// }

type ChildCmp = React.FC | string;

type DataTableDataType = {
  id: string;
  cmp: ChildCmp[];
};

const Project: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, projects, error } = useSelector<AppState>(
    (state) => state.projects
  ) as ProjectState;

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const dataTableData: DataTableDataType[] = projects.map(
    (project: ProjectModel) => {
      const p = {
        id: project.id,
        cmp: [
          () => <a href="!#">{project.name}</a>,
          project.platform,
          project.skills.map((skill: Skill) => skill.name).join(", "),
          () => (
            <img
              style={{ width: "60px" }}
              src={project.image}
              alt={project.name}
            />
          ),
          project.description,
        ],
      };
      return p;
    }
  );

  const deleteProjectHandler = (id: string): void => {
    dispatch(deleteProject(id));
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100%" }}
        >
          <div>
            <ProgressIndicator size="80px" />
          </div>
        </div>
      ) : (
        <div className="p-3">
          {error && (
            <AlertBox message={ProjectErrorTypes.FETCH_PROJECTS_ERROR} />
          )}
          <div className="row m-0 mb-3">
            <div className="col-4 p-0 d-flex justify-content-between">
              <LinkButton
                title="ADD PROJECT"
                link={RoutePathName.ADMIN_OWNER_ADD_PROJECT}
              />
            </div>
          </div>
          {dataTableData.length > 0 ? (
            <DataTable
              data={dataTableData}
              columns={["Name", "Platform", "Skills", "Image", "Description"]}
              deleteConfig={{
                method: deleteProjectHandler,
              }}
            />
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Project;
