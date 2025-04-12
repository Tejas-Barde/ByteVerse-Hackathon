import scrapy
from pathlib import Path


class DataSpider(scrapy.Spider):
    name = "data"
    allowed_domains = ["incidecoder.com"]
    start_urls = ["https://incidecoder.com/products/be-minimalist-moisturizer"]

    def parse(self, response):
        # Extract the specific div using CSS selector
        ingred_section = response.css("div#showmore-section-ingredlist-table").get()

        # Alternatively, use XPath:
        # ingred_section = response.xpath('//div[@id="showmore-section-ingredlist-table"]').get()

        if ingred_section:
            Path("ingredients_section.html").write_text(ingred_section, encoding="utf-8")
            self.log("Saved ingredients_section.html")
        else:
            self.log("Could not find the ingredient section on the page.")
