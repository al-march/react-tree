import { ReactNode, useEffect, useState } from "react";
import { TreeContext } from "./TreeContext";
import { TreeNode } from "./TreeNode";

interface TreeProps<T> {
  tree: T;
  /**
   * Initial state of the Tree
   *
   * Node is open when Map.get(node) === true
   * Node is close when Map.get(node) !== true
   */
  initialValue?: Map<T, boolean>;

  nodeTemplate: (item: T) => ReactNode;
  nodeChildren: (item: T) => T[] | null | undefined;

  onValueChange?: (value: Map<T, boolean>) => void;
  onNodeOpen?: (node: T) => void;
  onNodeClose?: (node: T) => void;
}

export const Tree = <T,>({
  tree,
  initialValue,
  nodeTemplate,
  nodeChildren,
  onValueChange,
  onNodeOpen,
  onNodeClose,
}: TreeProps<T>) => {
  const [firstRender, setFirstRender] = useState(true);
  const [model, setModel] = useState<Map<T, boolean>>(new Map());

  useEffect(() => {
    if (initialValue) {
      setModel(() => new Map(initialValue));
    } else {
      markAsOpen(tree);
    }
  }, [tree, initialValue]);

  useEffect(
    function valueChange() {
      onValueChange?.(model);
    },
    [model]
  );

  function markAsOpen(node: T) {
    openNode(node);
    nodeChildren(node)?.forEach(markAsOpen);
  }

  function openNode(node: T) {
    setModel((model) => new Map(model.set(node, true)));
    onNodeOpen?.(node);
  }

  function closeNode(node: T) {
    setModel((model) => new Map(model.set(node, false)));
    onNodeClose?.(node);
  }

  return (
    <TreeContext
      value={{
        model,
        firstRender,
        openNode,
        closeNode,
      }}
    >
      <div
        ref={() => {
          setTimeout(() => setFirstRender(false), 1);
        }}
      >
        <TreeNode
          node={tree}
          nodeTemplate={nodeTemplate}
          nodeChildren={nodeChildren}
        />
      </div>
    </TreeContext>
  );
};
