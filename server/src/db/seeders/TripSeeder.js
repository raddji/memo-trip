import { Trip } from "../../models/index.js";

class TripSeeder {
  static async seed() {
    const tripData = [
      {
        name: "Japan Spring Trip",
        location: "Tokyo, Kyoto, Okinawa",
        trip_start: "March 1, 2023",
        trip_end: "March 20, 2023"
      },
      {
        name: "Yosemite National Park Summer Trip",
        location: "East-central California",
        trip_start: "July 11, 2023",
        trip_end: "July 20, 2023"
      },
      {
        name: "Winter Iceland Trip",
        location: "Reykjavik, Iceland",
        trip_start: "December 11, 2023",
        trip_end: "December 20, 2023"
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