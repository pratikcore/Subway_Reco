import React, { useEffect } from "react";
import { Result, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getAccessTokenLocalStorage } from "../../../ApplicationStorage/LocalStorageFun";

const PageNotFound = () => {
  const navigate = useNavigate();
  const userDetails = getAccessTokenLocalStorage();
  const { access_token = "" } = userDetails || {};

  // if(access_token)(
  //   return null
  // )
  useEffect(() => {
    if(!access_token){
      returnToDash()
    }
  }, [])
  const returnToDash = () => {
    navigate("/");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link to="/">Back Home</Link>
        </Button>
      }
    />
  );
};

export default PageNotFound;
