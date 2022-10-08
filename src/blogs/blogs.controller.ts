import {
  Controller,
  Post,
  Get,
  Delete,
  UseGuards,
  Body,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { BlogService } from './blogs.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDec, UserDecType } from 'src/auth/decorators/user.decorator';
import { CreateBlogDto } from './dto/createBlog.dto';

@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  get(
    @Query('start') start: number,
    @Query('sort') sortingField: string,
    @Query('desc') desc: boolean,
  ) {
    console.log({ start, sortingField, desc });
    return this.blogService.query(start | 0, sortingField || 'createdAt', desc);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @UserDec('id') user: UserDecType,
    @Body() createBlogDto: CreateBlogDto,
  ) {
    return this.blogService.create(createBlogDto, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateById(
    @UserDec('id') user: UserDecType,
    @Param('id') id: number,
    @Body() createBlogDto: CreateBlogDto,
  ) {
    return this.blogService.updateById(id, createBlogDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteById(@UserDec('id') user: UserDecType, @Param('id') id: number) {
    return this.blogService.deleteById(id, user.id);
  }
}
