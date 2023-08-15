import { Controller, Get, Body, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async getPosts(@Req() req) {
    return await this.postService.getPosts(req.user.id);
  }
  @Get('/pick')
  @UseGuards(AuthGuard('jwt'))
  async pickPost(@Req() req) {
    return await this.postService.randomlyPickPost(req.user.id);
  }

  @Post('/insert')
  @UseGuards(AuthGuard('jwt'))
  async insertPost(@Req() req, @Body() body: { content: string }) {
    await this.postService.insertPost(body.content, req.user.id);
  }
}
