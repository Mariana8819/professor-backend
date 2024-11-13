import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NoteAndFreqStudent } from "./../../../domain/models/noteandfreqstudent.model";
import { Student } from "./../../schemas/student.schema";

@Injectable()
export class NoteAndFreqStudentService {
    constructor(
        @InjectModel(Student.name) private readonly studentModel: Model<Student>,
    ){}

//async launchGradesAndAttendance(recordDto: NoteAndFreqStudent): Promise<Student> {
async launchGradesAndAttendance(recordDto: NoteAndFreqStudent & {classId: string}): Promise<Student> {
    const { studentId, classId, aulasLecionadas, aulasAtendidas, notaP1, notaP2 } = recordDto ;
   
    const student = await this.studentModel.findOne({ id: studentId, classId});

    if(!student) throw new Error('Estudiante no encontrado');

    const averageGrade = (notaP1 + notaP2) /2;
    const attendance = (aulasAtendidas / aulasLecionadas) * 100;

    if(attendance < 75){
        student.status = 'REPROVADO';
    } else if (averageGrade >= 7) {
        student.status = 'APROVADO';
    } else if (averageGrade >= 5) {
        student.status = 'EM_EXAME';
    } else {
        student.status = 'REPROVADO';
    }

    await student.save();
    return student;
}


}