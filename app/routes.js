const express = require('express')
const router = express.Router()
const Question = require('./models/Question')

// create one quiz question
router.post('/questions', (req, res) => {
  try {
    const { description } = req.body
    const { alternatives } = req.body
} catch (error) {
    return res.status(500).json({"error":error})
}

})

// create one quiz question
router.post('/questions', async (req, res) => {
  try {
      const { description } = req.body
      const { alternatives } = req.body

      const question = await Question.create({
          description,
          alternatives
      })

      return res.status(201).json(question)
  } catch (error) {
      return res.status(500).json({"error":error})
  }
})

// get all quiz questions
router.get('/questions', async (req, res) => {
  try {
      const questions = await Question.find()
      return res.status(200).json(questions)
  } catch (error) {
      return res.status(500).json({"error":error})
  }
})

// get one quiz question
router.get('/questions/:id', async (req, res) => {
  try {
      const _id = req.params.id 

      const question = await Question.findOne({_id})        
      if(!question){
          return res.status(404).json({})
      }else{
          return res.status(200).json(question)
      }
  } catch (error) {
      return res.status(500).json({"error":error})
  }
})

// update one quiz question
router.put('/questions/:id', async (req, res) => {
  try {
      const _id = req.params.id 
      const { description, alternatives } = req.body

      let question = await Question.findOne({_id})

      if(!question){
          question = await Question.create({
              description,
              alternatives
          })    
          return res.status(201).json(question)
      }else{
          question.description = description
          question.alternatives = alternatives
          await question.save()
          return res.status(200).json(question)
      }
  } catch (error) {
      return res.status(500).json({"error":error})
  }
})

// delete one quiz question
router.delete('/questions/:id', async (req, res) => {
  try {
      const _id = req.params.id 

      const question = await Question.deleteOne({_id})

      if(question.deletedCount === 0){
          return res.status(404).json()
      }else{
          return res.status(204).json()
      }
  } catch (error) {
      return res.status(500).json({"error":error})
  }
})






// module.exports = function(app, passport, db) {

// // normal routes ===============================================================

//     // show the home page (will also have our login links)
//     app.get('/', function(req, res) {
//         res.render('index.ejs');
//     });

//     // PROFILE SECTION =========================
//     app.get('/profile', isLoggedIn, function(req, res) {
//         db.collection('messages').find().toArray((err, result) => {
//           if (err) return console.log(err)
//           res.render('profile.ejs', {
//             user : req.user,
//             messages: result
//           })
//         })
//     });

//     // LOGOUT ==============================
//     app.get('/logout', function(req, res) {
//         req.logout();
//         res.redirect('/');
//     });

// // message board routes ===============================================================

// app.post('/messages', (req, res) => {
//   db.collection('messages').save({
//     name: req.body.name, 
//     src: req.body.src, 
//     // msg: req.body.msg, 
//     value: 0, 
//     thumbsUp:"",
//     thumbsDown: ""}, (err, result) => {
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/profile')
//   })
// })

// app.put('/messages', (req, res) => {
//   if(req.body.thumbsUp == "yes"){
//     db.collection('messages')
//     .findOneAndUpdate({
//       name: req.body.name,
//       src: req.body.src, 
//       // msg: req.body.msg},
//     },
//     {
//       $set: {
//         value:req.body.value + 1,
//         thumbsUp: req.body.thumbsUp,
//         thumbsDown: req.body.thumbsDown
//       }
//     }, {
//       sort: {_id: -1},
//       upsert: true
//     }, (err, result) => {
//       if (err) return res.send(err)
//       res.send(result)
//     })
// } else if((req.body.thumbsDown == "yes") && (req.body.value!=0)){
//     db.collection('messages')
//     .findOneAndUpdate({
//       name: req.body.name, 
//       src: req.body.src,
//     //  msg: req.body.msg
//     }, 
//      {
//     $set: {
//         value:req.body.value -1,
//         thumbsUp: req.body.thumbsUp,
//         thumbsDown: req.body.thumbsDown
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//     })
//   }
// })

// app.delete('/messages', (req, res) => {
//   db.collection('messages').findOneAndDelete({
//     name: req.body.name, 
//     // msg: req.body.msg
//   }, (err, result) => {
//     if (err) return res.send(500, err)
//     res.send('Message deleted!')
//   })
// })


//     // app.post('/messages', (req, res) => {
//     //   db.collection('messages').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
//     //     if (err) return console.log(err)
//     //     console.log('saved to database')
//     //     res.redirect('/profile')
//     //   })
//     // })

//     // app.put('/messages', (req, res) => {
//     //   db.collection('messages')
//     //   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     //     $set: {
//     //       thumbUp:req.body.thumbUp + 1
//     //     }
//     //   }, {
//     //     sort: {_id: -1},
//     //     upsert: true
//     //   }, (err, result) => {
//     //     if (err) return res.send(err)
//     //     res.send(result)
//     //   })
//     // })

//     // app.delete('/messages', (req, res) => {
//     //   db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
//     //     if (err) return res.send(500, err)
//     //     res.send('Message deleted!')
//     //   })
//     // })

// // =============================================================================
// // AUTHENTICATE (FIRST LOGIN) ==================================================
// // =============================================================================

//     // locally --------------------------------
//         // LOGIN ===============================
//         // show the login form
//         app.get('/login', function(req, res) {
//             res.render('login.ejs', { message: req.flash('loginMessage') });
//         });

//         // process the login form
//         app.post('/login', passport.authenticate('local-login', {
//             successRedirect : '/profile', // redirect to the secure profile section
//             failureRedirect : '/login', // redirect back to the signup page if there is an error
//             failureFlash : true // allow flash messages
//         }));

//         // SIGNUP =================================
//         // show the signup form
//         app.get('/signup', function(req, res) {
//             res.render('signup.ejs', { message: req.flash('signupMessage') });
//         });

//         // process the signup form
//         app.post('/signup', passport.authenticate('local-signup', {
//             successRedirect : '/profile', // redirect to the secure profile section
//             failureRedirect : '/signup', // redirect back to the signup page if there is an error
//             failureFlash : true // allow flash messages
//         }));

// // =============================================================================
// // UNLINK ACCOUNTS =============================================================
// // =============================================================================
// // used to unlink accounts. for social accounts, just remove the token
// // for local account, remove email and password
// // user account will stay active in case they want to reconnect in the future

//     // local -----------------------------------
//     app.get('/unlink/local', isLoggedIn, function(req, res) {
//         var user            = req.user;
//         user.local.email    = undefined;
//         user.local.password = undefined;
//         user.save(function(err) {
//             res.redirect('/profile');
//         });
//     });

// };

// // route middleware to ensure user is logged in
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated())
//         return next();

//     res.redirect('/');
// }
