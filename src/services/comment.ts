/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '../entities/Comment';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  getAllComments() {
    return this.createQueryBuilder('comment').getMany();
  }

  getComment(commentId: string) {
    return this.createQueryBuilder('comment')
      .select()
      .where('comment.id = :query', { query: commentId })
      .getOne();
  }

  createComment(newComment: Comment) {
    return this.save(newComment);
  }

  updateComment(id: string, text: string) {
    return this.createQueryBuilder('comment')
      .update(Comment)
      .set({ text })
      .where('comment.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id));
  }

  deleteComment(id: string) {
    return this.createQueryBuilder('comment')
      .delete()
      .from(Comment)
      .where('comment.id = :query', { query: id })
      .execute();
  }
}
