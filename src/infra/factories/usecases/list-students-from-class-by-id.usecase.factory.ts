import { Injectable } from '@nestjs/common';
import { ListStudentsFromClassByIdPortFactory } from '../ports/list-students-from-class-by-id.port.factory';
import { ListStudentsFromClassByIdUsecase } from '../../../domain/usecases/list-students-from-classes-by-id/list-students-from-classes-by-id.usecase';

@Injectable()
export class ListStudentsFromClassByIdUsecaseFactory {
  constructor(private readonly listStudentsFromClassByIdPortFactory: ListStudentsFromClassByIdPortFactory) {}

  getInstance(): ListStudentsFromClassByIdUsecase {
    return new ListStudentsFromClassByIdUsecase(this.listStudentsFromClassByIdPortFactory.getInstance());
  }
}


// import { Injectable } from '@nestjs/common';
// import { ListStudentsFromClassByIdPortImpl } from 'src/domain/ports/list-students-fromPortImpl';
// import { ListStudentsFromClassByIdUsecase } from 'src/domain/usecases/list-students-from-classes-by-id/list-students-from-classes-by-id.usecase';


// @Injectable()
// export class ListStudentsFromClassByIdUsecaseFactory {
//   constructor(private readonly listStudentsFromClassByIdPortImpl: ListStudentsFromClassByIdPortImpl) {}

//   getInstance(): ListStudentsFromClassByIdUsecase {
//     // Aquí, en lugar de pasar la fábrica de puerto, pasamos la implementación directa del puerto
//     return new ListStudentsFromClassByIdUsecase(this.listStudentsFromClassByIdPortImpl);
//   }
// }