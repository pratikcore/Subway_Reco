import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Radio, Space, Tooltip } from "antd";
const CustomButton = ({
  onClick,
  isLoading = false
}) => {
  const [position, setPosition] = useState("start");
  return (
    <>
      <Button className="main-primary-button" style={{width: '110px', height:'40px'}} loading={isLoading} onClick={onClick} icon={<SearchOutlined />} iconPosition={position}>
        Search
      </Button>
    </>
  );
};
export default CustomButton;
