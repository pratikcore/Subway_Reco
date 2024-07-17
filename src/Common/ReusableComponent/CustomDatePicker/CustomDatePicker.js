import React from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const CustomDatePicker = ({ datePickerHandler }) => {
  const handleDateRangeChange = (dates, dateStrings) => {
    // Pass the selected date range to the provided datePickerHandler callback
    datePickerHandler(dateStrings);
  };

  const defaultDateRange = ['2024-05-01', '2024-05-10'];
  return (
    <Space direction="vertical" size={12}>
      <RangePicker allowClear={false} onChange={handleDateRangeChange} className='componentHeight40' defaultValue={[dayjs(new Date()), dayjs(new Date())]}/>
    </Space>
  );
};

export default CustomDatePicker;
