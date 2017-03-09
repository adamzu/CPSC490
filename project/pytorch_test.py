import torchvision.datasets as dset
import torchvision.transforms as transforms
cap = dset.CocoCaptions(root = '/data/corpora/coco/images/train2014/',
                        annFile = '/data/corpora/coco/annotations/captions_train2014.json',
                        transform=transforms.ToTensor())

print('Number of samples: ', len(cap))
(img, target) = cap[3] # load 4th sample

print("Image Size: ", img.size())
print(target)
