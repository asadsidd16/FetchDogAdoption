import Skeleton from "@mui/material/Skeleton";

const LoadingSkeleton = () => {
  const skeletonCount = 4; // Number of skeletons to display
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {[...Array(skeletonCount)].map((_, index) => (
        <div>
          <Skeleton key={index} variant="rounded" width={275} height={320} />
          <Skeleton
            key={index}
            variant="rounded"
            width={275}
            height={320}
            sx={{ marginTop: 2 }}
          />
          <Skeleton
            key={index}
            variant="rounded"
            width={275}
            height={320}
            sx={{ marginTop: 2 }}
          />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
