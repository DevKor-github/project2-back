import { Controller, Get, Body, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  async getPosts() {
    return await this.postService.getPosts();
  }
  @Get('/pick')
  async pickPost() {
    return await this.postService.randomlyPickPost();
  }

  @Post('/insert')
  async insertPost(@Body() body: { content: string }) {
    await this.postService.insertPost(body.content);
  }
}
