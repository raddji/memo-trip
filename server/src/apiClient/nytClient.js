import got from 'got';

class nytClient {
  static async getArticle(article) {
    try {
      const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${article}&api-key=${process.env.NYTIMES_API_KEY}`
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return error(error.message)
    }
  }
}

export default nytClient;