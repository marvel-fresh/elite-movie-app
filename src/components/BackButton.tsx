import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="back-btn header-back-btn"
      onClick={() => navigate(-1)}
      aria-label="Go back"
    >
      ← Back
    </button>
  );
};

export default BackButton;