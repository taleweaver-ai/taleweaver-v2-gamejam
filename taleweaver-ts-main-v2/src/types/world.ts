import { AvatarProps } from "@/types/avatar";

export interface WorldCardProps {
  id: string,
  title: string;
  description: string;
  url: string;
  assistant: string;
}

export interface WorldProps {
  title: string,
  description: string,
  theme: string,
  mode: string,
  avatars: AvatarProps[]
}

export interface DojoWorldProps {
  assistant: string,
  cid: string
}

export interface PlayWorldProps {
  assistant: string,
  avatar: AvatarProps
}
