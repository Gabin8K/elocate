/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { File } from "./ImageInput";



export default function useMediaFile() {

  const [file, setFile] = useState<File>();
  const [hasPermission, setHasPermission] = useState<boolean>()
  const [_, requestPermission] = ImagePicker.useMediaLibraryPermissions();


  const uploadFile = useCallback(async () => {
    if (hasPermission === undefined) {
      const result = await requestPermission()
      if (!result.granted) {
        throw new Error('Sorry, we need camera roll permissions to make this work!')
      }
      setHasPermission(result.granted)
    }

    if (hasPermission === false) return;

    const document = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: [
        'images',
        'livePhotos',
      ],
    })
    if (document.canceled) {
      throw new Error('Canceled');
    }
    const _file: File = {
      uri: document.assets[0].uri as string,
      name: document.assets[0].fileName as string,
      type: document.assets[0]?.mimeType as string,
    }
    setFile(_file);
  }, [hasPermission, requestPermission])


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