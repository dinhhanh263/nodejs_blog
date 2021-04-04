const Course = require('../models/Course');
const { mogooseToObject } = require('../../utils/mongoose');
const { update } = require('../models/Course');

class CourseController {
    //[GET] /Course:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', { course: mogooseToObject(course) });
            })
            .catch(next);
    }

    //[GET] /Course/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mogooseToObject(course)
            } ))
            .catch(next);
    }

    //[POST] /Course/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[PUT] /Course/id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /Course/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

     //[PATCH] /Course/:id/restore
     restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /Course/:id/force 
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /Course/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(next);
                break;
            default:
                res.renderes.json({ message: 'Action invalid!' })

        }
    }
}

module.exports = new CourseController();
