import React from "react";
import { Card } from "antd";
import { Chart, Interval, Tooltip } from "@ant-design/charts";

const CustomCardWithCharts = ({
  title,
  data,
  cardWidth = 332,
  cardHeight = 162,
  cardContentWidth = "50%",
  cardContentHeight = "50%",
  chartContentWidth = "50%",
  chartContentHeight = "50%",
  chart,
  cardType = "horizontal",
  leftCardSideCss = "",
  rightCardSideCss = "",
  leftCardComponent = <div>Add Here</div>,
  verticalCardBottom = <div></div>,
  bottomTitle = "",
  bottomTitleValue = "",
  CustomIcon,
}) => {
  // Configuration for the pie chart
  const config = {
    data,
    autoFit: false,
    // width,
    // height,
    appendPadding: 10,
    interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
    meta: {
      value: {
        formatter: (v) => `${v} units`,
      },
    },
  };

  return (
    <>
      {cardType == "horizontal" ? (
        <Card
          style={{
            width: cardWidth,
            height: cardHeight,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            justifyContent: "space-between",
            // marginRight: "8px",
            overflow: "auto",
            marginBottom: "8px",
          }}
          bodyStyle={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginTop: "4px",
            // flexWrap: "wrap",
            overflowY: "hidden",
          }}
        >
          {/* Left Side: Text Content */}
          {/* <div>{title}</div> */}
          <div
            className={leftCardSideCss}
            style={{ flex: 1, marginRight: 20, width: cardContentWidth }}
          >
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                background: "antiquewhite",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {title}
            </div>
            <div className="">{leftCardComponent}</div>
          </div>

          <div
            className={rightCardSideCss}
            style={{ flex: 1, width: chartContentWidth }}
          >
            {chart}
          </div>
          {bottomTitleValue && (
            <div
              style={{
                display: "flex",
                border: "1px solid lightgray",
                borderRadius: "6px",
                padding: "3px",
              }}
            >
              <span>
                {bottomTitle}:{bottomTitleValue}
              </span>{" "}
              {CustomIcon}
            </div>
          )}
        </Card>
      ) : (
        <Card
          style={{
            width: cardWidth,
            height: cardHeight,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // marginRight: "8px",
            overflow: "auto",
            marginBottom: "8px",
          }}
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* Top Side: Pie Chart */}
          <div
            style={{
              flex: 1,
              width: chartContentWidth,
              height: chartContentHeight,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                width: "100%",
                background: "antiquewhite",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {title}
            </div>
            {chart}
          </div>
          <div
            style={{
              // flex: 1,
              width: cardContentWidth,
              height: cardContentHeight,
            }}
          >
            {verticalCardBottom}
            <ul>
              {data?.map((item) => (
                <li key={item.type}>
                  <strong>{item.type}:</strong> {item.value} units
                </li>
              ))}
            </ul>
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid lightgray",
              borderRadius: "6px",
              padding: "3px",
            }}
          >
            {bottomTitle && bottomTitleValue && (
              <>
                <span>
                  {bottomTitle}:{bottomTitleValue}
                </span>
                {CustomIcon}{" "}
              </>
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default CustomCardWithCharts;
