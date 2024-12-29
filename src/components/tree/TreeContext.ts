import { createContext, useContext } from "react";

interface TreeContext<T = any> {
  model: Map<T, boolean>;

  openNode: (node: T) => void;
  closeNode: (node: T) => void;
}

export const TreeContext = createContext<TreeContext>({
  model: new Map(),
  openNode: () => { },
  closeNode: () => { },
});

export const useTree = () => useContext(TreeContext);