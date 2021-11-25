import http from "../http-common";

class SampleService {
  sendForm(form) {
      return http.post("/input", form)
    }

    getTaxon(taxonId) {
        return http.get(`/taxa/${taxonId}`)
    }
}

export default new SampleService();