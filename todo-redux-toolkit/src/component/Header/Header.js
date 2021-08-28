import React from "react";
import { Row, Col, Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
Header.propTypes = {};

function Header(props) {
  const location = useLocation();
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[location.pathname]}
    >
      <Menu.Item key="/" style={{ cursor: "pointer" }}>
        <NavLink to="/" exact>
          Trang chủ
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/products">
        <NavLink to="/products" exact>
          Quản lý công việc
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
