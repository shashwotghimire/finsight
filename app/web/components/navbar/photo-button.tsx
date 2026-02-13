import { useMe } from "@/services/api/auth/auth.api";
import Image from "next/image";
import React from "react";

type PhotoButtonProps = {
  imageUrl: string;
  size: any;
  onClick?: () => void;
};
export const PhotoButton = ({
  imageUrl,
  size = 36,
  onClick,
}: PhotoButtonProps) => {
  return (
    <button onClick={onClick}>
      <Image
        src={imageUrl}
        alt="avatar"
        width={size}
        height={size}
        className="cursor-pointer hover:bg-neutral-400 rounded-full transition-colors"
      />
    </button>
  );
};

export const LogoButton = ({
  imageUrl,
  size = 44,
  onClick,
}: PhotoButtonProps) => {
  return (
    <button onClick={onClick}>
      <Image
        src={imageUrl}
        alt="avatar"
        width={size}
        height={size}
        className="cursor-pointer hover:bg-neutral-400 transition-colors"
      />
    </button>
  );
};
