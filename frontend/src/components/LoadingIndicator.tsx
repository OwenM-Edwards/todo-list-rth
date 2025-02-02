import ClipLoader from "react-spinners/ClipLoader";

const LoadingIndicator = () => {
  return (
    <ClipLoader
      color={"#40de18"}
      loading={true}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoadingIndicator;
