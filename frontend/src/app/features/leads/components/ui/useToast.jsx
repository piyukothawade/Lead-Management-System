import { useState } from "react";

let listeners = [];

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const notify = (message, type = "success") => {
    const id = Date.now();

    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return { toasts, notify };
}