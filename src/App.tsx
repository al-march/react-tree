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

const QUERY_TREE = "tree";
const QUERY_TREE_SEPARATOR = ",";

function App() {
  const [value, setValue] = useState(getState(tree));

  function onNodeToggle(node: TreeNode, isOpen: boolean) {
    console.log({ node, isOpen });
  }

  function onValueChange(value: Map<TreeNode, boolean>) {
    saveState(value);
  }

  function getState(tree: TreeNode) {
    const map = new Map<TreeNode, boolean>();
    const url = new URL(window.location.href);
    const nodes = url.searchParams.get(QUERY_TREE);

    forEveryNode(tree, (node) => {
      map.set(node, !!nodes?.includes(node.text));
    });
    return map;
  }

  function saveState(state: Map<TreeNode, boolean>) {
    const url = new URL(window.location.href);
    const nodes = getSelectedNodes(state).join(QUERY_TREE_SEPARATOR);
    if (nodes) {
      url.searchParams.set(QUERY_TREE, nodes);
    } else {
      url.searchParams.delete(QUERY_TREE);
    }

    window.history.pushState({}, "", url.toString());
  }

  function getSelectedNodes(map: Map<TreeNode, boolean>) {
    const keys: string[] = [];
    for (const [key, isSelect] of map.entries()) {
      if (isSelect) {
        keys.push(key.text);
      }
    }
    return keys;
  }

  function forEveryNode(tree: TreeNode, callback: (node: TreeNode) => void) {
    callback(tree);
    tree.children?.forEach((node) => {
      forEveryNode(node, callback);
    });
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
