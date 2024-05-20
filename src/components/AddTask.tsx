import { useState, FC } from "react";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { useAppDispatch } from "../redux/hooks";
import { addTask } from "../redux/columns/columns.controller";

interface AddTaskProps {
 columnId: string;
}

const AddTask: FC<AddTaskProps> = ({ columnId }) => {
 const [adding, setAdding] = useState<boolean>(false);
 const dispatch = useAppDispatch();

 const formik = useFormik({
  initialValues: {
   title: "",
   caption: "",
  },
  onSubmit: async (values, actions) => {
   dispatch(addTask({ columnId, ...values }));
   actions.resetForm();
   setAdding(false);
  },
 });

 return (
  <>
   {adding ? (
    <motion.form layout onSubmit={formik.handleSubmit}>
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
       onClick={() => setAdding(false)}
       className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
      >
       Close
      </button>
      <button
       type="submit"
       className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
      >
       <span>Add</span>
       <FiPlus />
      </button>
     </div>
    </motion.form>
   ) : (
    <motion.button
     layout
     onClick={() => setAdding(true)}
     className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
    >
     <span>Add card</span>
     <FiPlus />
    </motion.button>
   )}
  </>
 );
};

export default AddTask;
