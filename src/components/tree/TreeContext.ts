import { createContext, useContext } from "react";

interface TreeContext<T = any> {
  model: Map<T, boolean>;
  firstRender: boolean;
  openNode: (node: T) => void;
  closeNode: (node: T) => void;
}

export const TreeContext = createContext<TreeContext>({
  model: new Map(),
  firstRender: true,
  openNode: () => { },
  closeNode: () => { },
});

export const useTree = () => useContext(TreeContext);