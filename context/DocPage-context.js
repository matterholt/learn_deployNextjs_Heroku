import { useState, useEffect, createContext } from 'react'

const CurrentDocContext = createContext()



function CurrentDocProvider({ children }) {
  const [docState, setDocState] = useState({
    fontSize: 10
  });



  function UpdateDocState(event) {
    if (!event) {
      return new Error('Require a name and value attribute to update the Doc state')
    }
    const {name,value} = event;
    setDocState({ ...docState, [name]: value })
   }
 
    return (
      <CurrentDocContext.Provider value={{ docState, UpdateDocState }}>
        {children}
      </CurrentDocContext.Provider>
    );
}


function useCurrentDocState() {
    const context = React.useContext(CurrentDocContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentDocState must be used within a CurrentDoc Provider"
    );
  }
  return context;
}





// TODO export a function that will updated the doc state

export { CurrentDocProvider, useCurrentDocState };