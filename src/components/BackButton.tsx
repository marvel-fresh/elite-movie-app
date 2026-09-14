import { ArrowLeft } from "lucide-react";
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
      <ArrowLeft size={16} strokeWidth={2.5} aria-hidden="true" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;