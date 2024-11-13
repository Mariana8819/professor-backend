import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListStudentsFromClassByIdMongooseAdapter } from '../../adapters/list-students-from-class-by-id/list-students-classes-by-filter.mongoose.adapter';
import { Student, StudentDocument } from '../../schemas/student.schema';

export class ListStudentsFromClassByIdPortFactory {
  constructor(@InjectModel(Student.name) private readonly model: Model<StudentDocument>) {}

  getInstance() {
    return new ListStudentsFromClassByIdMongooseAdapter(this.model);
  }
}
