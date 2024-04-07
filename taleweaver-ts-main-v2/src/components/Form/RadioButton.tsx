import Skeleton from "react-loading-skeleton";

interface RadioButtonProps {
  id: string;
  label: string;
  value?: string;
  name: string;
  checked?: boolean;
  variant?: string;
  onChange?: (_: any) => void;
}

export default function RadioButton({ id, label, value, name = "", checked = false, variant = "outline-primary", onChange }: RadioButtonProps) {
  // Format label to be used as value if not provided
  value = value || label.toLowerCase().replace(" ", "-");
  // If label is not provided, set checked to false
  checked = (label && label !== "") ? checked : false;
  // If label is not provided, disable button
  const labelStyle = {
    width: label ? "auto" : "5rem",
    height: label ? "auto" : "2rem",
  };
  return (
    <div className="p-1">
      {
        label ?
          <>
            <input type="radio" className="btn-check" name={name} id={id} value={value} defaultChecked={checked} />
            <label className={"btn btn-" + variant} htmlFor={id} style={labelStyle} onClick={() => {
              if (onChange && value)
                onChange(value);
            }}>
              {label}
            </label>
          </>
          : <Skeleton width="7rem" height="2.2rem" />
      }
    </div>
  );
}
