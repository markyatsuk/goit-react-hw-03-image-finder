import { BallTriangle } from "react-loader-spinner";

function Loader() {
  return (
    <div className="loader-container">
      <BallTriangle color="#00BFFF" height={80} width={80} />
    </div>
  );
}
export { Loader };
