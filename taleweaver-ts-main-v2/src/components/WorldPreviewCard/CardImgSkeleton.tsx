import Skeleton from "react-loading-skeleton";

export default function CardImgSkeleton() {
  return (
    <Skeleton width="100%" height={180}
      style={{
        lineHeight: "unset",
        borderRadius: "var(--bs-card-inner-border-radius) var(--bs-card-inner-border-radius)0 0"
      }} />
  );
}
