import { MemoTrip } from "../../models/index.js";

class MemoTripSeeder {
  static async seed() {
    const memoTripData = [
      {
        name: "Japan Spring Trip",
        location: "Tokyo, Kyoto, Okinawa",
        date: "March 20, 2023"
      },
      {
        name: "Yosemite National Park Summer Trip",
        location: "East-central California",
        date: "July 20, 2023"
      },
      {
        name: "Winter Iceland Trip",
        location: "Reykjavik, Iceland",
        date: "December 20, 2023"
      }
    ];
    for (const singleMemoTripData of memoTripData) {
      const currentMemoTrip = await MemoTrip.query().findOne(singleMemoTripData);
      if (!currentMemoTrip) {
        await MemoTrip.query().insert(singleMemoTripData);
      }
    }
  }
}

export default MemoTripSeeder;