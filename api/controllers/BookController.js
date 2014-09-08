/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
// MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {});
var moment = require('moment');
var AWS = require('aws-sdk'); 
AWS.config.update({
  accessKeyId: 'AKIAJACCKQI6J6QSKUBQ',
  secretAccessKey: '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',
  region: "us-west-2"
});
var s3 = new AWS.S3(); 
var bucketName = "sapanhinmagazine/preview";
var fs = require('fs');

module.exports = {
	 

   index: function (req, res, next) {

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err) return next(err);

      db.collection('book').find().toArray(function(err, bookFind){
        if(err) return next(err);
        var object_mapping = _.chain(bookFind).sortBy('issue_no').groupBy('issue_year').map(function(value, key) {
            return {
                year: key,
                issue_lists: value
            }
        }).value();

        res.view({
            layout: 'layouts/backend_layout',
            moment: moment,
            title: "Book list",
            data: object_mapping
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
    var fileNamePrefix = "issue"+criteria.issue_year+"-"+criteria.issue_no;
    console.log(criteria)
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err) return next(err);


      if (req.file('bookshelf_cover_image')) {
        req.file('bookshelf_cover_image').upload(function (err, files) {
          if (err) return res.serverError(err);
          var typefile = files[0].type;
          var split = typefile.split("/");
          var fileName = fileNamePrefix+"bookshelf_cover_image."+split[1];

          fs.readFile(files[0].fd, function (err, data) {
            s3.putObject({ Bucket: 'sapanhin-magazine/cover', Key: fileName , Body: data }, function(err, datapush) {

              if (err) return res.serverError(err);
              console.log(datapush)
              
            });
          })
        })
      }

      if (req.file('preview1')) {
        req.file('preview1').upload(function (err, files) {
          if (err) return res.serverError(err);
          var typefile = files[0].type;
          var split = typefile.split("/");
          var fileName = fileNamePrefix+"preview1."+split[1];

          fs.readFile(files[0].fd, function (err, data) {
            s3.putObject({ Bucket: 'sapanhin-magazine/preview', Key: fileName , Body: data }, function(err, datapush) {

              if (err) return res.serverError(err);
              console.log(datapush)
              
            });
          })
        })
      }
      if (req.file('preview2')) {
        req.file('preview2').upload(function (err, files) {
          if (err) return res.serverError(err);
          var typefile = files[0].type;
          var split = typefile.split("/");
          var fileName = fileNamePrefix+"preview2."+split[1];

          fs.readFile(files[0].fd, function (err, data) {
            s3.putObject({ Bucket: 'sapanhin-magazine/preview', Key: fileName, Body: data }, function(err, datapush) {
              if (err) return res.serverError(err);
              console.log(datapush)

            });
          })
        })
      }
      if (req.file('preview3')) {
        req.file('preview3').upload(function (err, files) {
          if (err) return res.serverError(err);
          var typefile = files[0].type;
          var split = typefile.split("/");
          var fileName = fileNamePrefix+"preview3."+split[1];  
        
          fs.readFile(files[0].fd, function (err, data) {
            s3.putObject({ Bucket: 'sapanhin-magazine/preview', Key: fileName, Body: data }, function(err, datapush) {
              if (err) return res.serverError(err);
              console.log(datapush)

            });
          })
        })
      }
      if (req.file('preview4')) {
        req.file('preview4').upload(function (err, files) {
          if (err) return res.serverError(err);
          var typefile = files[0].type;
          var split = typefile.split("/");
          var fileName = fileNamePrefix+"preview4."+split[1];  
        
          fs.readFile(files[0].fd, function (err, data) {
            s3.putObject({ Bucket: 'sapanhin-magazine/preview', Key: fileName, Body: data }, function(err, datapush) {
              if (err) return res.serverError(err);
              console.log(datapush)

            });
          })
        })
      }
      if (req.file('preview5')) {
        req.file('preview5').upload(function (err, files) {
          if (err) return res.serverError(err);
          var typefile = files[0].type;
          var split = typefile.split("/");
          var fileName = fileNamePrefix+"preview5."+split[1];  
        
          fs.readFile(files[0].fd, function (err, data) {
            s3.putObject({ Bucket: 'sapanhin-magazine/preview', Key: fileName, Body: data }, function(err, datapush) {
              if (err) return res.serverError(err);
              console.log(datapush)

            });
          })
        })
      }


      if (req.file('pdf_book')) {
        req.file('pdf_book').upload(function (err, files) {
          if (err) return res.serverError(err);
          var typefile = files[0].type;
          var split = typefile.split("/");
          var fileName = fileNamePrefix+"pdf_book."+split[1];

          fs.readFile(files[0].fd, function (err, data) {
            s3.putObject({ Bucket: 'sapanhin-magazine/pdf', Key: fileName , Body: data }, function(err, datapush) {

              if (err) return res.serverError(err);
              console.log(datapush)
              urlamazon = 'https://s3-ap-southeast-1.amazonaws.com/sapanhin-magazine/'
              fileData = {
                pdf_url: urlamazon+'sapanhin-magazine/pdf/'+fileNamePrefix+'pdf_book.pdf',
                bookshelf_cover_image_url: urlamazon+'sapanhin-magazine/cover/'+fileNamePrefix+'bookshelf_cover_image.jpg',
                detail_screenshot:[
                  {
                    screenshot_url: urlamazon+'sapanhin-magazine/preview/'+fileNamePrefix+'preview1.jpg'
                  },
                  {
                    screenshot_url: urlamazon+'sapanhin-magazine/preview/'+fileNamePrefix+'preview2.jpg'
                  },
                  {
                    screenshot_url: urlamazon+'sapanhin-magazine/preview/'+fileNamePrefix+'preview3.jpg'
                  },
                  {
                    screenshot_url: urlamazon+'sapanhin-magazine/preview/'+fileNamePrefix+'preview4.jpg'
                  },
                  {
                    screenshot_url: urlamazon+'sapanhin-magazine/preview/'+fileNamePrefix+'preview5.jpg'
                  },

                ]
              }  

              var newDataSave = _.merge({}, fileData, criteria );
              db.collection('book').insert(newDataSave ,function(err, createBook){
                if(err) return next(err);

                res.redirect("/book")
              })


            });
          })
        })
      }




    });


   },

  edit: function(req, res, next){
    criteria = _.merge({},  req.params.all(), req.body);

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err) return next(err);

      db.collection('book').findOne({_id: ObjectID(criteria.id) }, function(err, bookFind){
        if(err) return next(err);
        
        res.view({
          layout: 'layouts/backend_layout',
          title: "Edit Book",
          data: bookFind
        })
      })

    })
  },

  destroy: function(req, res, next){
    criteria = _.merge({},  req.params.all(), req.body);

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err) return next(err);

      db.collection('book').remove({_id: ObjectID(criteria.id) }, function(err, bookFind){
        if(err) return next(err);
        
        res.redirect('/book')
      })

    })
  }





};

