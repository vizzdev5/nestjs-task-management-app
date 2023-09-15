import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatuses } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { stat } from 'fs';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskByID(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatuses.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTaskByID(id: string): void {
    const taskFound = this.getTaskByID(id);
    const tasks = this.tasks.filter((task) => task.id !== taskFound.id);
  }
  updateTaskByID(id: string, status: TaskStatuses): Task {
    const task = this.getTaskByID(id);
    task.status = status;
    return task;
  }
}
