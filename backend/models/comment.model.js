import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
    upVote: {
        type: Number,
        default: 0,
    },
    downVote: {
        type: Number,
        default: 0,
    }
},
    {
        timestamps: true,
    }
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment