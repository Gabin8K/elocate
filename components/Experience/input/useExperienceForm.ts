import { Keyboard } from "react-native";
import { useCallback, useRef } from "react";
import { useFormCommentSubmit } from "@/services/hooks";

type FormExperience = {
  text: string;
}


export function useExperienceForm() {
  const formRef = useRef<FormExperience>({ text: '' });

  const { onSubmit, loading } = useFormCommentSubmit();

  const setValue = useCallback(<T extends keyof FormExperience>(key: T, value: FormExperience[T]) => {
    formRef.current[key] = value;
  }, [])


  const handleSubmit = useCallback(async (replyId?: string) => {
    Keyboard.dismiss();
    return await onSubmit(formRef.current.text, replyId);
  }, []);


  return {
    loading,
    setValue,
    handleSubmit,
  }

}