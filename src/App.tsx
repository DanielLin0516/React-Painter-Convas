import { useState } from "react";
import Layout from '../src/components/Layout'
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Layout></Layout>
    </div>
  );
}

export default App;
