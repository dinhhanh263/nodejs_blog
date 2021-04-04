const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: {type: Number,},
        name: { type: String, default: '', required: true },
        description: { type: String },
        videoId: { type: String, required: true },
        level: { type: String },
        image: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
        _id: false,
    },
    );
    

Course.plugin(mongooseDelete, { 
    overrideMethods: true,
    deletedAt: true, 
});

Course.plugin(AutoIncrement);

module.exports = mongoose.model('Course', Course);
