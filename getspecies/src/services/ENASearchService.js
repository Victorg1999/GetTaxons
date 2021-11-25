import http from "../http-data";



///ENA portal API client service
///see https://www.ebi.ac.uk/ena/portal/api/#/
class ENASearchService {
  // getENAData(result, query, fields) {
  //   if(fields){
  //     return http.get(`/ena/portal/api/search?fields=${fields}&result=${result}&query=${query}&format=JSON`)
  //   }
  //   else{
  //     return http.get(`/ena/portal/api/search?result=${result}&query=${query}&format=JSON`)
  //   }
  getENADataByUrl(params) {
    return http.get('/ena/portal/api/search', {
        params: params
      })
  }
  getTaxon(taxonId) {
    return http.get(`/ena/browser/api/xml/${taxonId}`)
  }
}

export default new ENASearchService();
