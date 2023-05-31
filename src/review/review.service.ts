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
    console.log(createReviewDto);
    const review = new this.reviewModel(createReviewDto);
    const creator = await this.userService.findById(createReviewDto._user);
    review.creator = creator.name;
    return review.save();
  }

  async find(params: {}): Promise<ReviewDocument[]> {
    return await this.reviewModel.find(params);
  }

  async update(id: string, comment: string): Promise<ReviewDocument> {
    return await this.reviewModel.findByIdAndUpdate(id, { comment: comment });
  }

  async delete(id: string): Promise<any> {
    return await this.reviewModel.deleteOne({ _id: id });
  }
}
