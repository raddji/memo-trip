import got from "got"

const baseUrl = "https://en.wikipedia.org/w/api.php"
const wikiApiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmMjIxNDg3ODhlOWUyMzg3NDNhYjhhYTljZDU3ODJlMiIsImp0aSI6IjYyZGU0OGI3NjQxMDczMjQ0M2EzMjU3YTQ2ZTExZTZmMjRiNjI4MWVmNTkwOTkwZDcwYWFiNjEyYWUzNjdlOGNhYzA5MzYzOTMyZjRkZTAyIiwiaWF0IjoxNjUzMzk4NjAyLCJuYmYiOjE2NTMzOTg2MDIsImV4cCI6MzMyMTAzMDc0MDIsInN1YiI6IjY5NzYyMDI4IiwiaXNzIjoiaHR0cHM6XC9cL21ldGEud2lraW1lZGlhLm9yZyIsInJhdGVsaW1pdCI6eyJyZXF1ZXN0c19wZXJfdW5pdCI6NTAwMCwidW5pdCI6IkhPVVIifSwic2NvcGVzIjpbImJhc2ljIl19.uVrNtu6pfT4xhnW7buUCXrdRzlhgp9p5SuDxFLOAq8o-D5pOv83jriEuzwe_1Hbh3KUJarp5KwrfPPTucPpN6iaP9oTbw1RIQlrXt-9hdUSid8B7R2QIyF2goOFmMnkPNdGAh-G82N-Y9u0QM_KvXyUDi8nk-kWsJ8iAvdeB6sKd9aVSN7rYj4z_107nm6dRlzQFgtZ6RObp594xXRi0-pjpy3QJNbBU0DtYEXjnEeupnJDwcmINXuQTsAxoOKbvwB7QlqJR_XRuFW3EtDPqMowOyVnPkhv_SFAhvkOiHsN9zZFo83Csv9iTQjbrwo6U4NGeTvrVGDvwX0gBMSlv8ask07JKoUpl3UguzUNfVApE2pNggHi9zvkchJUhjo_pHsMSqi1Kmv14lPc7w3ShMcT6TWMVnUVBUbvDZ_9pOwW8mw37VqQ1p1eaL80OHRQdq_7IWPJ0NiNWRq-NQ2_dt_MwtiHSghUTfs-oUySqb4j4wJJlD1uh9ybL22_UC6dejBQcgj7jnKs7zfMDyUuDs_26fhAS8TaRYF8fmcRUVSrjYmSU0t670SqPw93iZzuSafsBmWyLgW62l-LU06J2Fj7HiIaftHCnYY_-nR3qcQjoIyshKhrvS6TQMQaNbjfsQLqfeImLq-ulVatXdlYeml50jtI45S6iKwpGdOgOGF4"

class WikiClient {
  static async getWikis(query) {
    try {
      const url = `${baseUrl}/search?&q=${query}`
      const apiResponse = await got(url)
      const responseBody = apiResponse.body
      const wikisData = JSON.parse(responseBody)
      const wikiUrls = wikisData.data.map((wiki) => {
        return wiki.title
      })
      return wikiUrls
    } catch (error) {
      return { error: error.message }
    }
    
  }
  static wikisByQuery(wikisData) {
    const wikiUrls = wikisData.data.map((wiki) => {
      return wiki.title
    })
    return wikiUrls
  }
}

export default WikiClient