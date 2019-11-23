# Base
### Contents
- [Base](#base)
    - [Contents](#contents)
  - [Data Structure](#data-structure)
    - [Menu Bar](#menu-bar)
      - [Logo](#logo)
      - [Menu Items](#menu-items)
    - [HauptBanner](#hauptbanner)
      - [Background Image](#background-image)
      - [BannerContent](#bannercontent)
    - [HomePage Article](#homepage-article)
      - [ThumbnailImage](#thumbnailimage)
      - [Article Content](#article-content)
    - [News](#news)

## Data Structure

### Menu Bar
#### Logo
``` JSON
"logo": {
  "logoUrl": ""
}

```
#### Menu Items
Array of objects

``` JSON
"menuItems": [
  {
    "menuPath":"",
    "menuTitle": ""
    },
  {
    "menuPath":"",
    "menuTitle": ""
    }
  ]
```

### HauptBanner
#### Background Image
``` JSON
"hauptImg": "imageUrl"
```

#### BannerContent
``` JSON
"bannerTitle":"",
"bannerText": ""
```

### HomePage Article
#### ThumbnailImage
``` JSON
"thumbImageUrl":"",
"thumbImageTitle":"",
"thumbImageSubText":""
```
#### Article Content
an object with two arrays, first serving text blocks and the other serving other contents, which could be images, videos or anything else (well later, for now just imageUrls are supported.). It should be arranged sequentially because item1 in otherContent will be shown after item1 in textArray ;)
``` JSON
      "articleContent": {
        "textArray":["",""],
        "otherContent":[]
      },
```

### News
``` JSON
"newsImage": "imageUrl",
"newsTitle": "",
"newsSummary":""
```