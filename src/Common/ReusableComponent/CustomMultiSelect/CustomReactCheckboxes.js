import React, { useEffect, useState } from "react";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import './CustomReactCheckboxes.css';

const CustomReactCheckboxes = ({
  colourOptions,
  onChange = () => {},
  placeholder = "Select...",
  isDisabled = false,
  value,
  buttonLabel = "",
  isClearable = true,
  closeMenuOnSelect = true,
  onClear = () => {},
  checkboxNotDisabled = false,
  allValueCheckboxSelectedFeatureOn = true
}) => {
  // const [selectedOptions, setSelectedOptions] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState([]);
  
  useEffect(() => {
    // if(allValueCheckboxSelectedFeatureOn){
      if (colourOptions.length === value.length) {
        // allValueCheckboxSelectedFeatureOn
        //   ? setSelectedOptions([{ label: "Select All", value: "*" }, ...value])
          setSelectedOptions([{ label: "Select All", value: "*" }, ...value]);
      } else {
        setSelectedOptions(value);
      }
    // } else {
    //   setSelectedOptions([]);
    // }

  }, [value]);


  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange1(value, event) {
    if (event?.action === "select-option" && event?.option?.value === "*") {
      setSelectedOptions(colourOptions);
      onChange(colourOptions);
    } else if (event?.action === "deselect-option" && event?.option?.value === "*") {
      setSelectedOptions([]);
      onChange([]);
    } else if (event?.action === "deselect-option") {
      setSelectedOptions(value?.filter((o) => o.value !== "*"));
      onChange(value?.filter((o) => o.value !== "*"));
    } else if (value?.length === colourOptions?.length - 1) {
      setSelectedOptions(colourOptions);
      onChange(colourOptions);
    } else {
      setSelectedOptions(value);
      onChange(value);
    }
  }

  const disabledOptions = colourOptions.filter((option) => option.isDisabled);


  return (
    <div
      className={`${isDisabled && "disabled-mcd rounded-lg"}`}
      id="custom-react-checkboxes"
    >
      <ReactMultiSelectCheckboxes
        options={[
          {
            label: "Select All",
            value: "*",
            isDisabled: checkboxNotDisabled ? true : false,
          },
          ...colourOptions?.map((option) => ({
            ...option,
            isDisabled: checkboxNotDisabled ? !option.posDataSync : false,
          })),
        ]}
        disabled={isDisabled}
        placeholderButtonLabel={buttonLabel}
        getDropdownButtonLabel={getDropdownButtonLabel}
        value={selectedOptions}
        minWidth={"140px"}
        placeholder={placeholder}
        onChange={onChange1}
        setState={setSelectedOptions}
        isClearable={true}
        isSearchable={true}
        components={{
          // Control: ({ innerProps }) => (
          //   <div {...innerProps}>
          //     <input type="text" placeholder="Search..."  />
          //   </div>
          // ),
          Option: ({ innerProps, label, data }) => (
            <div
              {...innerProps}
              disabled={data.isDisabled}
              className={`${
                data.isDisabled && "disabled-mcd"
              } font-medium px-2 py-1 cursor-pointer`}
            >
              <input
                type="checkbox"
                id={`checkbox-${data.value}`} // Adding unique id for the checkbox
                checked={selectedOptions.some((o) => o?.value === data?.value)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  if (!data.isDisabled) {
                    onChange1((prevOptions) => {
                      if (isChecked) {
                        return [...prevOptions, data];
                      } else {
                        return prevOptions.filter((o) => o?.value !== data?.value);
                      }
                    });
                  }
                }}
              />
              <label htmlFor={`checkbox-${data.value}`} className="ml-1.5">
                {label}
              </label>
            </div>
          ),
          // Control: () => null, // Remove the default Control component
        }}
      />
    </div>
  );
};

export default CustomReactCheckboxes;
