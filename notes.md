# STACKATHON: Food Data

## Edamam Food API

https://developer.edamam.com/food-database-api-docs

**Application ID:** 34041e6c
**Application Key:** a2ba1fd53d897ac8fb0a84cb484e98ee

## Getting food data

With UPC in hand...

### `GET` request

`https://api.edamam.com/api/food-database/parser?upc={upc code}&app_id={your app_id}&app_key={your app_key}`

```javascript
//pseudo code... could work something like...
const foodObj = await axios.get(
  "https://api.edamam.com/api/food-database/parser?upc=082011570710&app_id=34041e6c&app_key=a2ba1fd53d897ac8fb0a84cb484e98ee"
);
```

This returns an object. I want `foodId`:

```json
{
  "text": "upc:082011570710",
  "parsed": [],
  "hints": [
    {
      "food": {
        "foodId": "food_afejdbsaq44wh8bklmi79bs5jr2n",
        "label": "THIN MINTS",
        "nutrients": {
          "ENERC_KCAL": 500.0,
          "PROCNT": 3.119999885559082,
          "FAT": 25.0,
          "CHOCDF": 65.62000274658203,
          "FIBTG": 3.0999999046325684
        },
        "brand": "girl scouts",
        "category": "Packaged foods",
        "categoryLabel": "food",
        "foodContentsLabel": " ENRICHED FLOUR (WHEAT FLOUR; NIACIN; REDUCED IRON; VITAMIN B1 [THIAMIN MONONITRATE]; VITAMIN B2 [RIBOFLAVIN]; FOLIC ACID); SUGAR; VEGETABLE OIL (PALM KERNEL; SOYBEAN AND PALM OIL); COCOA PROCESSED WITH ALKALI; CARAMEL COLOR; CONTAINS 2% OR LESS OF LEAVENING (BAKING SODA; MONOCALCIUM PHOSPHATE); COCOA; INVERT SUGAR; CORNSTARCH; SALT; SOY LECITHIN; NATURAL AND ARTIFICIAL FLAVORS; OIL OF PEPPERMINT. ",
        "image": "https://www.edamam.com/food-img/cbd/cbdb1a25868af524bb18cac40ce6e430.jpg"
      },
      "measures": [
        {
          "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
          "label": "Gram"
        },
        {
          "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_ounce",
          "label": "Ounce"
        },
        {
          "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_pound",
          "label": "Pound"
        },
        {
          "uri": "http://www.edamam.com/ontologies/edamam.owl#Measure_kilogram",
          "label": "Kilogram"
        }
      ]
    }
  ]
}
```

To get `foodId`:

```javascript
const foodId = foodObj.hints[0].food.foodId;
```

(Or, to get ingredients:)

```javascript
const ingredients = foodObj.hints[0].food.foodContentsLabel;
```

Then, to get food/cautionary labels...

### `POST` request

POST request to the `nutrients` endpoint: `https://api.edamam.com/api/food-database/nutrients?app_id=34041e6c&app_key=a2ba1fd53d897ac8fb0a84cb484e98ee`

And pass the following json body:

```json
{
  "ingredients": [
    {
      "foodId": "food_afejdbsaq44wh8bklmi79bs5jr2n"
    }
  ]
}
```

```javascript
//pseudo code... could look like...

const foodJson = {
  ingredients: [
    {
      foodId: "food_afejdbsaq44wh8bklmi79bs5jr2n"
    }
  ]
};

const nutrientsObj = await axios.post(
  "https://api.edamam.com/api/food-database/nutrients?app_id=34041e6c&app_key=a2ba1fd53d897ac8fb0a84cb484e98ee",
  foodJson
);
```

This will return the following nutrients object:

```json
{
  "uri": "http://www.edamam.com/ontologies/edamam.owl#03f4dca0-65d9-461f-8cd0-e7b123921135",
  "yield": 0,
  "calories": 0,
  "totalWeight": 0,
  "dietLabels": [],
  "healthLabels": [
    "VEGETARIAN",
    "PESCATARIAN",
    "EGG_FREE",
    "PEANUT_FREE",
    "TREE_NUT_FREE",
    "FISH_FREE",
    "SHELLFISH_FREE",
    "PORK_FREE",
    "RED_MEAT_FREE",
    "CRUSTACEAN_FREE",
    "CELERY_FREE",
    "MUSTARD_FREE",
    "SESAME_FREE",
    "LUPINE_FREE",
    "MOLLUSK_FREE",
    "ALCOHOL_FREE",
    "KOSHER"
  ],
  "cautions": ["GLUTEN", "WHEAT", "SULFITES", "FODMAP"],
  "totalNutrients": {},
  "totalDaily": {},
  "ingredients": [
    {
      "parsed": [
        {
          "quantity": 0,
          "measure": "whole",
          "food": "THIN MINTS",
          "foodId": "food_afejdbsaq44wh8bklmi79bs5jr2n",
          "foodContentsLabel": " ENRICHED FLOUR (WHEAT FLOUR; NIACIN; REDUCED IRON; VITAMIN B1 [THIAMIN MONONITRATE]; VITAMIN B2 [RIBOFLAVIN]; FOLIC ACID); SUGAR; VEGETABLE OIL (PALM KERNEL; SOYBEAN AND PALM OIL); COCOA PROCESSED WITH ALKALI; CARAMEL COLOR; CONTAINS 2% OR LESS OF LEAVENING (BAKING SODA; MONOCALCIUM PHOSPHATE); COCOA; INVERT SUGAR; CORNSTARCH; SALT; SOY LECITHIN; NATURAL AND ARTIFICIAL FLAVORS; OIL OF PEPPERMINT. ",
          "weight": 0,
          "retainedWeight": 0,
          "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
          "status": "MISSING_QUANTITY"
        }
      ]
    }
  ]
}
```

To get your health labels:

```javascript
const { healthLabels } = nutrientsObj;
```
