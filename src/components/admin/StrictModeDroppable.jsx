import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

// Wrapper component to make react-beautiful-dnd work in React.StrictMode
export function StrictModeDroppable({ children, ...props }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Small delay to let the DOM render before enabling drag and drop
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
}