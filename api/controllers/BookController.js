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
  region: "ap-southeast-1"
});
var s3 = new AWS.S3(); 
var bucketName = "sapanhinmagazine/preview";
var fs = require('fs');
var async = require('async');

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

   show: function(req, res, next){
    criteria = _.merge({},  req.params.all(), req.body);

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err) return next(err);



      db.collection('book').findOne({ _id: ObjectID(criteria.id) }, function(err, bookFind){
        // console.log(bookFind)
        res.view({
          layout: 'layouts/backend_layout',
          title: "New Book",
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
    var fileNamePrefix = "issue"+criteria.issue_year+"-"+criteria.issue_no;
    urlamazon = 'https://s3-ap-southeast-1.amazonaws.com/sapanhin-magazine-book/'
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err) return next(err);

      // if( req.files.image.bookshelf_cover_image)
    
      var preview_img = [];
      var bookshelf_cover_image_url_tmp;

      if (req.file('bookshelf_cover_image')) {
        req.file('bookshelf_cover_image').upload(function (err, files) {
          if (err) return res.serverError(err);
          var typefile = files[0].type;
          var split = typefile.split("/");
          var fileName = fileNamePrefix+"bookshelf_cover_image."+split[1];

          fs.readFile(files[0].fd, function (err, data) {
            s3.putObject({ Bucket: 'sapanhin-magazine-book/cover', Key: fileName , Body: data }, function(err, datapush) {

              if (err) return res.serverError(err);
              console.log(datapush)
              bookshelf_cover_image_url_tmp = urlamazon+'cover/'+fileName
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
            s3.putObject({ Bucket: 'sapanhin-magazine-book/preview', Key: fileName , Body: data }, function(err, datapush) {

              if (err) return res.serverError(err);
              console.log(datapush)
              preview_img.push({ preview_id : 'preview1', screenshot_url: urlamazon+'preview/'+fileName })
              
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
            s3.putObject({ Bucket: 'sapanhin-magazine-book/preview', Key: fileName, Body: data }, function(err, datapush) {
              if (err) return res.serverError(err);
              console.log(datapush)
              preview_img.push({ preview_id : 'preview2',screenshot_url: urlamazon+'preview/'+fileName })
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
            s3.putObject({ Bucket: 'sapanhin-magazine-book/preview', Key: fileName, Body: data }, function(err, datapush) {
              if (err) return res.serverError(err);
              console.log(datapush)
              preview_img.push({ preview_id : 'preview3',screenshot_url: urlamazon+'preview/'+fileName })
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
            s3.putObject({ Bucket: 'sapanhin-magazine-book/preview', Key: fileName, Body: data }, function(err, datapush) {
              if (err) return res.serverError(err);
              console.log(datapush)
              preview_img.push({ preview_id : 'preview4',screenshot_url: urlamazon+'preview/'+fileName })
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
            s3.putObject({ Bucket: 'sapanhin-magazine-book/preview', Key: fileName, Body: data }, function(err, datapush) {
              if (err) return res.serverError(err);
              console.log(datapush)
              preview_img.push({ preview_id : 'preview5', screenshot_url: urlamazon+'preview/'+fileName })
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
            s3.putObject({ Bucket: 'sapanhin-magazine-book/pdf', Key: fileName , Body: data }, function(err, datapush) {

              if (err) return res.serverError(err);
              console.log(datapush)
              console.log();
              fileData = {
                pdf_url: urlamazon+'pdf/'+fileName,
                bookshelf_cover_image_url: bookshelf_cover_image_url_tmp,
                detail_screenshot: preview_img
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

  update: function(req, res, next){
    var newData = {
      updatedAt: new Date(),
      deteletedAt: null
    }
    criteria = _.merge({}, newData,  req.params.all(), req.body);
    var fileNamePrefix = "issue"+criteria.issue_year+"-"+criteria.issue_no;
    urlamazon = 'https://s3-ap-southeast-1.amazonaws.com/sapanhin-magazine-book/'
    var preview_img = [];
    var bookshelf_cover_image_url_tmp = "";
    var fileData = [];
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
    if(err) return next(err); 
    idparam  = criteria.id
    async.parallel({
        bookshelf_cover_image: function(callback){
          req.file('bookshelf_cover_image').upload(function (err, files) {
            if (err) return res.serverError(err);
            if(!_.isEmpty(files)){
              var typefile = files[0].type;
              var split = typefile.split("/");
              var fileName = fileNamePrefix+"bookshelf_cover_image."+split[1];

              fs.readFile(files[0].fd, function (err, data) {
                s3.putObject({ Bucket: 'sapanhin-magazine-book/cover', Key: fileName , Body: data }, function(err, datapush) {
                  if (err) return res.serverError(err);
                  console.log(datapush)


                  db.collection('book').update(  {
                    '_id': ObjectID(idparam) 
                  } ,  { 
                    $set: { bookshelf_cover_image_url_tmp :  urlamazon+'cover/'+fileName }   
                  } , { upsert: false }, function(err, updateBook){
                    if(err) return next(err);
                     // res.redirect("/book/show/"+idparam)
                    console.log("db update bs")
                    callback(null, '7');
                  })

                 
                  
                });
              })
            }else{
              console.log("no upload bs")
              callback(null, 'one');
            } 
          })
        },
        preview1: function(callback){
          req.file('preview1').upload(function (err, files) {
            if (err) return res.serverError(err);
            if(!_.isEmpty(files)){
              var typefile = files[0].type;
              var split = typefile.split("/");
              var fileName = fileNamePrefix+"preview1."+split[1];

              fs.readFile(files[0].fd, function (err, data) {
                s3.putObject({ Bucket: 'sapanhin-magazine-book/preview', Key: fileName , Body: data }, function(err, datapush) {

                  if (err) return res.serverError(err);
                  
                  db.collection('book').update(  {
                      '_id': ObjectID(idparam) , 
                      'detail_screenshot.preview_id': 'preview1'
                  } ,  { 
                    $set: { 'detail_screenshot.$.screenshot_url' :  urlamazon+'preview/'+fileName }   
                  } , { upsert: false }, function(err, updateBook){
                    if(err) return next(err);
                     // res.redirect("/book/show/"+idparam)
                    console.log("db update p1")
                    callback(null, '7');
                  })

                });
              })
            }else{
              console.log("no upload p1")
              callback(null, '2');
            }
          })
        },
        preview2: function(callback){
          req.file('preview2').upload(function (err, files) {
            if (err) return res.serverError(err);
              if(!_.isEmpty(files)){
              var typefile = files[0].type;
              var split = typefile.split("/");
              var fileName = fileNamePrefix+"preview2."+split[1];

              fs.readFile(files[0].fd, function (err, data) {
                s3.putObject({ Bucket: 'sapanhin-magazine-book/preview', Key: fileName, Body: data }, function(err, datapush) {
                  if (err) return res.serverError(err);
                  console.log(datapush)
                  
                  db.collection('book').update(  {
                      '_id': ObjectID(idparam) , 
                      'detail_screenshot.preview_id': 'preview2'
                  } ,  { 
                    $set: { 'detail_screenshot.$.screenshot_url' :  urlamazon+'preview/'+fileName }   
                  } , { upsert: false }, function(err, updateBook){
                    if(err) return next(err);
                     // res.redirect("/book/show/"+idparam)
                    console.log("db update p2")
                    callback(null, '7');
                  })

                });
              })
            }else{
              console.log("no upload p2")
              callback(null, '3');
            }
          })
        },
        preview3: function(callback){
          req.file('preview3').upload(function (err, files) {
            if (err) return res.serverError(err);
            if(!_.isEmpty(files)){
              var typefile = files[0].type;
              var split = typefile.split("/");
              var fileName = fileNamePrefix+"preview3."+split[1];  
            
              fs.readFile(files[0].fd, function (err, data) {
                s3.putObject({ Bucket: 'sapanhin-magazine-book/preview', Key: fileName, Body: data }, function(err, datapush) {
                  if (err) return res.serverError(err);
                  console.log(datapush)
                  
                  db.collection('book').update(  {
                      '_id': ObjectID(idparam) , 
                      'detail_screenshot.preview_id': 'preview3'
                  } ,  { 
                    $set: { 'detail_screenshot.$.screenshot_url' :  urlamazon+'preview/'+fileName }   
                  } , { upsert: false }, function(err, updateBook){
                    if(err) return next(err);
                     // res.redirect("/book/show/"+idparam)
                    console.log("db update p3")
                    callback(null, '7');
                  })

                });
              })
            }else{
              console.log("no upload p3")
              callback(null, '4');
            }
          })
        },
        preview4: function(callback){
          req.file('preview4').upload(function (err, files) {
            if (err) return res.serverError(err);
            if(!_.isEmpty(files)){
              var typefile = files[0].type;
              var split = typefile.split("/");
              var fileName = fileNamePrefix+"preview4."+split[1];  
            
              fs.readFile(files[0].fd, function (err, data) {
                s3.putObject({ Bucket: 'sapanhin-magazine-book/preview', Key: fileName, Body: data }, function(err, datapush) {
                  if (err) return res.serverError(err);
                  console.log(datapush)
                  
                  db.collection('book').update(  {
                      '_id': ObjectID(idparam) , 
                      'detail_screenshot.preview_id': 'preview4'
                  } ,  { 
                    $set: { 'detail_screenshot.$.screenshot_url' :  urlamazon+'preview/'+fileName }   
                  } , { upsert: false }, function(err, updateBook){
                    if(err) return next(err);
                     // res.redirect("/book/show/"+idparam)
                    console.log("db update p4")
                    callback(null, '7');
                  })

                });
              })
            }else{
              console.log("no upload p4")
              callback(null, '4');
            }
          })
        },
        preview5: function(callback){
          req.file('preview5').upload(function (err, files) {
            if (err) return res.serverError(err);
            if(!_.isEmpty(files)){
              var typefile = files[0].type;
              var split = typefile.split("/");
              var fileName = fileNamePrefix+"preview5."+split[1];  
            
              fs.readFile(files[0].fd, function (err, data) {
                s3.putObject({ Bucket: 'sapanhin-magazine-book/preview', Key: fileName, Body: data }, function(err, datapush) {
                  if (err) return res.serverError(err);
                  console.log(datapush)
                  
                  db.collection('book').update(  {
                      '_id': ObjectID(idparam) , 
                      'detail_screenshot.preview_id': 'preview5'
                  } ,  { 
                    $set: { 'detail_screenshot.$.screenshot_url' :  urlamazon+'preview/'+fileName }   
                  } , { upsert: false }, function(err, updateBook){
                    if(err) return next(err);
                     // res.redirect("/book/show/"+idparam)
                    console.log("db update p5")
                    callback(null, '7');
                  })

                });
              })
            }else{
              console.log("no upload p5")
              callback(null, '5');
            }
          })
        },
        pdf_book: function(callback){
          req.file('pdf_book').upload(function (err, files) {
            if (err) return res.serverError(err);
            if(!_.isEmpty(files)){
              var typefile = files[0].type;
              var split = typefile.split("/");
              var fileName = fileNamePrefix+"pdf_book."+split[1];

              fs.readFile(files[0].fd, function (err, data) {
                s3.putObject({ Bucket: 'sapanhin-magazine-book/pdf', Key: fileName , Body: data }, function(err, datapush) {

                  if (err) return res.serverError(err);
                  
                  db.collection('book').update(  {
                      '_id': ObjectID(idparam)  
                  } ,  { 
                    $set: { 'pdf_url' :  urlamazon+'pdf/'+fileName }   
                  } , { upsert: false }, function(err, updateBook){
                    if(err) return next(err);
                     // res.redirect("/book/show/"+idparam)
                    console.log("db update pdf_book")
                    callback(null, '7');
                  })


                });
              })

            }else{
              console.log("no upload pdf_book")
              callback(null, '7');
            }
          })
        },
    },
    function(err, results) {
        // results is now equals to: {one: 1, two: 2}
        // console.log(results)
        idparam2 = criteria.id;
        tmp_data = criteria;

        delete tmp_data.id;
        var newDataSave = _.merge({}, tmp_data );

        db.collection('book').update(  { '_id': ObjectID(idparam2) } ,  { $set: newDataSave   } , { upsert: false }, function(err, updateBook){
          if(err) return next(err);
          console.log(updateBook)
          console.log(idparam2)
          console.log(newDataSave)
           res.redirect("/book/show/"+idparam2)
        })


    
    });

    });
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

