import json
import requests

from clarifai.rest import ClarifaiApp
from io import BytesIO
from PIL import Image

app = ClarifaiApp()
image_urls = ['https://samples.clarifai.com/metro-north.jpg', 'http://mms.businesswire.com/media/20140731005162/en/426124/4/Global_07252014highres.jpg']
for image_url in image_urls:
    image = Image.open(BytesIO(requests.get(image_url).content))
    image.show()

response = app.tag_urls(image_urls)

for output in response['outputs']:
    concepts = output['data']['concepts']
    for concept in concepts:
        print(concept)
    print()

# multiple:
# concepts = [output['data']['concepts'] for output in response['outputs']]
