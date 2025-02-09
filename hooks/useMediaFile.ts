/* eslint-disable @typescript-eslint/no-unused-vars */

import { useLocale } from "./useLocale";
import { File } from "@/services/types";
import { useCallback, useState } from "react";
import * as ImagePicker from 'expo-image-picker';



export function useMediaFile() {

  const { t } = useLocale();
  const [file, setFile] = useState<File>();
  const [hasPermission, setHasPermission] = useState<boolean>()
  const [_, requestPermission] = ImagePicker.useMediaLibraryPermissions();


  const uploadFile = useCallback(async () => {
    if (hasPermission === undefined) {
      const result = await requestPermission()
      if (!result.granted) {
        throw new Error(t('error-file-permission'))
      }
      setHasPermission(result.granted)
    }

    if (hasPermission === false) return null;

    const document = await ImagePicker.launchImageLibraryAsync({
      quality: .8,
      mediaTypes: [
        'images',
        'livePhotos',
      ],
    })
    if (document.canceled) {
      return null;
    }
    const size = (document.assets[0].fileSize ?? 0) / 1024 / 1024;
    if (size > 3.5) {
      throw new Error(t('error-file-size'));
    }
    const _file: File = {
      uri: document.assets[0].uri as string,
      name: document.assets[0].fileName as string,
      type: document.assets[0]?.mimeType as string,
    }
    setFile(_file);
    return _file;
  }, [hasPermission, requestPermission, t])


  const reset = () => {
    setFile(undefined)
  }

  return {
    file,
    reset,
    uploadFile,
    hasPermission,
  }
}