import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from '../class.schema';
import { Student } from '../student.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Class.name) private readonly turmaProfessorModel: Model<Class>,
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) {}

  async seed() {
    const turmas = [
      {
        code: 'TURMA001',
        courseId: 'DISC001',
        professorId: 'PROF001',
        campus: 'Campus Central',
        period: '2023.1',
        modality: 'Presencial',
      },
      {
        code: 'TURMA002',
        courseId: 'DISC002',
        professorId: 'PROF001',
        campus: 'Campus Central',
        period: '2023.1',
        modality: 'Presencial',
      },
      {
        code: 'TURMA003',
        courseId: 'DISC003',
        professorId: 'PROF002',
        campus: 'Campus Central',
        period: '2023.1',
        modality: 'Presencial',
      },
    ];

    const students = [
      {
        name: 'Charles Henrique',
        id: 'STU001',
        status: 'NAO_AVALIADO',
        classCodeList: ['TURMA001', 'TURMA002'],
      },
      {
        name: 'Jimi Hendrix da Silva',
        id: 'STU002',
        status: 'NAO_AVALIADO',
        classCodeList: ['TURMA001', 'TURMA003'],
      },
    ];

    await this.turmaProfessorModel.deleteMany({});
    await this.turmaProfessorModel.insertMany(turmas);

    await this.studentModel.deleteMany({});
    await this.studentModel.insertMany(students);

    console.log('Coleção turmaProfessor seeded com sucesso!');
    console.log('Coleção student seeded com sucesso!');
  }


// //metodo para obetener los estudiantes desde la base de datos
// async getStudents(): Promise<Student[]>{
//   return this.studentModel.find().exec();
// }

}
