import { useState } from "react";
import { createContext } from "react";
export let CounterContext = createContext();

function CounterContextProvider({ children }) {
  const [counter, setCounter] = useState(0);
  return (
    <CounterContext.Provider value={counter}>
      {children}
    </CounterContext.Provider>
  );
}

export default CounterContextProvider;
