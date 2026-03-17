import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import "./BackButton.css";

function BackButton({ className = "" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  return (
    <div className={`back-button-wrap ${className}`.trim()}>
      <button type="button" className="back-button" onClick={handleBack}>
        <HiOutlineArrowLeft />
        Back
      </button>
    </div>
  );
}

export default BackButton;
