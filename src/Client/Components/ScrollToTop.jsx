import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = (props) => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on location change or initial render
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Ensure scroll happens even on first load
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return <>{props.children}</>;
};

export default ScrollToTop;
