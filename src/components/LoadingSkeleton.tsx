import Skeleton from "@mui/material/Skeleton";

const LoadingSkeleton = () => {
  const skeletonCount = 6;
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {[...Array(skeletonCount)].map((_, index) => (
        <div>
          <Skeleton key={index} variant="rounded" width={275} height={320} />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
