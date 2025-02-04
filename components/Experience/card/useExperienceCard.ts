import { useEffect } from "react";
import { CommentField } from "@/services/types";
import { useGetChildComments } from "@/services/hooks";

type Props = {
  id?: string;
  currentReply?: CommentField;
  setComments?: React.Dispatch<React.SetStateAction<CommentField[]>>;
}


export function useExperienceCard(props: Props) {
  const { id, currentReply, setComments } = props;

  const subItem = useGetChildComments(id);

  const seeMore = () => {
    subItem.loadMore();
  }

  useEffect(() => {
    if (id && currentReply) {
      if (id === currentReply.parentId) {
        subItem.setComments(prev => [currentReply, ...prev]);
        setComments?.(prev => prev.map(comment => {
          if (comment.id === id) {
            return {
              ...comment,
              childLength: comment.childLength + 1,
            }
          }
          return comment;
        }))
      }
    }
  }, [id, currentReply]);

  return {
    ...subItem,
    seeMore,
  };
}