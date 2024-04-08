import CheckRadioCard from "./CheckRadioCard";

interface Option {
  title?: string;
  description?: string;
  value: string;
}

interface RadioCardGroupProps {
  id: string;
  options: Option[];
  name: string;
  imgSrc?: string;
  checkedIdx?: number | false;
  onChange?: (_: any) => void;
}

export default function RadioButtonGroup({
  id,
  options,
  name,
  checkedIdx = 0,
  onChange,
}: RadioCardGroupProps) {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {options.map(({ title, description, value, imgSrc }, idx) => (
        <CheckRadioCard
          key={idx}
          type="radio"
          id={id + idx}
          value={value}
          title={title}
          description={description}
          imgSrc={imgSrc}
          name={name}
          checked={idx === checkedIdx}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
