import RadioButton from "./RadioButton";

interface Option {
  label: string;
  value: string;
}

interface RadioButtonGroupProps {
  id: string;
  options: Option[];
  name: string;
  variant?: string;
  checkedIdx?: number | false;
  onChange?: (_: any) => void;
}

export default function RadioButtonGroup({ id, options, name, variant = "outline-primary", checkedIdx = 0, onChange }: RadioButtonGroupProps) {
  return (
    <div className="d-flex flex-wrap">
      {options.map(({ label, value }, idx) =>
        <RadioButton key={idx} id={id + idx} label={label} value={value} name={name} checked={idx === checkedIdx} variant={variant} onChange={onChange} />)
      }
    </div>
  );
}
