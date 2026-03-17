import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineHome, HiOutlineSparkles } from "react-icons/hi2";
import "./PageActionBar.css";

function PageActionBar({ title, subtitle, className = "" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  return (
    <div className={`page-action-bar ${className}`.trim()}>
      <div className="page-action-copy">
        <span className="page-action-kicker">
          <HiOutlineSparkles />
          Smart Navigation
        </span>
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>

      <div className="page-action-buttons">
        <button type="button" className="page-action-btn page-action-secondary" onClick={handleBack}>
          <HiOutlineArrowLeft />
          Back
        </button>

        <button type="button" className="page-action-btn page-action-primary" onClick={() => navigate("/")}>
          <HiOutlineHome />
          Home
        </button>
      </div>
    </div>
  );
}

export default PageActionBar;
