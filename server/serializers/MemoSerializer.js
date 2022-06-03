class MemoSerializer {
  static async getSummary(memo) {
    const allowedAttributes = ["id", "name", "where", "when", "what"]
    const serializedMemo = {}
    for (const attribute of allowedAttributes) {
      serializedMemo[attribute] = memo[attribute]
    }

    serializedMemo.highlights = await memo.$relatedQuery("highlights")
    return serializedMemo
  }
}

export default MemoSerializer