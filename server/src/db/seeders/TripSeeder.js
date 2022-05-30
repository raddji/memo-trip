import { MemoTrip } from "../../models/index.js";

class MemoTripSeeder {
  static async seed() {
    const memoTripData = [
      {
        name: "Birthday Month",
        where: "Maui, Hawai'i",
        when: "November 1, 2022",
        what: "Best times ever!"
      },
      {
        name: "Kalalau Trail Hike",
        where: "Kauai Na'pali Coast",
        when: "November 17, 2021",
        what: "Most beautiful and challenging 22 mile hike along the Napali coast!"
      },
      {
        name: "Launch Academy Graduation Party",
        where: "Boston, MA",
        when: "May 31, 2022",
        what: "Work well done, Cohort 36!"
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