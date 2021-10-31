import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from '../entities/Comment';
import { Exception } from '../exceptions/exceptions';
import ExceptionMessages from '../exceptions/messages';
import StatusCode from '../exceptions/statusCodes';

interface newComment {
  text: string;
  card_id: string;
}

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async createComment(newComment: newComment) {
    return await this.save(newComment);
  }

  async getAllComments() {
    const comments = await this.createQueryBuilder('comment')
      .getMany()
      .catch(() => {
        throw new Exception(StatusCode.BadRequest, ExceptionMessages.INTERNAL);
      });
    return comments;
  }

  async getComment(commentId: string) {
    const comment = await this.createQueryBuilder('comment')
      .select()
      .where('comment.id = :query', { query: commentId })
      .getOne()
      .catch(() => {
        throw new Exception(
          StatusCode.BadRequest,
          ExceptionMessages.NOT_FOUND.COMMENT
        );
      });
    return comment;
  }

  async updateComment(id: string, text: string) {
    return this.createQueryBuilder('comment')
      .update(CommentEntity)
      .set({ text })
      .where('comment.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id));
  }

  async deleteComment(id: string) {
    await this.createQueryBuilder('comment')
      .delete()
      .from(CommentEntity)
      .where('comment.id = :query', { query: id })
      .execute()
      .catch(() => {
        throw new Exception(
          StatusCode.BadRequest,
          ExceptionMessages.NOT_FOUND.COMMENT
        );
      });
  }
}
