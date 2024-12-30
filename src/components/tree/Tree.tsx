import { ReactNode, useLayoutEffect, useState } from "react";
import { TreeContext } from "./TreeContext";
import { TreeNode } from "./TreeNode";

interface TreeProps<T> {
  tree: T;

  nodeTemplate: (item: T) => ReactNode;
  nodeChildren: (item: T) => T[] | null | undefined;
}

export const Tree = <T,>({ tree, nodeTemplate, nodeChildren }: TreeProps<T>) => {
  const [model, setModel] = useState<Map<T, boolean>>(new Map());

  useLayoutEffect(() => {
    markAsOpen(tree);
  }, [tree]);

  function markAsOpen(node: T) {
    openNode(node);
    nodeChildren(node)?.forEach(markAsOpen);
  }

  function openNode(node: T) {
    setModel((model) => new Map(model.set(node, true)));
  }

  function closeNode(node: T) {
    setModel((model) => new Map(model.set(node, false)));
  }

  return (
    <TreeContext
      value={{
        model,
        openNode,
        closeNode,
      }}
    >
      <div>
        <TreeNode
          node={tree}
          nodeTemplate={nodeTemplate}
          nodeChildren={nodeChildren}
        />
      </div>
    </TreeContext>
  );
};
