import { IsEnum } from 'class-validator';
import { TaskStatuses } from '../task.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatuses)
  status: TaskStatuses;
}
