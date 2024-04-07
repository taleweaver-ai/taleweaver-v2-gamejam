import RadioButtonGroup from '@/components/Form/RadioButtonGroup';

interface Props {
  onChange: (theme: string) => void;
}

export default function ThemeOptions({ onChange }: Props) {
  const themes = [
    { label: "Fantasy", value: "fantasy" },
    { label: "Sci-fi", value: "scifi" },
    { label: "Pixel Art", value: "pixel-art" },
    { label: "Abstract", value: "abstract" },
    { label: "Cartoon", value: "cartoon" },
    { label: "Anime", value: "anime" },
    { label: "Realistic", value: "realistic" },
    { label: "Kids", value: "kids" },
  ]
  return (
    <RadioButtonGroup options={themes} id="theme" name="theme" onChange={onChange} checkedIdx={false} />
  )
} 
