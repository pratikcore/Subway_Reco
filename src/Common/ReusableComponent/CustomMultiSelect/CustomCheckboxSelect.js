import { useMemo, useState } from "react";
import Select, { components } from "react-select";
// import "./styles.css";

const InputOption = (props) => {
  const {
    getStyles,
    Icon,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    options,
    values,
    ...rest
  } = props;
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  // prop assignment
  const prop = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={prop}
    >
      <div className="mr-2 mt-1">
        <input
          type="checkbox"
          checked={
            isSelected ||
            (children === "Select All" &&
              values?.length === options?.length - 1)
          }
        />
      </div>
      {children}
    </components.Option>
  );
};

export const CustomCheckboxSelect = ({
  colourOptions,
  onChange = () => {},
  placeholder = "Select...",
  isDisabled = false,
  value,
  isClearable = true,
  closeMenuOnSelect = true,
  onClear = () => {}
}) => {
  
  const [selectedOptions, setSelectedOptions] = useState([]);

  const optionsD = useMemo(() => {
    const allOption = { value: "all", label: "Select All" };
    return [allOption, ...colourOptions];
  }, [colourOptions]);

  return (
    <div className="">
      <Select
        defaultValue={[]}
        isMulti
        hideSelectedOptions={false}
        onChange={(options, action) => {
          // if (Array.isArray(options)) {
          // setSelectedOptions(options.map((opt) => opt.value));
          const allOption = optionsD.find((opt) => opt.value === "all");

          // If "Select All" is selected, pass all options to the onChange handler
          if (options && options.includes(allOption)) {
            onChange(colourOptions);
          } else {
            // Otherwise, pass the selected options
            onChange(options);
          }

          if(action.action === "clear"){
            onClear()
          }
          // onChange(options);
          // onChange(colourOptions);
          // }
        }}
        options={optionsD}
        components={{
          Option: (props) => <InputOption values={value} {...props} />,
        }}
        name="colors"
        value={value}
        isDisabled={isDisabled}
        placeholder={placeholder}
        closeMenuOnSelect={false}
        isClearable={isClearable}
        className="basic-multi-select text-xs"
        classNamePrefix="select text-start dropdownCheckbox"
      />
      {/* <pre>{JSON.stringify({ selected: selectedOptions }, null, 2)}</pre> */}
    </div>
  );
};
