import React from "react";
import {
  Select,
  AutoComplete,
  Button,
  Cascader,
  DatePicker,
  Checkbox,
  Col,
  Form,
  Upload,
  Input,
  InputNumber,
  icons,
  Row,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { UPLOAD_DATA_SOURCE_FIELD } from "../../ApiCalls/ApiCall/apiCalls";
import COLORS from '../../Common/Constants/Colors';
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Uploads() {

  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [tenderData, setTenderData] = useState([
    // "Promo Master",
    // "Budget Master",
    "Swiggy",
    // "Freebies Master",
    "Zomato",
    "MagicPin",
    // "DotPe"
  ]);
  const [paymentData, setPaymentData] = useState(["UTR"]);

  const [endDate, setEndDate] = useState(null);
  const [businessDate, setBusinessDate] = useState(null);


  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const onFinish = (values) => {
    
    setUploading(true);
    
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append("files", fileList[i]);
    }
    
    UPLOAD_DATA_SOURCE_FIELD({queryString: `endDate=${endDate}&businessDate=${businessDate}&datSource=${values?.tender}`, payload: formData}).then((response) => {
      if (response.status === 200) {
        alert(response.data?.data);
        form.resetFields();
        setEndDate(null);
        setBusinessDate(null);
        setFileList([]);
      }
    }).catch((error) => {
      console.log('error-====',error);
    }).finally(()=>{
      setUploading(false);
    })

  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onSelectType = (e) => {
    form.resetFields(['date','dateRange']);
    switch (e) {
      case "3po":
        setTenderData([
          // "Promo Master",
          // "Budget Master",
          "Swiggy",
          // "Freebies Master",
          "Zomato",
          "MagicPin",
          // "DotPe"
        ]);
        setPaymentData(["UTR", "Promo", "Order Level Data", "IGCC"]);
        form.setFieldValue("tender", "Swiggy");
        form.setFieldValue("payment", "UTR");
        break;
      case "pos":
        setTenderData(["Order Level Data"]);
        setPaymentData([]);
        form.setFieldValue("tender", "Order Level Data");
        break;
      case "banking":
        setTenderData(["AmEx", "Yes Bank", "PhonePe", "HSBC", "PineLabs"]);
        setPaymentData(["MPR"]);
        form.setFieldValue("tender", "AmEx");
        form.setFieldValue("payment", "MPR");
        break;

      default:
        break;
    }
  };

  const onSelectTender = (e) => {
    switch (e) {
      // case "Promo Master":
      //   setPaymentData(["Promo Master"]);
      //   form.setFieldValue("payment", "Promo Master");
      //   break;
      case "Budget Master":
        setPaymentData(["Budget Master"]);
        form.setFieldValue("payment", "Budget Master");
        break;
      case "Swiggy":
        setPaymentData(["UTR"]);
        form.setFieldValue("payment", "UTR");
        break;
      case "Freebies Master":
        setPaymentData(["Freebies Master"]);
        form.setFieldValue("payment", "Freebies Master");
        break;
      case "Zomato":
        setPaymentData(["Salt", "UTR", "Order Level Data", "Refund"]);
        form.setFieldValue("payment", "Salt");
        break;
      case "MagicPin":
        setPaymentData(["UTR", "Order Level Data"]);
        form.setFieldValue("payment", "UTR");
        break;
      case "DotPe":
        setPaymentData(["Settlement Report", "Delivery Performance"]);
        form.setFieldValue("payment", "Settlement Report");
        break;
      case "Order Level Data":
        setPaymentData([]);
        break;
      case "AmEx":
        setPaymentData(["MPR"]);
        form.setFieldValue("payment", "MPR");
        break;
      case "Yes Bank":
        setPaymentData([
          "MPR",
          "Bank Statement",
        ]);
        form.setFieldValue("payment", "MPR");
        break;
      case "PhonePe":
        setPaymentData(["MPR"]);
        form.setFieldValue("payment", "MPR");
        break;
      case "HSBC":
        setPaymentData(["Bank Statement"]);
        form.setFieldValue("payment", "Bank Statement");
        break;
      case "PineLabs":
        setPaymentData(["TRM"]);
        form.setFieldValue("payment", "TRM");
        break;

      default:
        break;
    }
  };

  const onRangeChange = (dates, dateStrings) => {
    setBusinessDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  }

  const onDateChange = (dates, dateStrings) => {
    setBusinessDate(dateStrings);
    setEndDate(dateStrings);
  }

  return (
    <div className="filter-row flex">
      <div className="mt-5 ml-5">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            type: "3po",
            tender: 'Swiggy',
            payment: 'UTR'
          }}
          style={{
            maxWidth: 400,
            // minWidth: 350,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="type"
            label="Type"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please select type!",
              },
            ]}
            // getValueFromEvent={onSelectType}
          >
            <Select placeholder="select type" onChange={onSelectType} style={{width: 230}}>
              <Option value="3po">3PO</Option>
              <Option value="pos">POS</Option>
              <Option value="banking">Banking</Option>
            </Select>
          </Form.Item>

          {form.getFieldsValue("register").type === "pos" ? (
            <Form.Item label="Date" name="date" labelAlign="left" rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}>
              <DatePicker onChange={onDateChange} style={{width: 230}}/>
            </Form.Item>
          ) : (
            <Form.Item
              name="dateRange"
              label="Date"
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <RangePicker onChange={onRangeChange} style={{width: 230}}/>
            </Form.Item>
          )}
          <Form.Item
            name="tender"
            label="Tender"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Please select tender!",
              },
            ]}
            // getValueFromEvent={onSelectTender}
          >
            <Select placeholder="select type" onChange={onSelectTender} style={{width: 230}}>
              {tenderData.map((item) => {
                return <Option value={item}>{item}</Option>;
              })}
            </Select>
          </Form.Item>

          {form.getFieldsValue("register").type !== "pos" ? <Form.Item
            name="payment"
            label="Payment"
            labelAlign="left"
            rules={[
              {
                required: false,
                message: "Please select payment!",
              },
            ]}
          >
            <Select placeholder="select type" style={{width: 230}}>
              {paymentData.map((item) => {
                return <Option value={item}>{item}</Option>;
              })}
            </Select>
          </Form.Item> : null }

          <Form.Item
            name="upload"
            label="Upload"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "File attachment is required",
              },
            ]}
          >
            <Upload {...props} name="fileUpload">
              <Button icon={<UploadOutlined />}>Choose file</Button>
            </Upload>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <div className="mt-3">
            <Button type="primary" htmlType="submit" color={COLORS.themeGreen} loading={uploading}>
              Submit
            </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
