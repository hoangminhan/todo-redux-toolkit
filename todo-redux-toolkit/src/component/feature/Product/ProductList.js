import { unwrapResult } from "@reduxjs/toolkit";
import { Table, Col, Space, Button, Typography, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import callApi from "../../../api/ApiAxios";
import {
  deleteProduct,
  fetchDataProduct,
  toogleStatus,
} from "../../../store/productSlice";

function ProductList(props) {
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      align: "center",
      with: "200px",
    },
    {
      title: "Name Product",
      dataIndex: "name",
      align: "center",
      render: (name) => {
        return <span>{name}</span>;
      },
    },
    {
      title: "Product Type",
      dataIndex: "type",
      align: "center",
      render: (type) => {
        return <span>{type}</span>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
      render: (price) => {
        return (
          <span>
            {price.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status, record) => {
        return (
          <span
            style={{
              cursor: "pointer",
              backgroundColor: status ? "blue" : "red",
            }}
            onClick={() => dispatch(toogleStatus({ status, record }))}
          >
            {status ? "Còn hàng" : "Hết hàng"}
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "data",
      align: "center",
      render: (id, data) => {
        return (
          <Space>
            <Button
              type="danger"
              onClick={() => {
                setModalDelete(true);
                console.log(data.id);
                setIdDelete(data.id);
              }}
            >
              Xoá
            </Button>
            <Button
              type="default"
              onClick={() => history.push(`/products/${data.id}/update`)}
            >
              Sửa
            </Button>
          </Space>
        );
      },
    },
  ];
  const handleDelete = () => {
    setModalDelete(false);
    try {
      callApi(`products/${idDelete}`, "DELETE", null).then((res) => {
        message.success("xoá thành công");
        const newDataTable = dataTable.filter((item) => item.id !== idDelete);
        const mapData = newDataTable.map((item, index) => {
          return {
            ...item,
            stt: index + 1,
          };
        });
        setDataTable(mapData);
      });
    } catch (error) {
      message.error("xoá thất bại");
      console.log(error);
    }
    console.log(idDelete);

    dispatch(deleteProduct(idDelete));
  };

  const { products } = useSelector((state) => state.products);
  const [dataTable, setDataTable] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(fetchDataProduct());
      const datanew = unwrapResult(data);
      // console.log(datanew);
      const newProducts = datanew.map((item, index) => {
        return { ...item, stt: index + 1 };
      });
      setDataTable(newProducts);
    };
    getData();
  }, []);
  // useEffect(() => {
  //   if (products) {
  //     const newProducts = products.map((item, index) => {
  //       return { ...item, stt: index + 1 };
  //     });
  //     setDataTable(newProducts);
  //   }
  // }, [products]);
  const [modalDelete, setModalDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();

  const hiddenModal = () => {
    setModalDelete(false);
  };
  const history = useHistory();

  return (
    <Col span={24} style={{ marginTop: "64px" }}>
      <Button
        type="primary"
        style={{ marginBottom: "16px" }}
        onClick={() => history.push("/products/add")}
      >
        Thêm sản phẩm
      </Button>
      <Table
        columns={columns}
        bordered
        dataSource={dataTable}
        pagination={false}
      ></Table>

      <Modal onCancel={hiddenModal} onOk={handleDelete} visible={modalDelete}>
        <Typography.Title level={3}>
          Bạn có chắc muốn xoá không?
        </Typography.Title>
      </Modal>
    </Col>
  );
}

export default ProductList;
