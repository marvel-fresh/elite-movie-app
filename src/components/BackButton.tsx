import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="nav-1"
      onClick={() => navigate(-1)}
    >
      ← Back
    </button>
  );
};

export default BackButton;