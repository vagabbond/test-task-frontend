import { useFormik } from "formik";
import { useAppDispatch } from "../redux/hooks";
import { fetchBoard } from "../redux/boards/board.contoller";

interface IFormValues {
 name: string;
}

const Form = () => {
 const initialValues: IFormValues = {
  name: "",
 };
 const dispatch = useAppDispatch();

 const formik = useFormik({
  initialValues,
  onSubmit: (values: IFormValues, actions) => {
   dispatch(fetchBoard(values.name));
   actions.resetForm();
  },
 });

 return (
  <form onSubmit={formik.handleSubmit} className="flex  gap-2">
   <div className="flex gap-2 flex-col ">
    <input
     type="text"
     name="name"
     id="name"
     onChange={formik.handleChange}
     value={formik.values.name}
     placeholder="Board name"
     className="text-black rounded border border-neutral-700 p-2  focus:outline-0"
    />
   </div>
   <button type="submit" className=" bg-violet-400 text-neutral-50 rounded p-2">
    Fetch
   </button>
  </form>
 );
};

export default Form;
