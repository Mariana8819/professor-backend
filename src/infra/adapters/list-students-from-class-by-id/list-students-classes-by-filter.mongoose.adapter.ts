import { Model } from 'mongoose';
import {
  ListStudentsFromClassByIdPort,
  ListStudentsFromClassByIdPortInput,
  ListStudentsFromClassByIdPortResult,
} from '../../../domain/ports/list-students-from-class-by-id.port';
import { StudentDocument } from '../../schemas/student.schema';

export class ListStudentsFromClassByIdMongooseAdapter implements ListStudentsFromClassByIdPort {
  constructor(private readonly StudentModel: Model<StudentDocument>) {}

  async execute({ classId }: ListStudentsFromClassByIdPortInput): Promise<ListStudentsFromClassByIdPortResult> {
    const students = (await this.StudentModel.find<StudentDocument>({ classCodeList: { $in: [classId] } })
      .lean()
      .exec()) as StudentDocument[];

    return this.mapStudentsToModel(students);
  }

  private mapStudentsToModel(studentDocumentList: StudentDocument[]): ListStudentsFromClassByIdPortResult {
    console.log('studentDocumentList', studentDocumentList);
    //return [];
    return studentDocumentList.map(student => ({
      name: student.name,
      id: student.id,
      status: student.status,
      classCodeList: student.classCodeList.map((classId) =>classId.toString()),
    }));
  }
}




// import { Model } from 'mongoose';
// import {
//   ListStudentsFromClassByIdPort,
//   ListStudentsFromClassByIdPortInput,
//   ListStudentsFromClassByIdPortResult,
// } from '../../../domain/ports/list-students-from-class-by-id.port';
// import { StudentDocument } from '../../schemas/student.shema';

// export class ListStudentsFromClassByIdMongooseAdapter implements ListStudentsFromClassByIdPort {
//   constructor(private readonly StudentModel: Model<StudentDocument>) {}

//   async execute({ classId }: ListStudentsFromClassByIdPortInput): Promise<ListStudentsFromClassByIdPortResult> {
//    try{    //
//     const students = (await this.StudentModel.find<StudentDocument>({ classCodeList: { $in: [classId] } })
//       .lean()
//       .exec()) as StudentDocument[];


//       if (!students || students.length === 0) {                                           //
//         console.log(`No se encontraron estudiantes para la clase con ID: ${classId}`);    //
//         return [];                                                                        //    
//       }                                                                                   //   

// console.log('esdiantess encontrados:', students);
      
//     return this.mapStudentsToModel(students);
//   } catch(error){                                                                    //
//     console.error('Error al obtener los estudiantes:', error);                       //
//     throw new Error('Error al obtener los estudiantes desde la base de datos');      //
//   }                                                                                  //
// }

//   private mapStudentsToModel(studentDocumentList: StudentDocument[]): ListStudentsFromClassByIdPortResult {
//     console.log('studentDocumentListobtenidos adapter:', studentDocumentList);
//    // return [];
//    if (!studentDocumentList || studentDocumentList.length === 0) {   //
//     return [];                                                       //
//   }                                                                  //
  
//   return studentDocumentList.map(student => ({                        //
//     id: student._id.toString(), // Convertir _id a string si es necesario
//     name: student.name,
//     status: student.status,                                             //
//     classCodeList: student.classCodeList,                              //
//   }));                                                                 //
//   }
// }

