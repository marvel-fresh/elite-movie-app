interface LoadingScreenProps {
  label?: string;
}

const LoadingScreen = ({ label = "Loading" }: LoadingScreenProps) => {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <img
        className="loading-logo"
        src="/logo.png"
        alt="Elite Movie"
        loading="eager"
        decoding="sync"
      />

      <div className="loading-indicator" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <p>{label}</p>
    </div>
  );
};

export default LoadingScreen;
