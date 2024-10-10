import { useEffect, useRef } from "react";

function useClickOutside<T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handler]);

  return ref;
}

// Example usage:
function App() {
  const handleClickOutside = () => {
    console.log("Clicked outside");
  };

  const ref = useClickOutside<HTMLDivElement>(handleClickOutside);

  return (
    <div ref={ref} style={{ padding: "20px", backgroundColor: "lightblue" }}>
      Click outside this box
    </div>
  );
}

export default App;
