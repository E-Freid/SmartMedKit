import React, {useState} from "react";
import {imgSelectionOptionsMap} from "../../utilities/consts";
import MedKitModel from "../../services/MedKitModel";

import ImageContainer from "../../components/ImageContainer";
import Layout from "../../components/Layout";
import ImageOptionSelection from "../../components/ImageOptionSelection";
import ImageUploader from "../../components/ImageUploader";
import WebcamCapture from "../../components/WebcamCapture";
import InjuryResultModal from "../../components/InjuryResult";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(imgSelectionOptionsMap.UNINITIALIZED);
  const [image, setImage] = useState(null);
  const [injuryData, setInjuryData] = useState(null);

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
  };

  const handleImageSelection = (imgSrc) => {
    setImage(imgSrc);
  };

  const handleRetry = () => {
    setImage(null);
    setSelectedOption(imgSelectionOptionsMap.UNINITIALIZED);
    setInjuryData(null);
  };

  const handleModalHide = () => {
    setInjuryData(null);
  };

  const handleImageSend = async () => {
    if (image) {
      try {
        const modelResponse = await MedKitModel.sendPhoto(image);
        setInjuryData(modelResponse);
      } catch (e) {
        console.error('Error sending injury image to MedKit Model:', e);
      }
    }
  };

  const shouldRenderInjuryResultModal = () => {
    return Boolean(injuryData);
  }
  const renderContent = () => {
    let result;

    switch (selectedOption) {
      case imgSelectionOptionsMap.UPLOAD:
        result = <ImageUploader onUpload={handleImageSelection} />;
        break;
      case imgSelectionOptionsMap.CAPTURE:
        result = <WebcamCapture onCapture={handleImageSelection} isImageSelected={Boolean(image)} />;
        break;
      default:
        result = <ImageOptionSelection onOptionSelection={handleOptionSelection} />;
    }

    return result;
  };



  return (
    <Layout>
      {renderContent()}
      {image && (
        <ImageContainer
          image={image}
          handleRetry={handleRetry}
          handleImageSend={handleImageSend}
          injuryData={injuryData}
        />
      )}
      {shouldRenderInjuryResultModal() && (
        <InjuryResultModal
          injuryType={injuryData.class}
          successRate={injuryData.confidence}
          onRetry={handleRetry}
          onHide={handleModalHide}
        />
      )}

    </Layout>
  );
}

export default HomePage;