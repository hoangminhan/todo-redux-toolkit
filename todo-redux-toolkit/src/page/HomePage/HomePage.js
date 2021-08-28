import React from "react";
import { Layout } from "antd";
import HeaderTodo from "./../../component/Header/Header";
import ContentTodo from "../../component/Content/ContentTodo";
const { Header, Content } = Layout;

function HomePage(props) {
  return (
    <Layout>
      <Header>
        <HeaderTodo />
      </Header>
      <Content style={{ padding: "0 50px", height: "100vh" }}>
        Đây là homepage
      </Content>
    </Layout>
  );
}

export default HomePage;
