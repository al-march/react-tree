import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { FC, ReactNode } from "react";
import { useTree } from "./TreeContext";

interface TreeNodeProps<T> {
  node: T;

  nodeTemplate: (node: T) => ReactNode;
  nodeChildren: (node: T) => T[] | undefined | null;
}

export const TreeNode = <T,>({ node, nodeChildren, nodeTemplate }: TreeNodeProps<T>) => {
  const ctx = useTree();
  const children = nodeChildren(node);
  const isOpen = !!ctx.model.get(node);

  function toggle() {
    if (isOpen) {
      ctx.closeNode(node);
    } else {
      ctx.openNode(node);
    }
  }

  return (
    <>
      <header className="flex items-center gap-2">
        <NodeToggler
          isOpen={isOpen}
          disabled={!children}
          toggle={toggle}
        />

        <div>{nodeTemplate(node)}</div>
      </header>

      <AnimatePresence>
        {children && isOpen && (
          <motion.div
            initial={ctx.firstRender ? undefined : { opacity: 0, height: 0 }}
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
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface NodeTogglerProps {
  isOpen: boolean;
  disabled: boolean;
  toggle: () => void;
}

export const NodeToggler: FC<NodeTogglerProps> = ({ isOpen, disabled, toggle }) => {
  return (
    <button
      className={clsx("p-1 transition-all", {
        "opacity-0 pointer-events-none": disabled,
        "rotate-90": isOpen,
      })}
      onClick={toggle}
    >
      {">"}
    </button>
  );
};
