import Skeleton from "@mui/material/Skeleton";

const LoadingSkeleton = () => {
  const skeletonCount = 5;
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {[...Array(skeletonCount)].map((_, index) => (
        <div key={index}>
          <Skeleton variant="rounded" width={275} height={320} />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
