import { useEffect, useState } from "react";
import { CommentField } from "@/services/types";
import { useGetChildComments } from "@/services/hooks";


export function useExperienceCard(id?: string, currentReply?: CommentField) {
  const [canSeeMore, setCanSeeMore] = useState(false);

  const subItem = useGetChildComments(id, canSeeMore);

  const seeMore = () => {
    setCanSeeMore(true);
  }

  useEffect(() => {
    if (id && currentReply) {
      if (id === currentReply.parentId) {
        subItem.setComments(prev => [currentReply, ...prev]);
      }
    }
  }, [id, currentReply, subItem.setComments]);

  return {
    ...subItem,
    seeMore,
  };
}