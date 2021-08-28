import React from "react";

import "./App.css";
import { Layout } from "antd";
import HomePage from "./page/HomePage/HomePage";
import routes from "./routes";
import { BrowserRouter, Switch, Route } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes &&
          routes.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                exact={item.exact}
                component={item.component}
              />
            );
          })}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
