import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async insertPost(content: string, id: number) {
    await this.postRepository.insert({
      content,
      isPicked: false,
      user: { id },
    });
  }

  async getPosts(id: number) {
    return await this.postRepository.find({
      where: { isPicked: true, user: { id } },
    });
  }

  async randomlyPickPost(id: number) {
    const pickedPost = await this.postRepository.findOne({
      where: { isPicked: false, user: { id } },
    });
    if (pickedPost) {
      pickedPost.isPicked = true;
      await this.postRepository.save(pickedPost);
    }
    return pickedPost;
  }
}
