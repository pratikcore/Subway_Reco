import React from "react";
import { Card, Select } from "antd";
import "./CustomCard.css";
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
  chatBoxHeight,
  renderDD = <div />,
  renderSelection = null,
  renderFigure = null,
  isApply = false,
  titleDD = null,
}) => {
  const config = {
    data,
    autoFit: false,
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
      <div className={`custom-card`}>
        <div
          style={{
            height: '100%',
            display: isApply ? 'flex' : 'block',
            justifyContent: isApply ? 'center' : 'flex-start'
            // flex: 1,
            // width: chartContentWidth,
            // height: chartContentHeight,
          }}
        >
          {title ? <div
            className={`card-title-box ${title?.props?.children}`}
            style={{display : titleDD ? 'flex' : 'block',justifyContent:'center', alignItems:'center'}}
          >
            {title} {titleDD}
          </div> : null }
          {/* <div className="chart-box">
            {chart}
          </div> */}
          {renderFigure && (
            <div className="figureDiv">
              <strong className="text-lg">{renderFigure}</strong>
            </div>
          )}
        </div>
        {/* <div
          style={{
            // width: cardContentWidth,
            // height: cardContentHeight,
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
        </div> */}
        <div
          className={`card-action-box`}
        >
          {/* <Select
            defaultValue="allcharges"
            style={{
              width: '60%',
            }}
            // onChange={handleChange}
            options={[
              {
                value: 'allcharges',
                label: 'All Charges',
              },
              {
                value: 'charges',
                label: 'Charges',
              },
              {
                value: 'promo',
                label: 'Promo',
              },
            ]}
          /> */}
          {bottomTitle && (
            <>
              {bottomTitleValue && 
                renderDD
                // <div className="ddClass">
                //   {renderDD}
                //   <p>{bottomTitleValue}</p>
                // </div>
              }
              
              <p>{bottomTitle}</p>
              {/* <strong className="text-sm">{bottomTitleValue}</strong> */}
              {CustomIcon}{" "}
            </>
          )}
          
          {(renderSelection || titleDD) && (
            <div>{renderSelection}
            {CustomIcon}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomCardWithCharts;
