import { ITask } from "./types";

export const reorderTasks = (tasks: ITask[], taskIds: string[]) => {
 const taskMap = new Map(tasks.map((task) => [String(task._id), task]));
 return taskIds.map((taskId) => {
  const task = taskMap.get(String(taskId));
  if (!task) {
   throw new Error(`Task with ID ${taskId} not found`);
  }
  return task;
 });
};
