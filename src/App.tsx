/** @format */

import { QueryProvider } from "./config/provider/QueryProvider";
import Home from "./page/home";

const App = () => {
  return (
    <QueryProvider>
      <Home />
    </QueryProvider>
  );
};

export default App;
