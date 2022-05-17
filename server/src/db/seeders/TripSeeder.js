import { Trip } from "../../models/index.js";

class TripSeeder {
  static async seed() {
    const tripData = [
      {
        name: "Japan Spring Trip",
        location: "Tokyo, Kyoto, Okinawa",
        when: "March 2023",
        trip_begin_date: "3/1/2022",
        trip_end_date: "3/15/2022"
      },
      {
        name: "Yosemite National Park Summer Trip",
        location: "East-central California",
        when: "Summer 2023",
        trip_begin_date: "6/1/2022",
        trip_end_date: "6/15/2022"
      },
      {
        name: "Winter Iceland Trip",
        location: "Reykjavik, Iceland",
        when: "December 2024",
        trip_begin_date: "12/1/2022",
        trip_end_date: "12/15/2022"
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