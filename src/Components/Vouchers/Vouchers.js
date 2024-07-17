import { Button, DatePicker, Divider, Form, Input, Modal, Select, Table, Tabs } from "antd";
import CustomButton from "../../Common/ReusableComponent/CustomButton/CustomButton";
import CustomDatePicker from "../../Common/ReusableComponent/CustomDatePicker/CustomDatePicker";
import { useEffect, useState } from "react";
import CustomWrapDropdown from "../../Common/ReusableComponent/CustomWrapDropdown";
import { SearchOutlined, PlusOutlined, DownloadOutlined, CloseOutlined } from "@ant-design/icons";
import CustomDashboardCard from "../../Common/ReusableComponent/CustomDashboardCard";
import { GET_VOUCHER_TYPE_API, REPORTING_TENDERS_API } from "../../ApiCalls/ApiCall/apiCalls";
import COLORS from "../../Common/Constants/Colors";
import CreateVoucherModal from "../../Common/ReusableComponent/CreateVoucherModal";


const { Option } = Select;

const initTenderTypeForBanking = ["HDFC", "ICICI", "AMEX", "SBI", "PAYTM", "PINE_LABS"];
const initTransactionTypeForBanking = ["CARD", "UPI"];
const initVoucherTypeForBanking = ["Transfer", "Final"];

export default function Vouchers() {

    const [isSearching, setIsSearching] = useState(false);

    const [selectedType, setSelectedType] = useState(null);
    const [tenderType, setTenderType] = useState(null);
    const [transactionType, setTransactionType] = useState(null);
    const [voucherType, setVoucherType] = useState(null);

    const [tenderTypeOpt, setTenderTypeOpt] = useState(initTenderTypeForBanking);
    const [transactionTypeOpt, setTransactionTypeOpt] = useState(initTransactionTypeForBanking);
    const [voucherTypeOpt, setVoucherTypeOpt] = useState(initVoucherTypeForBanking);

    const [reportDataRow, setReportDataRow] = useState([]);

    const dashboardItems = [
        {
          key: '1',
          type: 'group',
        //   label: '3PO',
          children: [
            {
              key: 'HDFC',
              label: 'HDFC',
            },
            {
              key: 'ICICI',
              label: 'ICICI',
            },
            {
              key: 'AMEX',
              label: 'AMEX',
            },
          ],
        },
      ]
    const tabItem = [{
            label: 'Created Voucher',
            key: 'createdVoucher',
            // children: `Content of card tab ${id}`,
        },{
            label: 'Vouchers Created',
            key: 'vouchersCreated',
            // children: `Content of card tab ${id}`,
        },{
            label: 'Vouchers Pending Approval',
            key: 'vouchersPendingApproval',
            // children: `Content of card tab ${id}`,
        },{
            label: 'Vouchers Rejected',
            key: 'vouchersRejected',
            // children: `Content of card tab ${id}`,
        }]
    const columns = [
        {
            title: () => {return <strong>Type</strong>},
            dataIndex: 'type',
            key: 'type',
            align: 'center'
        },
        {
            title: () => {return <strong>Tender</strong>},
            dataIndex: 'tender',
            key: 'tender',
            align: 'center'
        },
        {
            title: () => {return <strong>Transaction Type</strong>},
            dataIndex: 'transactionType',
            key: 'transactionType',
            align: 'center'
        },
        {
            title: () => {return <strong>Voucher Type</strong>},
            dataIndex: 'voucherType',
            key: 'voucherType',
            align: 'center'
        },
        {
            title: () => {return <strong>Start Date</strong>},
            dataIndex: 'startDate',
            key: 'startDate',
            align: 'center'
        },
        {
            title: () => {return <strong>End Date</strong>},
            dataIndex: 'endDate',
            key: 'endDate',
            align: 'center'
          },
          {
            title: () => {return <strong>Actions</strong>},
            key: 'action',
            align: 'center',
            render: (record) => (
                <DownloadOutlined onClick={()=>{}}/>
            )
        }
        ];
    
    const [dashboardType, setDashboardType] = useState(dashboardItems[0].children[0] || {});

    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        REPORTING_TENDERS_API().then((res) => {
          const { data = [] } = res?.data || {};
          if (data.length > 0) {
            
          }
        });

        GET_VOUCHER_TYPE_API().then((res) => {
            console.log("get voucher type", res);
            const { data = [] } = res.data || {};
            if (data.length > 0) {
            
            }
        })


    },[])

    const dashboardTypeDropdown = {
        items: dashboardItems,
        onClick: (e) => handleDashClick({ key: e.key, value: e.key, label: e.key }),
        // value: dashboardType.children ? dashboardType.children[0].key : dashboardType.key
        value: {key: dashboardType.key}
      };


    const onSearchDatePicker = (date) => {
        console.log("date picker", date);
        // setDateRange(update);
        // dateHandler({ startDate: update[0], endDate: update[1] });
        // if (date[0] && date[1]) {
        //   dispatch(updateDateRangeSelectDataToStore([date[0], date[1]]));
        //   setDownloadReports((prev) => ({
        //     ...prev,
        //     endDate: `${dateFormatChanger(date[1] || new Date())}23:59:59`,
        //     startDate: `${dateFormatChanger(date[0] || new Date())}00:00:00`,
        //   }));
        // }
      };

    const onTableSearchDatePicker = (date) => {
        console.log("date picker", date);
        // setDateRange(update);
        // dateHandler({ startDate: update[0], endDate: update[1] });
        // if (date[0] && date[1]) {
        //   dispatch(updateDateRangeSelectDataToStore([date[0], date[1]]));
        //   setDownloadReports((prev) => ({
        //     ...prev,
        //     endDate: `${dateFormatChanger(date[1] || new Date())}23:59:59`,
        //     startDate: `${dateFormatChanger(date[0] || new Date())}00:00:00`,
        //   }));
        // }
      };
    
    const onDataCreateVoucher = (dates, dateStrings) => {
      
    }

    const handleDashClick = (e) => {
    setDashboardType(e);
    };

    const onSelectType = (e) => {
        setSelectedType(e);

        if (e === 'BANKING') {
            setTenderTypeOpt(initTenderTypeForBanking);
            setTransactionType(initTransactionTypeForBanking);
            setVoucherType(initVoucherTypeForBanking);
    
            setTenderType('HDFC');
            setTransactionType('CARD');
            setVoucherType('TRANSFER');
        } else {
            
        }

    }

    const onSelectTender = (e) => {
        setTenderType(e);
    }

    const onSelectTransaction = (e) => {
        setTransactionType(e);
    }

    const onSelectVoucherType = (e) => {
        setVoucherType(e);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
      <div>
        <div className="filter-row flex gap-5">
          <div style={{ width: 500 }}>
            <CustomDatePicker datePickerHandler={onSearchDatePicker} />
          </div>
          <div>
            <CustomWrapDropdown menuProps={dashboardTypeDropdown} />
          </div>
          <div>
            <Button
              className="main-primary-button"
              style={{ width: "110px", height: "40px" }}
              loading={isSearching}
              icon={<SearchOutlined />}
            >
              Search
            </Button>
          </div>
          <div className="w-full flex justify-content-end">
            <Button
              className="main-primary-button"
              style={{ height: "40px" }}
              loading={isSearching}
              icon={<PlusOutlined />}
              onClick={()=>setIsOpenModal(true)}
            >
              Create Voucher
            </Button>
          </div>
        </div>

        <div className="w-full flex" style={{ gap: 15 }}>
          <CustomDashboardCard title={"Total Amount"} value={`0 L`} />
          <CustomDashboardCard title={"Vouchers Approved"} value={`0 L`} />
          <CustomDashboardCard title={"Pending Voucher"} value={`0 L`} />
        </div>
        <div className="w-full mt-10">
          <Tabs
            type="card"
            size={"middle"}
            items={tabItem}
          />
          <div className="filter-row">
            <div className="w-full flex mt-5 gap-5">
                <div>
                    <CustomDatePicker datePickerHandler={onTableSearchDatePicker} />
                </div>
                <div>
                    <Select placeholder="select Type" onChange={onSelectType} style={{height: "40px"}} value={selectedType}>
                        <Option value="charges">Banking</Option>
                        <Option value="allCharges">3PO</Option>
                    </Select>
                </div>
                <div>
                    <Select placeholder="select Tender" onChange={onSelectTender} style={{height: "40px"}} value={tenderType}>
                        {tenderTypeOpt.map((item) => {
                            return <Option value={item}>{item}</Option>
                        })}
                    </Select>
                </div>
                <div>
                    <Select placeholder="Transaction Type" onChange={onSelectTransaction} style={{height: "40px"}} value={transactionType}>
                        {transactionTypeOpt.map((item) => {
                            return <Option value={item}>{item}</Option>
                        })}
                    </Select>
                </div>
                <div>
                    <Select placeholder="Voucher Type" onChange={onSelectVoucherType} style={{height: "40px"}} value={voucherType}>
                        {voucherTypeOpt.map((item) => {
                            return <Option value={item}>{item}</Option>
                        })}
                    </Select>
                </div>
                <div>
                    <Button
                    className="main-primary-button"
                    style={{ width: "110px", height: "40px" }}
                    loading={isSearching}
                    icon={<SearchOutlined />}
                    >
                    Search
                    </Button>
                </div>
            </div>
            <div className="mt-10">
                <Table columns={columns} dataSource={reportDataRow} />
            </div>
          </div>
        </div>
        <CreateVoucherModal isOpenModal={isOpenModal} onCancel={()=>setIsOpenModal(false)}/>
      </div>
    );
}