import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { routes } from "./router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((item, index) => {
          const Page = item.Component;
          return <Route key={index} path={item.path} element={
            <Layout>
                <Page />
            </Layout>
          } />;
        })}
      </Routes>


    </BrowserRouter>
  );
}

export default App;
