const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');
const Favourites = require('../models/favourite');

const favouriteRouter = express.Router();

favouriteRouter.use(bodyParser.json());

favouriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourites.find({})
        .populate('user')
        .populate('dishes')
        .then((favourites) => {
            if (favourites) {
                user_favourites = favourites.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
                if(!user_favourites) {
                    var err = new Error('You have no favourites!');
                    err.status = 404;
                    return next(err);
                }
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(user_favourites);
            } else {
                var err = new Error('There are no favourites');
                err.status = 404;
                return next(err);
            }
            
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, 
    (req, res, next) => {
        Favourites.find({})
            .populate('user')
            .populate('dishes')
            .then((favrts) => {
                var user;
                if(favrts)
                    user = favrts.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
                if(!user) 
                    user = new Favourites({user: req.user.id});
                for(let i of req.body){
                    if(user.dishes.find((dish) => {
                        if(dish._id){
                            return dish._id.toString() === i._id.toString();
                        }
                    }))
                        continue;
                    user.dishes.push(i._id);
                }
                user.save()
                    .then((Favrts) => {
                        res.statusCode = 201;
                        res.setHeader("Content-Type", "application/json");
                        res.json(Favrts);
                        console.log("Favourites Created");
                    }, (err) => next(err))
                    .catch((err) => next(err));
                
            })
            .catch((err) => next(err));
})

.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /favourites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.find({})
        .populate('user')
        .populate('dishes')
        .then((favrts) => {
            var removeFavrts;
            if (favrts) {
                removeFavrts = favrts.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
            } 
            if(removeFavrts){
                removeFavrts.remove()
                    .then((res) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(res);
                    }, (err) => next(err));
                
            } else {
                var err = new Error('You do not have any favourites');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
});

favouriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favourites.find({})
        .populate('user')
        .populate('dishes')
        .then((favrts) => {
            if (favrts) {
                const favs = favrts.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
                const dish = favs.dishes.filter(dish => dish.id === req.params.dishId)[0];
                if(dish) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(dish);
                } else {
                    var err = new Error('You do not have dish ' + req.params.dishId);
                    err.status = 404;
                    return next(err);
                }
            } else {
                var err = new Error('You do not have any favourites');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, 
    (req, res, next) => {
        Favourites.find({})
            .populate('user')
            .populate('dishes')
            .then((favrts) => {
                var user;
                if(favrts)
                    user = favrts.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
                if(!user) 
                    user = new Favourites({user: req.user.id});
                if(!user.dishes.find((dish) => {
                    if(dish._id)
                        return dish._id.toString() === req.params.dishId.toString();
                }))
                    user.dishes.push(req.params.dishId);
                
                user.save()
                    .then((userFavrts) => {
                        res.statusCode = 201;
                        res.setHeader("Content-Type", "application/json");
                        res.json(userFavrts);
                        console.log("Favourites Created");
                    }, (err) => next(err))
                    .catch((err) => next(err));

            })
            .catch((err) => next(err));
})

.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /favourites/:dishId');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.find({})
        .populate('user')
        .populate('dishes')
        .then((favourites) => {
            var user;
            if(favourites)
                user = favourites.filter(fav => fav.user._id.toString() === req.user.id.toString())[0];
            if(user){
                user.dishes = user.dishes.filter((dishid) => dishid._id.toString() !== req.params.dishId);
                user.save()
                    .then((result) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(result);
                    }, (err) => next(err));
                
            } else {
                var err = new Error('You do not have any favourites');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = favouriteRouter;


// favoriteRouter.route('/')
// .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// .get(cors.corsWithOptions,authenticate.verifyUser, (req,res,next) => {
//     Favorites.findOne({user: req.user._id})
//     .populate('user')
//     .populate('dishes')
//     .then((favorites) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(favorites);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
// .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     Favorites.findOne({user: req.user._id})
//     .then((favorite) => {
//         if (favorite) {
//             for (var i=0; i<req.body.length; i++) {
//                 if (favorite.dishes.indexOf(req.body[i]._id) === -1) {
//                     favorite.dishes.push(req.body[i]._id);
//                 }
//             }
//         favorite.save()
//             .then((favorite) => {
//                 console.log('Favorite Created ', favorite);
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(favorite);
//             }, (err) => next(err)); 
//         }
//         else {
//             Favorites.create({"user": req.user._id, "dishes": req.body})
//             .then((favorite) => {
//                 console.log('Favorite Created ', favorite);
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(favorite);
//             }, (err) => next(err));
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));  
// })
// .put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /dishes');
// })
// .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     Favorites.findOneAndRemove({"user": req.user._id})
//     .then((resp) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(resp);
//     }, (err) => next(err))
//     .catch((err) => next(err));   
// });

// favoriteRouter.route('/:dishId')
// .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// .get(cors.cors, authenticate.verifyUser, (req,res,next) => {
//     Favorites.findOne({user: req.user._id})
//     .then((favorites) => {
//         if (!favorites) {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             return res.json({"exists": false, "favorites": favorites});
//         }
//         else {
//             if (favorites.dishes.indexOf(req.params.dishId) < 0) {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 return res.json({"exists": false, "favorites": favorites});
//             }
//             else {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 return res.json({"exists": true, "favorites": favorites});
//             }
//         }

//     }, (err) => next(err))
//     .catch((err) => next(err))
// })
// .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     Favorites.findOne({user: req.user._id})
//     .then((favorite) => {
//         if (favorite) {            
//             if (favorite.dishes.indexOf(req.params.dishId) === -1) {
//                 favorite.dishes.push(req.params.dishId)
//                 favorite.save()
//                 .then((favorite) => {
//                     console.log('Favorite Created ', favorite);
//                     res.statusCode = 200;
//                     res.setHeader('Content-Type', 'application/json');
//                     res.json(favorite);
//                 }, (err) => next(err))
//             }
//         }
//         else {
//             Favorites.create({"user": req.user._id, "dishes": [req.params.dishId]})
//             .then((favorite) => {
//                 console.log('Favorite Created ', favorite);
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(favorite);
//             }, (err) => next(err))
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
// .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /favorites/'+ req.params.dishId);
// })
// .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
//     Favorites.findOne({user: req.user._id})
//     .then((favorite) => {
//         if (favorite) {            
//             index = favorite.dishes.indexOf(req.params.dishId);
//             if (index >= 0) {
//                 favorite.dishes.splice(index, 1);
//                 favorite.save()
//                 .then((favorite) => {
//                     Favorites.findById(favorite._id)
//                     .populate('user')
//                     .populate('dishes')
//                     .then((favorite) => {
//                         console.log('Favorite Dish Deleted!', favorite);
//                         res.statusCode = 200;
//                         res.setHeader('Content-Type', 'application/json');
//                         res.json(favorite);
//                     })
//                 }, (err) => next(err));
//             }
//             else {
//                 err = new Error('Dish ' + req.params.dishId + ' not found');
//                 err.status = 404;
//                 return next(err);
//             }
//         }
//         else {
//             err = new Error('Favorites not found');
//             err.status = 404;
//             return next(err);
//         }
//     }, (err) => next(err))
//     .catch((err) => next(err));
// });


// module.exports = favoriteRouter;