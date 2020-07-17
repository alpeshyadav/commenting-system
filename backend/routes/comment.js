const router = require('express').Router()
import Comment from '../models/comment.model'


router.route('/').get((req, res) => {
    Comment.find()
      .then(comment => res.json(comment))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
    const username = req.body.username
    const comment = req.body.comment
    const date = Date.parse(req.body.date)
    const newComment = new Comment({
        username,
        comment,
        date,
    })
    newComment.save()
        .then(() => res.json('Comment added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/inc/:id').post((req, res) => {
    Comment.findById(req.params.id)
      .then(comment => {
        comment.username = req.body.username;
        comment.comment = req.body.comment;
        comment.upVote = req.body.upVote++
        comment.downVote = req.body.downVote

        comment.save()
          .then(() => res.json('Comment updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  })

router.route('/dec/:id').post((req, res) => {
    Comment.findById(req.params.id)
    .then(comment => {
        comment.username = req.body.username;
        comment.comment = req.body.comment;
        comment.upVote = req.body.upVote
        comment.downVote = req.body.downVote--

        comment.save()
        .then(() => res.json('Comment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})
export default router