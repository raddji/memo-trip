import got from 'got';

class nytClient {
  static async getArticle(article) {
    try {
      const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${article}&api-key=b9QlcMrqvGwdp6fnIbhpkFi5fRtwdmrO`
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return error(error.message)
    }
  }
}

export default nytClient;