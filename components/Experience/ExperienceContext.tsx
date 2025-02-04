import { CommentField } from "@/services/types";
import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useState } from "react";


type State = {
  replyId?: string;
  showExperience?: boolean;
  currentReply?: CommentField;
}

type ReplyParams = {
  replyId?: string;
  currentReply?: CommentField;
}

interface ExperienceContextType {
  replyId?: string;
  showExperience?: boolean;
  currentReply?: CommentField;
  setReplyId: (params: ReplyParams) => void;
  setShowExperience: (show: boolean) => void;
}


const initialValue: ExperienceContextType = {
  setReplyId: () => { },
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

  const setReplyId = useCallback(({ replyId, currentReply }: ReplyParams) => {
    setState(state => ({
      ...state,
      replyId,
      ...currentReply ? { currentReply } : {}
    }));
  }, []);

  const setShowExperience = useCallback((showExperience: boolean) => {
    setState(state => ({ ...state, showExperience }));
  }, []);


  return (
    <ExperienceContext.Provider
      value={{
        ...state,
        setReplyId,
        setShowExperience,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  )
}