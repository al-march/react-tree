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
  return (
    <div className="p-6">
      <h2 className="text-2xl">Hello World</h2>

      <Tree
        tree={tree}
        nodeChildren={(user) => user.children}
        nodeTemplate={(user) => (
          <div className="flex gap-2 items-center">
            <span>{user.text}</span>
          </div>
        )}
      />
    </div>
  );
}

export default App;
