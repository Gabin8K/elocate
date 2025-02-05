import { CommentDoc, CommentField } from "@/services/types";
import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useState } from "react";


type State = {
  reply?: CommentDoc;
  showLoginModal?: boolean;
  showExperience?: boolean;
  currentReply?: CommentField;
}

type ReplyParams = {
  reply?: CommentDoc;
  currentReply?: CommentField;
}

interface ExperienceContextType {
  reply?: CommentDoc;
  showExperience?: boolean;
  showLoginModal?: boolean;
  currentReply?: CommentField;
  closeLoginModal: () => void;
  openLoginModal: () => void;
  setReply: (params: ReplyParams) => void;
  setShowExperience: (show: boolean) => void;
}


const initialValue: ExperienceContextType = {
  setReply: () => { },
  setShowExperience: () => { },
  closeLoginModal: () => { },
  openLoginModal: () => { },
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

  const setReply = useCallback(({ reply, currentReply }: ReplyParams) => {
    setState(state => ({
      ...state,
      reply,
      ...currentReply ? { currentReply } : {}
    }));
  }, []);

  const setShowExperience = useCallback((showExperience: boolean) => {
    setState(state => ({ ...state, showExperience }));
  }, []);

  const closeLoginModal = useCallback(() => {
    setState(state => ({ ...state, showLoginModal: false }));
  }, []);

  const openLoginModal = useCallback(() => {
    setState(state => ({ ...state, showLoginModal: true }));
  }, []);


  return (
    <ExperienceContext.Provider
      value={{
        ...state,
        setReply,
        openLoginModal,
        closeLoginModal,
        setShowExperience,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  )
}