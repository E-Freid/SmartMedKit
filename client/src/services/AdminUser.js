import axios from "axios";

class AdminUser {
  constructor() {
    if (!AdminUser.instance) {
      this.api = axios.create({ //temp solution - need to solve issue with config
        baseURL: "http://127.0.0.1:5000",
      });
      AdminUser.instance = this;
    }
    return AdminUser.instance;
  }

  async login(values) {
    try {
      const response = await this.api.post('/admin/authorize', values);
      return response.data; //User Data
    } catch (error) {
      let resultObj = {};
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object')
          resultObj.errors = error.response.data;
        else
          resultObj.message = error.response.data?.message || 'Unable to Login';
      } else {
        resultObj.message = 'An unexpected error occurred.';
      }

      throw(resultObj);
    }
  }

  async addKit(adminId, kitId) {
    try {
      const payload = { kit_id: Number(kitId), admin_id: Number(adminId) };
      await this.api.post('/kit_admin', payload);
      return Promise.resolve();
    } catch (error) {
      const errorObj = error.response.data;
      if (error.response.status === 404) {
        errorObj.message = 'Kit does not exists';
      } else if(!errorObj.message) {
        errorObj.message = 'Unable to add kit. Something went wrong...'
      }
      throw(error.response.data);
    }
  }

  async getRegisteredKits(adminId) {
    try {
      let kits;
      const response = await this.api.get(`/admin/${adminId}`);

      if(response.data && response.data.kits) {
        kits = response.data.kits;
      } else {
        kits = [];
      }

      return kits;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Server Error');
    }
  }
}

const instance = new AdminUser();
Object.freeze(instance);

export default instance;