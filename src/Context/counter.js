import { useCallback, useState } from "react";
import { createContext } from "react";
export let CounterContext = createContext();

function CounterContextProvider({ children }) {
  const [counter, setCounter] = useState(0);

  const updateCounter = (value) => {
    setCounter(value);
  };

  return (
    <CounterContext.Provider value={{ counter, updateCounter }}>
      {children}
    </CounterContext.Provider>
  );
}

export default CounterContextProvider;
