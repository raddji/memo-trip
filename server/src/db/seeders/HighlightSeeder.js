import { Highlight } from "../../models/index.js";

class HighlightSeeder {
  static async seed() {
    const highlightData = [
      {
        dining: "The Obama Burger at Fish Market Restaurant was one of my favorite.",
        activity: "Daily strolls at Baldwin Beach",
        note: "Baldwin is just so perfect. The coral enclave of Baby Beach at the end of Baldwin,lets you swim safely in the protected reef. Can't beat that.",
        memotripId: 1
      },
      {
        dining: "River prawns and watercress soup that I will never forget.",
        activity: "Could have spent the entire day blissfully in my hammock.",
        note: "Already planning my next trip back to Kalalau, and this time I would need to stay for the maximum amount of time.",
        memotripId: 2
      },
      {
        dining: "We got donuts delivered.",
        activity: "Code Names was played by everyone.",
        note: "Fantastic!",
        memotripId: 3
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