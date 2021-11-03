import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from '../entities/Comment';
import { IComment, CommentInterface } from '../interfaces';

interface newComment {
  text: string;
  card_id: string;
}

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async createComment(newComment: newComment): Promise<CommentInterface> {
    return await this.save(newComment);
  }

  async getAllComments(): Promise<CommentInterface[]> {
    const comments = await this.createQueryBuilder('comment').getMany();
    return comments;
  }

  async getComment(commentId: string): Promise<CommentInterface | null> {
    const comment = await this.createQueryBuilder('comment')
      .select()
      .where('comment.id = :query', { query: commentId })
      .getOne();

    return comment || null;
  }

  async updateComment(
    id: string,
    text: IComment
  ): Promise<CommentInterface | null> {
    const updatedComment = await this.createQueryBuilder('comment')
      .update(CommentEntity)
      .set({ ...text })
      .where('comment.id = :query', { query: id })
      .execute()
      .then(() => this.findOne(id));

    return updatedComment || null;
  }

  async deleteComment(id: string): Promise<CommentInterface | null> {
    const data = await this.findOne(id);
    await this.createQueryBuilder('comment')
      .delete()
      .from(CommentEntity)
      .where('comment.id = :query', { query: id })
      .execute();

    return data || null;
  }
}
