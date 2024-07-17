import React, { useEffect, useState } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import "./CustomReactCheckboxes.css";

const StoreFeatureCheckboxesComp = ({
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
  allValueCheckboxSelectedFeatureOn = true,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const activeStore =
    colourOptions?.filter((option) => option.posDataSync === true)?.length || 0;

  useEffect(() => {
    if (activeStore == value.length && activeStore > 0 && value.length > 0) {
      setSelectedOptions([{ label: "Select All", value: "*" }, ...value]);
    } else {
      setSelectedOptions(value.filter((i) => i.value !== "*"));
    }
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
      const nonDisabledOptions = colourOptions.filter(
        (option) => option.posDataSync
      );
      setSelectedOptions([
        { label: "Select All", value: "*" },
        ...nonDisabledOptions,
      ]);
      onChange([{ label: "Select All", value: "*" }, ...nonDisabledOptions]);
    } else if (
      event?.action === "deselect-option" &&
      event?.option?.value === "*"
    ) {
      setSelectedOptions([]);
      onChange([]);
    } else {
      if (typeof value !== "function") {
        setSelectedOptions(value.filter((i) => i.value !== "*"));
        onChange(value.filter((i) => i.value !== "*"));
      }
    }
  }

  const disabledOptions = colourOptions.filter((option) => option.isDisabled);

  return (
    <div
      className={`${isDisabled && "disabled-mcd"}`}
      id="custom-react-checkboxes"
    >
      <ReactMultiSelectCheckboxes
        options={[
          {
            label: "Select All",
            value: "*",
            isDisabled: colourOptions.every(i => i.posDataSync == false),
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
        minWidth={"180px"}
        placeholder={placeholder}
        onChange={onChange1}
        setState={setSelectedOptions}
        isClearable={true}
        isSearchable={true}
        components={{
          Option: ({ innerProps, label, data }) => {
            return (
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
                  checked={selectedOptions.some(
                    (o) => o?.value === data?.value
                  )}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (!data.isDisabled) {
                      onChange1((prevOptions) => {
                        if (isChecked) {
                          return [...prevOptions, data];
                        } else {
                          return prevOptions.filter(
                            (o) => o?.value !== data?.value
                          );
                        }
                      });
                    }
                  }}
                />
                <label htmlFor={`checkbox-${data.value}`} className="ml-1.5">
                  {label}
                </label>
              </div>
            );
          },
        }}
      />
    </div>
  );
};

export default StoreFeatureCheckboxesComp;
