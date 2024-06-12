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

  async loginSuccessTest(values) {
    return Promise.resolve({
      success: true,
      user: { id: 1, email: values.email },
      moreInfo: null
    });
  }

  async loginFailTest(values) {
    return Promise.resolve({
      success: false,
      user: null,
      moreInfo: {
        errors: {
          email: 'Email does not exists'
        }
      }
    });
  }

  async login(values) {
    let resultObject = {
      success: false,
      user: null,
      moreInfo: null
    }

    try {
      const response = await this.api.post('/admin/login', values);
      resultObject.success = true;
      resultObject.user = response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object')
          resultObject.moreInfo.errors = error.response.data;
        else
          resultObject.moreInfo.message = error.response.data?.message || 'Unable to Login';
      } else {
        resultObject.moreInfo.message = 'An unexpected error occurred.';
      }
    } finally {
      return resultObject;
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
}

const instance = new AdminUser();
Object.freeze(instance);

export default instance;