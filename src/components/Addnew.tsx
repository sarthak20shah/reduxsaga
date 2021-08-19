import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useHistory } from "react-router";
import { Formik, useFormik, withFormik } from "formik";
import FormList from "antd/lib/form/FormList";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required JZJHH!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function Addnew() {
  interface error1 {
    name?: string;
    email?: string;
  }

  const validate = (values: any) => {
    const errors: error1 = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formik.values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 8) {
      errors.name = "Must be 8 characters or more";
    }

    //...

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      let latestData: any = localStorage.getItem("tableData");
      // console.log("latestData", latestData);
      let newData = JSON.parse(latestData);
      // console.log("newData", newData);
      // console.log("last_id", newData[newData.length - 1].id);
      newData.push({
        id: newData[newData.length - 1].id + 1,
        name: values.name,
        email: values.email,
      });
      // console.log("newData", newData);
      localStorage.setItem("tableData", JSON.stringify(newData));
      history.push("/table");
    },
  });

  const onFinish = (values: any) => {
    console.log(values);
  };
  let history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    let latestData: any = localStorage.getItem("tableData");
    // console.log("latestData", latestData);
    let newData = JSON.parse(latestData);
    // console.log("newData", newData);
    // console.log("last_id", newData[newData.length - 1].id);
    newData.push({
      id: newData[newData.length - 1].id + 1,
      name: name,
      email: email,
    });
    // console.log("newData", newData);
    localStorage.setItem("tableData", JSON.stringify(newData));
    history.push("/table");
  };

  return (
    <div
      className="container-fluid main1"
      style={{
        boxSizing: "border-box",
        margin: "0 auto",
      }}
    >
      <div
        className="row d-flex justify-content-center align-items-center h-100"
        style={{ marginTop: "150px", marginRight: "10px" }}
      >
        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
            onFinish={formik.handleSubmit}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
          >
            <Form.Item
              label="Name"
              name="name"
              // rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input
                value={formik.values.name}
                // onChange={(e) => setName(e.target.value)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
              />
              {formik.errors.name ? (
                <div
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {formik.errors.name}
                </div>
              ) : null}
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              // rules={[
              //   {
              //     type: "email",
              //     required: true,
              //     message: "Please input your Email!",
              //   },
              // ]}
            >
              <Input
                value={formik.values.email}
                // onChange={(e) => setEmail(e.target.value)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
              />
              {formik.errors.email ? (
                <div
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {formik.errors.email}
                </div>
              ) : null}
            </Form.Item>
            {/* <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[{ required: true }]}
        >
          <Input
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Item> */}
            {/* <Form.Item name={["user", "website"]} label="Website">
          <Input />
        </Form.Item> */}
            {/* <Form.Item name={["user", "introduction"]} label="Introduction">
          <Input.TextArea />
        </Form.Item> */}
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Addnew;
