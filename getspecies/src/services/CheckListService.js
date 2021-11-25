import http from "../http-data";

class CheckListService {
  getEnaRecord(accession) {
      return http.get(`/ena/browser/api/xml/${accession}?download=true`)
    }
}

export default new CheckListService();