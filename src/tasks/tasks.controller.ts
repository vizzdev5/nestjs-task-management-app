import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatuses } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { stat } from 'fs';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/')
  getAllTasks(@Query() getTaskFilter: GetTasksFilter): Task[] {
    if (Object.keys(getTaskFilter).length) {
    } else {
      return this.taskService.getAllTasks();
    }
  }
  @Get('/:id')
  getAllTasksByID(@Param('id') id: string): Task {
    return this.taskService.getTaskByID(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
  @Delete('/:id')
  deleteTaskByID(@Param('id') id: string): void {
    return this.taskService.deleteTaskByID(id);
  }
  @Patch('/:id/status')
  updateTaskByID(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskDto;
    return this.taskService.updateTaskByID(id, status);
  }
  1;
}
