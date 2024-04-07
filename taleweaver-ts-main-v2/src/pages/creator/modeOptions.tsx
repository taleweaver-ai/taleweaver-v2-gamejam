import RadioButtonGroup from '@/components/Form/RadioButtonGroup';

export default function ModeOptions() {
  const modes = [
    { label: "Survival", value: "survival" },
    { label: "Creative", value: "creative" },
    { label: "Adventure", value: "adventure" },
  ]
  return (
    <RadioButtonGroup options={modes} id="modes" name="mode" />
  )
} 
