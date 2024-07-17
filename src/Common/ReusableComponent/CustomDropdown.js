import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const CustomDropdown = ({ onClick, items, title = "" }) => (
  <Dropdown
    menu={{
      items,
      onClick
    }}
  >
    <a>
      <Space>
        {title}
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
export default CustomDropdown;