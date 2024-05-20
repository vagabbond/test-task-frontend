import { FC, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import DropIndicator from "./DropIndicator";
import { useAppDispatch } from "../redux/hooks";
import { editTask } from "../redux/columns/columns.controller";

interface ITaskProps {
 title: string;
 _id: string;
 caption: string;
 columnId: string;
 handleDragStart: (
  e: React.DragEvent<HTMLDivElement>,
  taskId: string,
  columnId: string
 ) => void;
}

const Task: FC<ITaskProps> = ({
 title,
 _id,
 handleDragStart,
 caption,
 columnId,
}) => {
 const [isEditing, setIsEditing] = useState<boolean>(false);
 const dispatch = useAppDispatch();
 const formik = useFormik({
  initialValues: {
   title,
   caption,
  },
  onSubmit: async (values) => {
   dispatch(editTask({ taskId: _id, columnId, ...values }));
   setIsEditing(false);
  },
 });

 return (
  <>
   <DropIndicator beforeId={_id} columnId={columnId} />
   <motion.div
    layout
    layoutId={_id}
    draggable="true"
    onDragStart={(e) => {
     if ("dataTransfer" in e) {
      const dragEvent = e as unknown as React.DragEvent<HTMLDivElement>;
      handleDragStart(dragEvent, _id, columnId);
     }
    }}
    className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
   >
    {isEditing ? (
     <form onSubmit={formik.submitForm}>
      <textarea
       name="title"
       id="title"
       onChange={formik.handleChange}
       value={formik.values.title}
       autoFocus
       placeholder="Add task title..."
       className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
      />
      <textarea
       name="caption"
       id="caption"
       onChange={formik.handleChange}
       value={formik.values.caption}
       autoFocus
       placeholder="Add task caption..."
       className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
      />
      <div className="mt-1.5 flex items-center justify-end gap-1.5">
       <button
        onClick={() => setIsEditing(false)}
        className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
       >
        Discard all changes
       </button>
       <button
        type="submit"
        className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
       >
        <span>Edit</span>
        <FaEdit />
       </button>
      </div>
     </form>
    ) : (
     <div>
      <div>
       <p className="text-sm text-neutral-100">{title}</p>
       <p className="text-sm text-neutral-200">{caption}</p>
      </div>
      <div className="w-full flex justify-end ">
       <button
        className="w-fit text-xs text-neutral-400 hover:text-neutral-50 "
        onClick={() => setIsEditing(true)}
       >
        Edit
       </button>
      </div>
     </div>
    )}
   </motion.div>
  </>
 );
};

export default Task;
