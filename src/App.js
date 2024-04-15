import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Add from "./pages/Add";
import Products from "./pages/Products";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-left" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Products />} />
              <Route path="add" element={<Add />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
