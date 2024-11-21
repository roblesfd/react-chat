import { ReactNode } from "react";

const filterChildrenByName = (childName: string, childrenArray: ReactNode[]) =>
  childrenArray.filter((child: any) => child?.type?.name === childName);

export { filterChildrenByName };
