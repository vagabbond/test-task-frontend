import { FC } from "react";
import { useFormik } from "formik";
import { createBoard } from "../redux/boards/board.contoller";
import { useAppDispatch } from "../redux/hooks";

interface IProps {
 handleClose: () => void;
}

const CreateBoardForm: FC<IProps> = ({ handleClose }) => {
 const dispatch = useAppDispatch();
 const formik = useFormik({
  initialValues: {
   name: "",
  },
  onSubmit: (values, actions) => {
   dispatch(createBoard({ name: values.name }));
   actions.resetForm();
  },
 });
 return (
  <div className="fixed z-50 top-0 left-0 w-full bg-black/50 flex justify-center items-center">
   <div className="bg-neutral-800 p-4 rounded w-96">
    <div className="flex justify-between items-center">
     <h3 className="text-lg font-medium">Create a new board</h3>
     <button
      onClick={handleClose}
      className="flex justify-center items-center bg-red-500 text-neutral-50 rounded-full h-6 w-6"
     >
      X
     </button>
    </div>
    <form onSubmit={formik.handleSubmit}>
     <div className="flex flex-col gap-2 mt-4">
      <label htmlFor="name" className="text-sm">
       Name
      </label>
      <input
       type="text"
       name="name"
       id="name"
       onChange={formik.handleChange}
       value={formik.values.name}
       className="rounded border border-neutral-700 p-2"
      />
      <button className="h-9 bg-violet-400 text-neutral-50 rounded p-2">
       Create
      </button>
     </div>
    </form>
   </div>
  </div>
 );
};

export default CreateBoardForm;
