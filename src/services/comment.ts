/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from '../entities/Comment';


interface newComment {
  text: string;
  card_id: string;
}

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  getAllComments() {
    return this.createQueryBuilder('comment').getMany();
  }

  getComment(commentId: string) {
    return this.createQueryBuilder('comment')
      .select()
      .where('comment.id = :query', { query: commentId })
      .getOne();
  }

  createComment(newComment: newComment) {
    return this.save(newComment);
  }

  updateComment(id: string, text: string) {
    return this.createQueryBuilder('comment')
      .update(CommentEntity)
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
