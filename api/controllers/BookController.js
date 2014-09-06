/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
// MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {});


module.exports = {
	 

   index: function (req, res, next) {

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err) return next(err);

      db.collection('book').find().toArray(function(err, bookFind){
        if(err) return next(err);

        res.view({
            layout: 'layouts/backend_layout',
            title: "Book list",
            data: bookFind
        })
      })

    })

   },

   new: function (req, res, next) {




     res.view({
        layout: 'layouts/backend_layout',
        title: "New Book"
    })
   },

   create: function(req, res, next){
    var newData = {
      createdAt: new Date(),
      updatedAt: new Date(),
      deteletedAt: null
    }

    criteria = _.merge({}, newData,  req.params.all(), req.body);
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err) return next(err);

      db.collection('book').insert(criteria ,function(err, createBook){
        if(err) return next(err);

        res.redirect("/book")
      })


    });


   }



};

