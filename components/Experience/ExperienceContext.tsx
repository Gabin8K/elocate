import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useState } from "react";


type State = {
  showReply?: boolean;
  showExperience?: boolean;
}


interface ExperienceContextType {
  showReply?: boolean;
  showExperience?: boolean;
  setShowReply: (show: boolean) => void;
  setShowExperience: (show: boolean) => void;
}


const initialValue: ExperienceContextType = {
  setShowReply: () => { },
  setShowExperience: () => { },
}


export const ExperienceContext = createContext<ExperienceContextType>(initialValue);


export const useExperiences = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperiences must be used within a ExperienceProvider');
  }
  return context;
}



export const ExperienceProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<State>({});

  const setShowReply = useCallback((showReply: boolean) => {
    setState({ ...state, showReply });
  }, []);

  const setShowExperience = useCallback((showExperience: boolean) => {
    setState({ ...state, showExperience });
  }, []);


  return (
    <ExperienceContext.Provider
      value={{
        ...state,
        setShowReply,
        setShowExperience,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  )
}