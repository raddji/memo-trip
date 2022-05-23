import { MemoTrip } from "../../models/index.js";

class MemoTripSeeder {
  static async seed() {
    const memoTripData = [
      {
        name: "Japan Spring Trip",
        where: "Tokyo, Kyoto, Okinawa",
        when: "March 20, 2015",
        what: "Best times ever!"
      },
      {
        name: "Yosemite National Park Summer Trip",
        where: "East-central California",
        when: "July 20, 2018",
        what: "Beautiful weather all along. Saw a bear!"
      },
      {
        name: "Winter Iceland Trip",
        where: "Reykjavik, Iceland",
        when: "December 20, 2009",
        what: "Loved swimming under the aurora borealis."
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