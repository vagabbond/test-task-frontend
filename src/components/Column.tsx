import { DragEvent, useState, FC } from "react";
import Task from "./Task";
import AddTask from "./AddTask";
import DropIndicator from "./DropIndicator";
import { useAppDispatch } from "../redux/hooks";
import { changeTaskOrder, moveTask } from "../redux/columns/columns.controller";
import { ITask } from "../utils/types";

interface IColumnProps {
 title: string;
 headingColor: string;
 tasks: ITask[];
 columnId: string;
}

const Column: FC<IColumnProps> = ({ title, headingColor, tasks, columnId }) => {
 const [active, setActive] = useState<boolean>(false);

 const dispatch = useAppDispatch();

 const handleDragStart = (e: DragEvent, taskId: string, columnId: string) => {
  e.dataTransfer.setData("taskId", taskId);
  e.dataTransfer.setData("columnId", columnId);
 };

 const handleDragEnd = async (e: DragEvent) => {
  const taskId = e.dataTransfer.getData("taskId");
  const currentColumnId = e.dataTransfer.getData("columnId");
  setActive(false);
  clearHighlights();

  const indicators = getIndicators();
  const { element } = getNearestIndicator(e, indicators);
  const draggedColumnId = element.dataset.columnId;
  const beforeId = element.dataset.before || "-1";

  const taskIndex = tasks.findIndex((t) => t._id === taskId);
  const indexToInsert = tasks.findIndex((t) => t._id.toString() === beforeId);
  const insertAtIndex =
   taskIndex < indexToInsert ? indexToInsert - 1 : indexToInsert;
  if (currentColumnId === draggedColumnId) {
   dispatch(
    changeTaskOrder({
     taskId,
     columnId: currentColumnId,
     insertAtIndex,
    })
   );
  } else {
   draggedColumnId &&
    dispatch(
     moveTask({
      taskId,
      newColumnId: draggedColumnId,
      fromColumnId: currentColumnId,
      insertAtIndex,
     })
    );
  }
 };
 const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  highlightIndicator(e);
  setActive(true);
 };

 const clearHighlights = () => {
  const indicators = getIndicators();
  indicators.forEach((i) => (i.style.opacity = "0"));
 };

 const highlightIndicator = (e: DragEvent) => {
  clearHighlights();
  const { element } = getNearestIndicator(e, getIndicators());
  element.style.opacity = "1";
 };

 const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
  return indicators.reduce(
   (closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = e.clientY - (box.top + box.height / 2);
    if (Math.abs(offset) < Math.abs(closest.offset)) {
     return { offset, element: child };
    }
    return closest;
   },
   { offset: Number.POSITIVE_INFINITY, element: indicators[0] }
  );
 };

 const getIndicators = (): HTMLElement[] => {
  return Array.from(
   document.querySelectorAll(`[data-column-id="${columnId}"]`)
  ) as HTMLElement[];
 };

 const handleDragLeave = () => {
  clearHighlights();
  setActive(false);
 };

 return (
  <div className="w-56 shrink-0">
   <div className="mb-3 flex items-center justify-between">
    <h3 className={`font-medium ${headingColor}`}>{title}</h3>
    <span className="rounded text-sm text-neutral-400">{tasks.length}</span>
   </div>
   <div
    onDrop={handleDragEnd}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    className={`h-full w-full transition-colors ${
     active ? "bg-neutral-800/50" : "bg-neutral-800/0"
    }`}
   >
    {tasks.map((t) => (
     <Task
      key={t._id}
      {...t}
      handleDragStart={handleDragStart}
      columnId={columnId}
     />
    ))}
    <DropIndicator beforeId={null} columnId={columnId} />
    <AddTask columnId={columnId} />
   </div>
  </div>
 );
};

export default Column;
