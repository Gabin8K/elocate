import { useGetRootComments } from "@/services/hooks";
import { createContext, FunctionComponent, PropsWithChildren, useContext } from "react";

interface CommentContextType extends ReturnType<typeof useGetRootComments> {

}


const initialValue: CommentContextType = {
  isEmtpy: false,
  comments: [],
  loading: false,
  loadMore: async () => { },
  setComments: () => { },
}


export const CommentContext = createContext<CommentContextType>(initialValue);


export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useExperiences must be used within a CommentProvider');
  }
  return context;
}



export const CommentProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const rootComments = useGetRootComments();

  return (
    <CommentContext.Provider
      value={{
        ...rootComments,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}