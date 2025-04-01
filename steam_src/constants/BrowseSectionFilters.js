const Filters = {
  topLevelFilter: {
    filterLocator: '//div[contains(@class, "_1edLKYpcJyTYC7ku9fYI1_ ")]',
    options: {
      ALL: 'All',
      NEW_AND_TRENDING: 'New & Trending',
      TOP_SELLERS: 'Top Sellers',
    },
  },
  platformFilter: {
    filterLocator: '//div[@class="Qa8BXBnhFcu7QgSy5RqD"][.//div[text()="Platform"]]',
    options: {
      WINDOWS: 'Windows',
    },
  },
}

module.exports = Filters
