import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Row, Col, Typography, message } from "antd";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import callApi from "../../../api/ApiAxios";
import { useSelector } from "react-redux";

function ProductAction(props) {
  const { products } = useSelector((state) => state.products);
  const history = useHistory();
  const { id } = useParams();
  const [dataUpdate, setDataUpdate] = useState({
    name: "",
    type: "",
    price: "",
    status: false,
  });

  useEffect(() => {
    if (id) {
      products.forEach((item, index) => {
        if (item.id === +id) {
          setDataUpdate({
            name: item.name,
            type: item.type,
            price: item.price,
            status: item.status,
          });
        }
      });
    }
  }, []);
  console.log(dataUpdate);

  return (
    <Row justify="center">
      <Col
        span={12}
        style={{ textAlign: "center", height: "100vh", marginTop: "64px" }}
      >
        <Typography.Title level={3}>
          {!id ? "Thêm sản phẩm" : "Cập nhập thông tin sản phẩm"}
        </Typography.Title>
        {console.log(dataUpdate)}
        <Formik
          enableReinitialize
          initialValues={
            // id
            //   ? dataUpdate
            //     ? { ...dataUpdate }
            //     : {}
            //   : {
            //       name: "",
            //       type: "",
            //       price: "",
            //       status: false,
            //     }
            { ...dataUpdate }
          }
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required!"),
            type: Yup.string()
              .required("Type product is required!")
              .max(20, "Max length is 20 characters"),
            price: Yup.number("Must be number characters").required(
              "Price is required"
            ),
          })}
          onSubmit={(value) => {
            if (id) {
              callApi(`products/${id}`, "PUT", value);
              message.success("Cập nhập thông tin sản phẩm thành công!");
            } else {
              callApi("products", "POST", value);
              message.success("Thêm sản phẩm thành công!");
            }
            history.push("/products");
          }}
        >
          {(formikProps) => (
            <Form>
              {console.log(formikProps)}

              <Col
                span={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  //   justifyContent: "space-between",
                }}
              >
                <Row span={24} style={{ marginBottom: "16px" }}>
                  <Col span={5} style={{ textAlign: "left" }}>
                    <label htmlFor="name">Name Product</label>
                  </Col>
                  <Col span={10}>
                    <FastField
                      name="name"
                      style={{
                        minWidth: "100%",
                        borderColor:
                          formikProps.touched.name && formikProps.errors.name
                            ? "red"
                            : "black",
                      }}
                    />
                    {formikProps.touched.name && formikProps.errors.name && (
                      <div
                        style={{
                          textAlign: "left",
                          color: "red",
                        }}
                      >
                        {formikProps.errors.name}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row span={24} style={{ marginBottom: "16px" }}>
                  <Col span={5} style={{ textAlign: "left" }}>
                    <label htmlFor="type">Product Type</label>
                  </Col>
                  <Col span={10}>
                    <FastField name="type" style={{ minWidth: "100%" }} />
                    {formikProps.touched.type && formikProps.errors.type && (
                      <div
                        style={{
                          textAlign: "left",
                          color: "red",
                        }}
                      >
                        {formikProps.errors.type}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row span={24} style={{ marginBottom: "16px" }}>
                  <Col span={5} style={{ textAlign: "left" }}>
                    <label htmlFor="price">Price</label>
                  </Col>
                  <Col span={10}>
                    <FastField name="price" style={{ minWidth: "100%" }} />
                    {formikProps.touched.price && formikProps.errors.price && (
                      <div
                        style={{
                          textAlign: "left",
                          color: "red",
                        }}
                      >
                        {formikProps.errors.price}
                      </div>
                    )}
                  </Col>
                </Row>
                <Row span={24} style={{ marginBottom: "16px" }}>
                  <Col span={5} style={{ textAlign: "left" }}>
                    <label htmlFor="status">Trạng thái</label>
                  </Col>
                  <Col span={10}>
                    <FastField name="status" style={{ minWidth: "100%" }} />
                  </Col>
                </Row>

                <Row span={24}>
                  <button type="submit">Submit</button>
                </Row>
              </Col>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
}

export default ProductAction;
