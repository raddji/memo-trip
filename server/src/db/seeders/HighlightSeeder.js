import { Highlight } from "../../models/index.js";

class HighlightSeeder {
  static async seed() {
    const highlightData = [
      {
        dining: "Fish Market Restaurant",
        activity: "Cherry Blossoms Tour",
        note: "Need to go explore Harijuko for sure!",
        tripId: 1
      },
      {
        dining: "Bring lots of great snacks",
        activity: "Camping and river rafting possibly",
        note: "Don't forget all my bug sprays and bear protection!!!",
        tripId: 2
      },
      {
        dining: "That Michelin star place",
        activity: "Blue Lagoon",
        note: "Rent a car to go road tripping.",
        tripId: 3
      },
      {
        dining: "Hipster Food Truck on Akira Street",
        activity: "Yayoi Kusama Exhibit",
        note: "Someone told me about an alley filled with crazy cool vending machines I should check out.",
        tripId: 1
      }
    ];
    for (const singleHighlightData of highlightData) {
      const currentHighlight = await Highlight.query().findOne(singleHighlightData);
      if (!currentHighlight) {
        await Highlight.query().insert(singleHighlightData);
      }
    }
  }
}

export default HighlightSeeder;