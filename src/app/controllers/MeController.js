const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../utils/mongoose');

class MeController {

    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});
        
        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }
        
        Promise.all([ courseQuery,  Course.countDocumentsDeleted()])
            .then(([courses, deletedCnt]) => 
                res.render('me/stored-courses', {
                    deletedCnt: deletedCnt,
                    courses: multipleMongooseToObject(courses)
                })
            )
            .catch(next);
            
        // Course.countDocumentsDeleted()
        //     .then((deletedCnt) => {
        //         console.log(deletedCnt);
        //     })
        //     .catch(() => {

        //     })
        
        // Course.find({})
        //     .then(courses => 
        //         res.render('me/stored-courses', {
        //         courses: multipleMongooseToObject(courses)
        //     }))
        //     .catch(next);    
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next);    
    }
}

module.exports = new MeController();
