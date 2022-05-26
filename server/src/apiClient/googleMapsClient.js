import got from "got"

const googleMapsApiKey = "";

class GoogleMapsClient {
  static async getAddress(address) {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?${address}=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyB64k399Kifv1FIJR-6m8ueAIi-X7LXxcI`
      const apiResponse = await got(url);
      const responseBody = apiResponse.body;
      return responseBody;
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default GoogleMapsClient;