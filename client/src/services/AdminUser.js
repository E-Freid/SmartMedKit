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
      throw(errorObj);
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

  async getKitById(kitId) {
    try {
      const response = await this.api.get(`/kit/${kitId}`);
      return response.data;
    } catch (error) {
      //TODO: handle errors
    }
  }

  async removeKit(adminId, kitId) {
    try {
      const payload = { kit_id: Number(kitId), admin_id: Number(adminId) };
      await this.api.delete('/kit_admin', {data: payload});
      return Promise.resolve();
    } catch (error) {
      const errorObj = error.response.data;
      if (error.response.status === 404) {
        errorObj.message = 'Kit does not exists';
      } else if(!errorObj.message) {
        errorObj.message = 'Unable to delete kit. Something went wrong...'
      }
      throw(errorObj);
    }
  }

  async editKit(kitId, kitData) {
    try {
      const response = await this.api.put(`/kit/${kitId}`, kitData);
      return response.data; // Return Updated Kit Data
    } catch (error) {
      // TODO: handle errors
    }
  }

  async getKitCompartmentsList(kitId) {
    try {
      const response = await this.api.get('/kit_compartments');
      return response.data.filter(compartment => compartment.kit_id === Number(kitId));
    } catch (error) {
      throw error;
    }
  }

  async getKitMeasurements(kitId) {
    try {
      const response = await this.api.get('/measurements');
      console.log({response})
      return response.data.filter(measurement => measurement.kit_id === Number(kitId));
    } catch (error) {
      throw error;
    }
  }
}

const instance = new AdminUser();
Object.freeze(instance);

export default instance;