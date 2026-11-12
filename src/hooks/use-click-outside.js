import { useEffect } from "react";

/**
 * Custom hook that triggers a callback when a click or touch occurs outside the referenced element.
 *
 * @param {React.RefObject} ref - The React ref of the container element
 * @param {Function} handler - The callback function to invoke on outside click
 */
export function useClickOutside(ref, handler) {
  useEffect(() => {
    function listener(event) {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

