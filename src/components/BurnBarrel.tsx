import { DragEvent, useState, FC } from "react";
import { FiTrash } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { useAppDispatch } from "../redux/hooks";
import { deleteTask } from "../redux/columns/columns.controller";

const BurnBarrel: FC = () => {
 const [active, setActive] = useState<boolean>(false);

 const dispatch = useAppDispatch();
 const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  setActive(true);
 };

 const handleDragLeave = () => {
  setActive(false);
 };

 const handleDragEnd = (e: DragEvent) => {
  const taskId = e.dataTransfer.getData("taskId");
  const columnId = e.dataTransfer.getData("columnId");
  dispatch(deleteTask({ taskId, columnId }));
  setActive(false);
 };

 return (
  <div
   onDrop={handleDragEnd}
   onDragOver={handleDragOver}
   onDragLeave={handleDragLeave}
   className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
    active
     ? "border-red-800 bg-red-800/20 text-red-500"
     : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
   }`}
  >
   {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
  </div>
 );
};

export default BurnBarrel;
