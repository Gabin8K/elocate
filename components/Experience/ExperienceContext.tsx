import { createContext, FunctionComponent, PropsWithChildren, useContext, useState } from "react";


type State = {

}


interface ExperienceContextType {
}


export const ExperienceContext = createContext<ExperienceContextType>({
 
});


export const useExperiences = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperiences must be used within a ExperienceProvider');
  }
  return context;
}



export const ExperienceProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<State>({});


  return (
    <ExperienceContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  )
}