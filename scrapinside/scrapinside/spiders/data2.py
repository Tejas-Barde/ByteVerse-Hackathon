import scrapy

class InciDecoderSpider(scrapy.Spider):
    name = 'inci'

    def __init__(self, query='', **kwargs):
        super().__init__(**kwargs)
        self.start_urls = [f'https://incidecoder.com/products/{query}']

    def parse(self, response):
        product_name = response.css('h1::text').get()
        ingredients = response.css('.component-list .component-item')

        for ing in ingredients:
            yield {
                'name': ing.css('.component-name::text').get(),
                'description': ing.css('.component-description::text').get()
            }
