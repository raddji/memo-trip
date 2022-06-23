class MemoSerializer {
  static async getSummary(memoTrip) {
    const allowedAttributes = ["id", "name", "where", "when", "what", "article"];
    const serializedMemo = {};
    for (const attribute of allowedAttributes) {
      serializedMemo[attribute] = memoTrip[attribute];
    }

    serializedMemo.highlights = await memoTrip.$relatedQuery("highlights")
    return serializedMemo;
  }

  static async getDetails(memoTrip, currentUserId) {
    const summarizedMemoTrip = this.getSummary(memoTrip);
  }


}

export default MemoSerializer