import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import DefaultLayout from "./component/Layout/DefaultLayout";
import Login from "./page/Login";

function App() {
  const [token, setToken] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (token !== "undefined") {
        setToken(true);
      } else {
        setToken(false);
      }
    }
  }, []);

  return (
    <>
      {token === true ? (
        <Router>
          <div className="App">
            <Routes>
              {publicRoutes.map((route, index) => {
                const Layout = route.layout === null ? Fragment : DefaultLayout;
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
            </Routes>
          </div>
        </Router>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
