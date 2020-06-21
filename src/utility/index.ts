import {
  ProjectWithoutId,
  TechniqueWithoutId,
  PlatformWithoutId,
} from "../model";

export function responseDataToData<T>(data: { [key: string]: T }) {
  const newDataWithId = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      newDataWithId.push({
        id: key,
        ...data[key],
      });
    }
  }
  return newDataWithId;
}
