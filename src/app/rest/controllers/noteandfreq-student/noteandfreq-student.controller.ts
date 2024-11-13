import { Body, Controller, Post, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { NoteAndFreqStudentService } from './../../../../infra/factories/usecases/noteandfreq-student.usecase.factory';
import { NoteAndFreqStudent } from './../../../../domain/models/noteandfreqstudent.model';

@Controller('class/:classId/students')
export class NoteAndFreqStudentController {
    constructor(private readonly studentService: NoteAndFreqStudentService) {}

    @Post('launch-grades-attendance')
    @HttpCode(HttpStatus.OK)
    async launchGradesAndAttendance(
        @Param('classId') classId: string,
        @Body() recordDto: NoteAndFreqStudent) {
        return this.studentService.launchGradesAndAttendance({...recordDto, classId});
    }
}