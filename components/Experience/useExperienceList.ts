import { useEffect } from "react";
import { useExperiences } from "./ExperienceContext";
import { useGetRootComments } from "@/services/hooks";


export function useExperienceList() {

  const { currentReply } = useExperiences();
  const rootComments = useGetRootComments();

  const loadMore = async () => {
    if (rootComments.loading || !rootComments.canFetch) return;
    await rootComments.loadMore();
  }

  useEffect(() => {
    if (currentReply) {
      if (!currentReply.parentId) {
        rootComments.setComments(prev => [currentReply, ...prev]);
      }
      else {
        rootComments.setComments(prev => prev.map(comment => {
          if (comment.id === currentReply.parentId) {
            return {
              ...comment,
              childLength: comment.childLength + 1,
            }
          }
          return comment;
        }));
      }
    }
  }, [currentReply]);


  return {
    ...rootComments,
    loadMore,
  };
}