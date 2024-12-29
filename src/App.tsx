import "./App.css";
import { Tree } from "./components/tree/Tree";

interface User {
  id: string | number;
  name: string;
  surname: string;
  friends?: User[];
}

const tree: User = {
  id: "1",
  name: "Fred",
  surname: "Anderson",
  friends: [
    {
      id: "2",
      name: "Mike",
      surname: "Smith",
    },
    {
      id: "2",
      name: "Alex",
      surname: "Marc",
      friends: [
        {
          id: "2",
          name: "Mike",
          surname: "Smith",
        },
        {
          id: "2",
          name: "Alex",
          surname: "Marc",
        },
      ]
    },
  ],
};

function App() {
  return (
    <div className="p-6">
      <h2 className="text-2xl">Hello World</h2>

      <Tree
        tree={tree}
        nodeChildren={(user) => user.friends}
        nodeTemplate={(user) => (
          <div className="flex gap-2 items-center">
            <small className="opacity-60">{user.id}</small>
            <span>{user.name}</span>
          </div>
        )}
      />
    </div>
  );
}

export default App;
