import React, { useMemo } from "react";
import Select from "react-select";
import {components} from "react-select";
import makeAnimated from "react-select/animated";

const CustomMultiSelect = ({
  colourOptions,
  onChange,
  placeholder = "Select...",
  isDisabled = false,
  isMulti = false,
  value,
  isClearable = false,
  closeMenuOnSelect = true
}) => {
  const animatedComponents = makeAnimated();

  // Add "Select All" option to the beginning of the options array
  const options = useMemo(() => {
    const allOption = { value: "all", label: "Select All" };
    return [allOption, ...colourOptions];
  }, [colourOptions]);

  // const CustomClearText = () => <>clear all</>;

  // const ClearIndicator = (props) => {
  //   const {
  //     children = <CustomClearText />,
  //     getStyles,
  //     innerProps: { ref, ...restInnerProps },
  //   } = props;
  //   return (
  //     <div
  //       {...restInnerProps}
  //       ref={ref}
  //       style={getStyles('clearIndicator', props)}
  //     >
  //       <div style={{ padding: '0px 5px' }}>{children}</div>
  //     </div>
  //   );
  // };

  // const ClearIndicatorStyles = (
  //   base,
  //   state
  // ) => ({
  //   ...base,
  //   cursor: 'pointer',
  //   color: state.isFocused ? 'blue' : 'black',
  // });

  return (
    <>
      <Select
        isMulti={isMulti}
        name="colors"
        value={value}
        // defaultInputValue={isMulti ? options[0] : colourOptions[0]}
        isDisabled={isDisabled}
        placeholder={placeholder}
        options={isMulti ? options : colourOptions}
        components={animatedComponents}
        closeMenuOnSelect={closeMenuOnSelect}
        isClearable={isClearable}
        hideSelectedOptions={true}
        className="basic-multi-select text-xs"
        classNamePrefix="select text-start dropdown"
        // onChange={(selectedOptions) => {
        //   // If "Select All" is selected, pass all options to the onChange handler
        //   if (
        //     selectedOptions &&
        //     selectedOptions.length === options.length &&
        //     selectedOptions.some((opt) => opt.value === "all")
        //   ) {
        //     onChange(colourOptions);
        //   } else {
        //     // Otherwise, pass the selected options
        //     onChange(selectedOptions);
        //   }
        // }}
        onChange={(selectedOptions) => {
          // Check if it's a multi-select
          if (isMulti) {
            const allOption = options.find((opt) => opt.value === "all");
        
            // If "Select All" is selected, pass all options to the onChange handler
            if (selectedOptions && selectedOptions.includes(allOption)) {
              onChange(colourOptions);
            } else {
              // Otherwise, pass the selected options
              onChange(selectedOptions);
            }
          } else {
            // If not multi-select, just pass the selected option
            onChange(selectedOptions);
          }
        }}
        
        
      />
    </>
  );
};

export default CustomMultiSelect;
