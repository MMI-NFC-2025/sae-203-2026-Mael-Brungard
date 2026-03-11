/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_860379368")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3183463462",
    "hidden": false,
    "id": "relation2617718095",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "artiste",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1254289504",
    "hidden": false,
    "id": "relation3648647130",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "scene",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_860379368")

  // remove field
  collection.fields.removeById("relation2617718095")

  // remove field
  collection.fields.removeById("relation3648647130")

  return app.save(collection)
})
