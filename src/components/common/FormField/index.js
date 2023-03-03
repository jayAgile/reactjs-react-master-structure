import React from "react";

//basic input component
export const RenderInput = ({
  regName,
  labelName,
  type = "text",
  containerClass,
  placeholder,
  register,
  errors,
  ...props
}) => {
  const shortenedLabel = labelName.replace(/\s+/g, "");
  return (
    <div className={containerClass}>
      <label style={{ marginRight: 10 }}>{labelName}</label>
      {/* <input type={type} {...props} className={inputClass} name={name} /> */}
      <input type={type} {...props} {...register} placeholder={placeholder} />
      {errors[shortenedLabel] && (
        <span>*{errors[shortenedLabel]?.message}</span>
      )}
    </div>
  );
};

//drop down button component
export const Select = React.forwardRef(
  ({ onChange, onBlur, name, label, options = [{}], errors }, ref) => (
    <div style={{ flexDirection: "row", marginBlock: 20 }}>
      <label style={{ marginRight: 10 }}>{label}</label>
      <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
        {options.map((obj) => (
          <option key={obj?.value} value={obj?.value}>
            {obj?.name}
          </option>
        ))}
      </select>
      {errors && errors["fruits"] && <span>*{label} is required</span>}
    </div>
  )
);

export const RadioButton = ({ label, id, register, errors, ...rest }) => {
  return (
    <>
      <input id={id} type="radio" {...register} {...rest} />
      <span>{label}</span>
    </>
  );
};

// radio component
export const RadioButtonGroup = ({ label, options, onChange, errors }) => {
  function renderOptions() {
    return options.map(({ label, name, disabled = false, register }, index) => {
      // console.log(label);
      const shortenedOptionLabel = label.replace(/\s+/g, "");
      const optionId = `radio-option-${shortenedOptionLabel}`;

      return (
        <RadioButton
          value={label}
          label={label}
          register={register}
          key={optionId}
          errors={errors}
          id={optionId}
          name={name}
          disabled={disabled}
          // defaultChecked={index === 0}
          onChange={onChange}
        />
      );
    });
  }
  return (
    <div>
      <span>{label}</span>
      <div>{renderOptions()}</div>
      {errors && errors["radioBtn-types"] && <span>*{label} is required</span>}
    </div>
  );
};

export const CheckBox = ({
  label,
  options,
  onChange,
  name,
  register,
  errors,
  ...rest
}) => {
  return (
    <>
      <input type="checkbox" name={name} {...register} {...rest} />
      <span>{label}</span>
    </>
  );
};

//checkBox component
export const CheckBoxGroup = ({ label, options, onChange, errors }) => {
  function renderOptions() {
    return options.map(({ label, name, disabled = false, register }, index) => {
      // console.log(label);
      const shortenedOptionLabel = label.replace(/\s+/g, "");
      const optionId = `checkbox-option-${shortenedOptionLabel}`;

      return (
        <CheckBox
          value={label}
          label={label}
          register={register}
          key={optionId}
          id={optionId}
          errors={errors}
          name={name}
          disabled={disabled}
          // defaultChecked={index === 0}
          onChange={onChange}
        />
      );
    });
  }
  return (
    <div>
      <span>{label}</span>
      <div>{renderOptions()}</div>
      {errors && errors["checkbox-types"] && <span>*{label} is required</span>}
    </div>
  );
};
