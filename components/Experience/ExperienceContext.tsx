import { CommentField } from "@/services/types";
import { useGetRootComments } from "@/services/hooks";
import { createContext, FunctionComponent, PropsWithChildren, useCallback, useContext, useState } from "react";


type State = {
  replyId?: string;
  showExperience?: boolean;
  currentReply?: CommentField;
}


interface ExperienceContextType {
  replyId?: string;
  showExperience?: boolean;
  currentReply?: CommentField;
  rootComments: ReturnType<typeof useGetRootComments>;
  setReplyId: (parentId?: string, currentRpely?: CommentField) => void;
  setShowExperience: (show: boolean) => void;
}


const initialValue: ExperienceContextType = {
  setReplyId: () => { },
  setShowExperience: () => { },
  rootComments: {
    isEmtpy: false,
    comments: [],
    loading: false,
    loadMore: async () => { },
    setComments: () => { },
  }
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
  const rootComments = useGetRootComments();

  const setReplyId = useCallback((replyId?: string, currentReply?: CommentField) => {
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
        rootComments,
        setReplyId,
        setShowExperience,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  )
}