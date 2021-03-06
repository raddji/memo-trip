/* eslint-disable no-console */
import { connection } from "../boot.js"
import MemoTripSeeder from "./seeders/TripSeeder.js"
import HighlightSeeder from "./seeders/HighlightSeeder.js";
import CommentSeeder from "./seeders/CommentSeeder.js";

class Seeder {
  static async seed() {

    console.log("Seeding trips...")
    await MemoTripSeeder.seed();

    console.log("Seeding highlights...")
    await HighlightSeeder.seed();

    console.log("Seeding comments!");
    await CommentSeeder.seed();

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder