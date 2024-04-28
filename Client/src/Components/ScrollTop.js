import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // Reacting on changes to location (path)

  return null; // This component does not render anything
}
export default ScrollTop;
