import got from "got"
import "dotenv"

class GoogleMapsClient {
  static async getPlace(userInput) {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${userInput}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${process.env.GOOGLE_MAPS_API_KEY}`
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default GoogleMapsClient;