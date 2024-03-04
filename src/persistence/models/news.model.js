import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            index: {
                unique: true,
            },
            minlength: [5, 'this title is short'],
        },
        body: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    }
);

export const NewsModel = mongoose.model('News', Schema);