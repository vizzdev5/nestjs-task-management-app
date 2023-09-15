import { TaskStatuses } from '../task.model';

export class GetTasksFilter {
  status?: TaskStatuses;
  search?: string;
}
