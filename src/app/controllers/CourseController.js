const Course = require('../models/Course');
const { mogooseToObject } = require('../../utils/mongoose');

class CourseController {
    //[GET] /Course:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', { course: mogooseToObject(course) });
            })
            .catch(next);
    }
}

module.exports = new CourseController();
