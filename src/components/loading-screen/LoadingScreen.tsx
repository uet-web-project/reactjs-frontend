import "./styles.css"
export default function LoadingScreen() {
  return (
    <div className="spinner">
      <span>Loading...</span>
      <div className="half-spinner"></div>
    </div>
  );
}
