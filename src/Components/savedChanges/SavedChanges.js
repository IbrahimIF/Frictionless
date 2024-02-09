// SavedChanges.js
import { useEffect, useContext } from "react";
import ThemeContext from "../Contexts/ThemeContext";


const Saved = () => {
  const { isDarkMode, setIsDarkMode} = useContext(ThemeContext);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      
    </>
  );
};

export default Saved;