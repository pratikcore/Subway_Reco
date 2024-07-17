import React, { useEffect } from "react";
import {
  DatePicker, Table, Tag, Select,
  Button,
  Space
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ASYNC_GENERATE_REPORT_DOWNLOAD, DOWNLOAD_REPORT_API, GET_ALL_ASYNC_GENERATE_REPORT, REPORT_FIELD_API } from "../../ApiCalls/ApiCall/apiCalls";
import { downloadReportsFun } from "../../Helper/Utils";
import { useSelector } from "react-redux";
import moment from "moment";
import COLORS from "../../Common/Constants/Colors";

const { RangePicker } = DatePicker;
const { Option } = Select;

const MINUTE_MS = 30000;


export default function Reports() {

  const [dataType, setDataType] = useState('SWIGGY');
  const [dataSets, setDataSets] = useState([]);
  const [selectedField, setSelectedField] = useState([]);

  const [reportDataRow, setReportDataRow] = useState([]);

  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const storeData = useSelector(
    (state) => state.ReconciliationService.ReconciliationStore || {}
  );
  const { storeCode = [] } = storeData || {};
  const [isDownLoading, setIsDownLoading] = useState(false);

  const columns = [
    {
      title: () => {return <strong>Report Type</strong>},
      dataIndex: 'reportType',
      key: 'reportType',
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
      title: () => {return <strong>File Size(mb)</strong>},
      key: 'fileSize',
      dataIndex: 'fileSize',
      align: 'center'
    },
    {
      title: () => {return <strong>Status</strong>},
      key: 'status',
      dataIndex: 'status',
      align: 'center'
    },
    {
      title: () => {return <strong>Generation</strong>},
      key: 'createdAt',
      dataIndex: 'createdAt',
      align: 'center'
    },
    {
      title: () => {return <strong>File Name</strong>},
      key: 'fileName',
      dataIndex: 'fileName',
      align: 'center',
      width: 136
    },
    {
      title: '',
      key: 'action',
      render: (record) => (
          <DownloadOutlined onClick={()=>onFileDownload(record)}/>
        )
    }
  ];


  useEffect(()=>{
    getDataSets();
  },[])

  useEffect(() => {
    REPORT_FIELD_API(`/?category=${dataType}`).then((res) => {
      setDataSets(
        res?.data?.data?.map((item) => ({
          displayName: item?.name,
          technicalName: item?.technicalName,
          value: item?.name,
          key: item?.technicalName,
        }))
      );
    });
  }, [dataType]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Logs every 30 seconds');
      getDataSets();
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [])

  const onRangeChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0]+'00:00:00');
    setEndDate(dateStrings[1]+'23:59:59');
  }

  const onSelectType = (e) => {
    setDataType(e);
  }

  const handleChange = (strValue, objValue) => {
    let arrField = objValue.map((item) => {
      return item?.technicalName
    })
    setSelectedField(arrField);
  };


  const getDataSets = () => {
    GET_ALL_ASYNC_GENERATE_REPORT({
      payload: {},
    })
      .then((res) => {
        if (res.data?.data) {
          setReportDataRow(res.data?.data);
        }
      })
      .catch((err) => {
      });
  };

  const onDownloadReport = () => {
    if (
      endDate !== "" &&
      startDate !== "" &&
      selectedField.length > 0 &&
      dataType
    ) {
      setIsDownLoading(true);
      DOWNLOAD_REPORT_API({
        payload: {
          required_fields: selectedField,
          endDate: endDate,
          startDate: startDate,
          tender: dataType,
          stores: storeCode?.length > 0 ? storeCode : null,
        }
      }).then((csvData) => {
        downloadReportsFun(csvData.data, "Customized Reports");
      }).finally(() => {
        setIsDownLoading(false);
      })
    }
  };

  const onFileDownload = (record) => {
    ASYNC_GENERATE_REPORT_DOWNLOAD({
      params: record?.id,
    })
      .then((res) => {
        const { data = "" } = res || {};
        const contentType = res?.header?.["content-type"];
        const contentDisposition = res?.headers["content-disposition"];
        const fileNameMatch =
          contentDisposition && contentDisposition.match(/filename="(.+)"/);
        const fileName = fileNameMatch
          ? fileNameMatch[1]
          : record?.fileName;
        downloadReportsFun(data, fileName, contentType);
      })
      .catch((err) => {
      });
  }

  return (
    <div>
      <div className="filter-row w-full">
        <strong className="text-lg">Download Generated Reports</strong>
        <Table columns={columns} dataSource={reportDataRow} />
      </div>
      <div className="filter-row">
        <strong className="text-lg">Download Generated Reports</strong>
        <div className="flex" style={{gap: 20}}>
          <div className="w-full">
            <Select placeholder="select type" onChange={onSelectType} style={{width: '100%'}} value={dataType}>
              <Option value="SWIGGY">SWIGGY</Option>
              <Option value="ZOMATO">ZOMATO</Option>
            </Select>
          </div>
          <div className="w-full">
            <Select
              mode="multiple"
              allowClear
              style={{width: '100%'}}
              placeholder="Please select"
              onChange={handleChange}
              options={dataSets}
              optionRender={(option) => (
                <Space>
                  {option.data?.displayName}
                </Space>
              )}
            />
          </div>
          <div className="w-full">
            <RangePicker onChange={onRangeChange} style={{width: '100%'}} disabledDate={d => !d || d.isAfter(moment(new Date()).format('YYYY-MM-DD'))}/>
          </div>
          <div>
            <Button onClick={onDownloadReport} type="primary" icon={<DownloadOutlined />} loading={isDownLoading} size={'middle'} disabled={endDate === "" || startDate === "" || selectedField.length === 0} color={COLORS.themeGreen}>
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
