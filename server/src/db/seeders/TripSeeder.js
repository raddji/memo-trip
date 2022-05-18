import { Trip } from "../../models/index.js";

class TripSeeder {
  static async seed() {
    const tripData = [
      {
        name: "Japan Spring Trip",
        location: "Tokyo, Kyoto, Okinawa",
        date: "March 3, 2024"
      },
      {
        name: "Yosemite National Park Summer Trip",
        location: "East-central California",
        date: "June 15, 2023"
      },
      {
        name: "Winter Iceland Trip",
        location: "Reykjavik, Iceland",
        date: "December 11, 2023"
      }
    ];
    for (const singleTripData of tripData) {
      const currentTrip = await Trip.query().findOne(singleTripData);
      if (!currentTrip) {
        await Trip.query().insert(singleTripData);
      }
    }
  }
}

export default TripSeeder;