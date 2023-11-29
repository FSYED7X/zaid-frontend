import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";

// axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
// axios.defaults.headers.post["Content-Type"] = "application/json";


const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
