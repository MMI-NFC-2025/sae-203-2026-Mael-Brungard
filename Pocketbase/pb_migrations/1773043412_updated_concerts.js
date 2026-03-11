/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_860379368")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "select2363381545",
    "maxSelect": 1,
    "name": "type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "electro",
      "pop",
      "hiphop",
      "rock"
    ]
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "date2862495610",
    "max": "",
    "min": "",
    "name": "date",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_860379368")

  // remove field
  collection.fields.removeById("select2363381545")

  // remove field
  collection.fields.removeById("date2862495610")

  return app.save(collection)
})
