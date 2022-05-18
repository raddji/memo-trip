/* eslint-disable no-console */
import { connection } from "../boot.js"
import TripSeeder from "./seeders/TripSeeder.js"
import HighlightSeeder from "./seeders/HighlightSeeder.js";

class Seeder {
  static async seed() {

    console.log("Seeding trips...")
    await TripSeeder.seed();

    console.log("Seeding highlights...")
    await HighlightSeeder.seed();

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder