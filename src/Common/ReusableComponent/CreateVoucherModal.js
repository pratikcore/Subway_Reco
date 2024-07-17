import { useState } from "react";
import { Button, DatePicker, Divider, Form, Modal, Select } from "antd";
import COLORS from "../Constants/Colors";

const { RangePicker } = DatePicker;
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

const initTenderTypeForBanking = ["HDFC", "ICICI", "AMEX", "SBI", "PAYTM", "PINE_LABS"];

const CreateVoucherModal = ({isOpenModal = false, onCancel = () => {},}) => {


    const [tenderTypeOpt, setTenderTypeOpt] = useState(initTenderTypeForBanking);

    const [form] = Form.useForm();

    const onClose = () => {
        form.resetFields(['dateRange', 'tender']);
        onCancel();
    };
    const onFinish = (values) => {};
    const onSelectType = (e) => {};
    const onDataCreateVoucher = (e, date) => {};
    const onSelectTender = (e) => {};

    return (
        <Modal
            // title="Vertically centered modal dialog"
            centered
            open={isOpenModal}
            footer={null}
            // closable={false}
            onCancel={onClose}
            destroyOnClose
        >
          <div className="w-full">
              <div className="flex">
                  <strong className="text-lg w-full">Create Voucher</strong>
              </div>
              <Divider style={{marginBlock: 10}}/>
              <div className="mt-5">
                <Form
                  {...formItemLayout}
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  initialValues={{
                    type: "3po",
                    tender: 'Promo Master',
                    payment: 'Promo Master'
                  }}
                  style={{
                    maxWidth: 400,
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
                  >
                    <Select placeholder="select type" onChange={onSelectType} style={{width: 230}}>
                      <Option value="3po">3PO</Option>
                      <Option value="pos">POS</Option>
                      <Option value="banking">Banking</Option>
                    </Select>
                  </Form.Item>

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
                      <RangePicker onChange={onDataCreateVoucher} style={{width: 230}}/>
                  </Form.Item>
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
                  >
                    <Select placeholder="select type" onChange={onSelectTender} style={{width: 230}}>
                      {tenderTypeOpt.map((item) => {
                        return <Option value={item}>{item}</Option>;
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <div className="mt-3">
                    <Button type="primary" htmlType="submit" color={COLORS.themeGreen} loading={false}>
                      Generate Voucher
                    </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Modal>
    )
}

export default CreateVoucherModal;