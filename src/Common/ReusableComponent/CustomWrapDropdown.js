import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';

const CustomWrapDropdown = ({ menuProps, mainCss = "", disabled = false }) => {
  return (
    <Space wrap className={mainCss}>
      <Dropdown 
      disabled={disabled}
      menu={{
          items: menuProps.items,
          onClick: menuProps.onClick
      }}>
        <Button className='componentHeight40'>
          <Space>
            {menuProps?.value?.key || "Select"}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
}
export default CustomWrapDropdown;