import axios from "axios";

class Http {
  static get = url => axios.get(url);

  static delete = url => axios.delete(url);

  static post = (url, data = {}) => axios.post(url, data);

  static put = (url, data = {}) => axios.put(url, data);

  static patch = (url, data = {}) => axios.patch(url, data);
}

export default Http;
