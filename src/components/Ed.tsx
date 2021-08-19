import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Button,
} from "antd";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
// import Modal from "antd/lib/modal/Modal";
import { Modal } from "antd";

interface Item {
  key: string;
  name: string;
  id: number;
  email: string;
}

const originData: Item[] = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    id: i,
    email: `London Park no. ${i}`,
  });
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Ed = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [t1, setT1] = useState({
    key: "121121212",
    id: 1000001,
    name: "1212121",
    email: "asa@gmail.com",
  });
  let history = useHistory();

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", id: "", email: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  useEffect(() => {
    console.log("Hello this is from console log use effect");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        console.log("response", data);
        // setData(data);
        if (localStorage.getItem("tableData") === null)
          localStorage.setItem("tableData", JSON.stringify(data));
        // console.log("data", data);
        let tempData: any = localStorage.getItem("tableData");
        let jsonTempData = JSON.parse(tempData);
        let finaData: any = [];
        jsonTempData.map((ele: any) => {
          let temp: any = {};
          temp.key = ele.id;
          temp.name = ele.name;
          temp.id = ele.id;
          temp.email = ele.email;
          finaData.push(temp);
        });
        console.log("finalData", finaData);
        setData(finaData);
      });
  }, []);

  const handleAdd = () => {
    // const newData: any = {
    //   key: "1",
    //   name: `Edward King `,
    //   id: 32,
    //   email: `London, Park Lane no. `,
    // };
    // this.setState({
    //   dataSource: [...dataSource, newData],
    //   count: count + 1,
    // });
    // setData([...data, newData]);
    history.push("/addnew");
  };
  const dataSource: any = [...data];
  const handleDelete = (key: React.Key) => {
    console.log("datasource", dataSource);
    let anyData: any = dataSource.filter((item: any) => item.key !== key);
    console.log("anyData", anyData);
    setData(anyData);
  };
  let anyData2: any;
  const showModal = (key: any) => {
    anyData2 = dataSource.filter((item: any) => item.key === key);
    console.log("anyData2", anyData2[0]);
    setT1(dataSource.filter((item: any) => item.key === key)[0]);
    console.log("t1", t1);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "id",
      dataIndex: "id",
      width: "15%",
      editable: true,

      sorter: {
        compare: (a: any, b: any) => a.id - b.id,
        multiple: 1,
      },
    },
    {
      title: "email",
      dataIndex: "email",
      width: "40%",
      editable: true,
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },

    {
      title: "",
      dataIndex: "operation",
      render: (_: any, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_: any, record: { key: React.Key }) => (
        <>
          <Button type="primary" onClick={() => showModal(record.key)}>
            View
          </Button>
          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Name is: {t1.name}</p>
            <p>Email is: {t1.email}</p>
            <p>Id is: {t1.id}</p>
          </Modal>
        </>
      ),
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "id" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Button
        className="btn btn-primary btn-raised"
        style={{ margin: "50px" }}
        onClick={handleAdd}
      >
        Add new
      </Button>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          style={{ width: "100%", overflow: "scroll" }}
          bordered={true}
          dataSource={data}
          rowKey={"ffgf"}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};

export default Ed;
