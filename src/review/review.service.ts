import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './review.schema';
import { Model } from 'mongoose';
import { CreateReviewDTO } from './createReview.dto';
import { UserService } from 'src/user/user.service';

export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private userService: UserService,
  ) {}

  async create(createReviewDto: CreateReviewDTO): Promise<ReviewDocument> {
    const review = new this.reviewModel(createReviewDto);
    const creator = await this.userService.findById(createReviewDto._user);
    review.creator = creator.name;
    review.likes = 0;
    return review.save();
  }

  async find(params: {}): Promise<ReviewDocument[]> {
    return await this.reviewModel.find(params);
  }

  async update(id: string, param: {}): Promise<ReviewDocument> {
    return await this.reviewModel.findByIdAndUpdate(id, param);
  }

  async delete(id: string): Promise<any> {
    return await this.reviewModel.deleteOne({ _id: id });
  }
}
