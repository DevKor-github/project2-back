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

  async insertPost(content: string) {
    await this.postRepository.insert({ content, isPicked: false });
  }

  async getPosts() {
    return await this.postRepository.find({ where: { isPicked: true } });
  }

  async randomlyPickPost() {
    const pickedPost = await this.postRepository.findOne({
      where: { isPicked: false },
    });
    if (pickedPost) {
      pickedPost.isPicked = true;
      await this.postRepository.save(pickedPost);
    }
    return pickedPost;
  }
}
