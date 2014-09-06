/**
 * ApibookController
 *
 * @description :: Server-side logic for managing apibooks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

module.exports = {

  issue_detail: function (req, res, next) {
    
    criteria = _.merge({},  req.params.all(), req.body);

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err) return next(err);

      db.collection('book').findOne({_id: ObjectID(criteria.id) }, function(err, bookFind){
        if(err) return next(err);
        
        res.json(bookFind)
      })

    })

   },

  issue_list_specific_year: function (req, res, next) {
    
    criteria = _.merge({},  req.params.all(), req.body);

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err) return next(err);

      db.collection('book').find({issue_year:  criteria.year }).sort('issue_no').toArray(function(err, bookFind){
        if(err) return next(err);
        data = {
          status: 200,
          massage: "ok",
          year: criteria.year,
          issue_lists: bookFind
        }
        res.json(data)
      })

    })

   },
  
  issue_list_all_year: function (req, res, next) {
    
    criteria = _.merge({},  req.params.all(), req.body);

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err) return next(err);

      db.collection('book').find().toArray(function(err, bookFind){
        if(err) return next(err);

        // mapping obj
        var object_mapping = _.chain(bookFind).sortBy('issue_no').groupBy('issue_year').map(function(value, key) {
            return {
                year: key,
                issue_list: value
            }
        }).value();

        data = {
          status: 200,
          massage: "ok",
          year: criteria.year,
          issue_list: object_mapping
        }

        res.json(data)

      })

    })

   },

   year_lists: function(req, res, next){
    criteria = _.merge({},  req.params.all(), req.body);
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err) return next(err);
      db.collection('book').find().toArray(function(err, bookFind){
          if(err) return next(err);

          // mapping obj
          var object_mapping = _.chain(bookFind).sortBy('issue_no').groupBy('issue_year').map(function(value, key) {
              return {
                  year: key
              }
          }).value();

          data = {
            status: 200,
            massage: "ok",
            data: {
              year_list: _.pluck(object_mapping, 'year')
            }
          }

          res.json(data)

        })
    })

   }


};

