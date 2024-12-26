import { useState, useRef } from "react";
import { CameraView, CameraCapturedPicture } from "expo-camera";

export const useCamera = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<
    CameraCapturedPicture | null | undefined
  >(null);
  const cameraRef = useRef<CameraView>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo);
      setPreviewVisible(true);
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
  };

  return {
    previewVisible,
    capturedImage,
    cameraRef,
    takePicture,
    retakePicture,
  };
};
