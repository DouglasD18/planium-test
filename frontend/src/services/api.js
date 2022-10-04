import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3008/",
});

const Helpers = {
  async postBeneficiarios(body) {
    try {
      const response = await api.post('beneficiarios', body);
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async getBeneficiarios() {
    try {
      const response = await api.get('beneficiarios');
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async getPropostas() {
    try {
      const response = await api.get('propostas');
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Helpers;
