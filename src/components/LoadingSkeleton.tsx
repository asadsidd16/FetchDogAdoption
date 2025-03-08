import Skeleton from "@mui/material/Skeleton";

const LoadingSkeleton = () => {
  return (
    <div>
      <Skeleton
        variant="rounded"
        width={"100%"}
        height={420}
        style={{ borderRadius: 8 }}
      />
    </div>
  );
};

export default LoadingSkeleton;
