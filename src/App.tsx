import { useState } from "react";
import "./App.css";
import { Tree } from "./components/tree/Tree";

interface TreeNode {
  readonly children?: TreeNode[];
  readonly text: string;
}

const tree: TreeNode = {
  text: "Topmost",
  children: [
    {
      text: "Top level 1",
      children: [
        {
          text: "Another item",
          children: [{ text: "Next level 1" }, { text: "Next level 2" }, { text: "Next level 3" }],
        },
      ],
    },
    { text: "Top level 2" },
    {
      text: "Top level 3",
      children: [{ text: "Test 1" }, { text: "Test 2" }],
    },
  ],
};

function App() {
  const [value, setValue] = useState(initialValue(tree));

  function initialValue(tree: TreeNode, map = new Map<TreeNode, boolean>()) {
    map.set(tree, tree?.text === "Top level 3" || tree?.text === "Topmost");
    tree.children?.forEach((node) => initialValue(node, map));
    return map;
  }

  function onNodeToggle(node: TreeNode, isOpen: boolean) {
    console.log({ node, isOpen });
  }

  function onValueChange(value: Map<TreeNode, boolean>) {
    console.log({ value });
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl">Hello World</h2>

      <Tree
        tree={tree}
        initialValue={value}
        nodeChildren={(user) => user.children}
        nodeTemplate={(user) => (
          <div className="flex gap-2 items-center">
            <span>{user.text}</span>
          </div>
        )}
        onValueChange={onValueChange}
        onNodeOpen={(node) => onNodeToggle(node, true)}
        onNodeClose={(node) => onNodeToggle(node, false)}
      />
    </div>
  );
}

export default App;
