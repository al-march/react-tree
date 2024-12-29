import { ReactNode, useMemo } from "react";
import { useTree } from "./TreeContext";

interface TreeNodeProps<T> {
  node: T;

  nodeTemplate: (node: T) => ReactNode;
  nodeChildren: (node: T) => T[] | undefined | null;
}

export const TreeNode = <T,>({ node, nodeChildren, nodeTemplate, ...others }: TreeNodeProps<T>) => {
  const ctx = useTree();

  const children = useMemo(() => nodeChildren(node), [node, nodeChildren]);
  const isOpen = useMemo(() => !!ctx.model.get(node), [ctx.model, node]);

  function open() {
    if (isOpen) {
      ctx.closeNode(node);
    } else {
      ctx.openNode(node);
    }
  }

  return (
    <div>
      <header className="flex items-center gap-2">
        <button
          className={`button ${children ? "" : "opacity-0 pointer-events-none"}`}
          onClick={open}
        >
          {">"}
        </button>
        <div>{nodeTemplate(node)}</div>
      </header>

      {children && isOpen && (
        <div className="pl-4">
          {children.map((node, i) => (
            <TreeNode
              key={i}
              node={node}
              nodeTemplate={nodeTemplate}
              nodeChildren={nodeChildren}
              {...others}
            />
          ))}
        </div>
      )}
    </div>
  );
};
