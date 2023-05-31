import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './review.schema';
import { Model } from 'mongoose';
import { CreateReviewDTO } from './createReview.dto';

export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDTO): Promise<ReviewDocument> {
    const review = new this.reviewModel(createReviewDto);
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
