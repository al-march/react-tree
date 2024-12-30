import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
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
  const isOpen = useMemo(() => !!ctx.model.get(node), [node, ctx.model]);

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
          className={clsx("p-1 transition-all", {
            "opacity-0 pointer-events-none": !children,
            "rotate-90": isOpen,
          })}
          onClick={open}
        >
          {">"}
        </button>

        <div>{nodeTemplate(node)}</div>
      </header>

      <AnimatePresence>
        {children && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            style={{ overflow: "hidden" }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
