// import axios from "axios";
import api from '../api';

class MedKitModel {
  constructor() {
    if (!MedKitModel.instance) {
      this.api = api
      MedKitModel.instance = this;
    }
    return MedKitModel.instance;
  }

  async sendPhoto(imageSrc) {
    const imageFile = await this._convertBase64StringToFile(imageSrc);
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await this.api.post('/injuries/analyze', formData);
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  async _convertBase64StringToFile(imageSrc) {
    // Convert base64 string to Blob object using fetch API
    const response = await fetch(imageSrc);
    const blob = await response.blob();

    return new File([blob], 'image.jpg', { type: 'image/jpeg' });
  }
}

const instance = new MedKitModel();
Object.freeze(instance);

export default instance;