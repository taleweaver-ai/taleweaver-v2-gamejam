"use client";
import { ChangeEventHandler } from "react";
import { AvatarProps } from '@/types/avatar';
import CheckRadioCard from '@/components/Form/CheckRadioCard';

interface Props {
  avatars: Array<AvatarProps>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function AvatarOptions({ avatars, onChange }: Props) {
  return (
    <>
      {avatars.map(({ id, name, alias, description }, idx) =>
        <CheckRadioCard key={idx} type={"checkbox"} id={id} value={id} title={name} description={description} onChange={onChange} />
      )}
    </>
  );
}
