import { FC, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAppDispatch } from "../redux/hooks";
import {
 clearColumnError,
 clearColumnSuccess,
} from "../redux/columns/columns.slice";
import {
 clearBoardError,
 clearBoardSuccess,
} from "../redux/boards/board.slice";
interface IErrorProps {
 message: string | null;
 status: "error" | "success" | null;
 type: "board" | "column" | null;
}

const Error: FC<IErrorProps> = ({ message, status, type }) => {
 const dispatch = useAppDispatch();
 useEffect(() => {
  if (status === "error" && message) {
   toast.error(message, {
    onClose: () => {
     if (type === "board") {
      dispatch(clearBoardError());
     } else if (type === "column") {
      dispatch(clearColumnError());
     }
    },
   });
  } else if (status === "success" && message) {
   toast.success(message, {
    onClose: () => {
     if (type === "board") {
      dispatch(clearBoardSuccess());
     } else if (type === "column") {
      dispatch(clearColumnSuccess());
     }
    },
   });
  }
 }, [message, status, type, dispatch]);
 return (
  <ToastContainer
   position="top-right"
   autoClose={5000}
   hideProgressBar={false}
   newestOnTop={false}
   closeOnClick
   rtl={false}
   pauseOnFocusLoss
   draggable
   pauseOnHover
   theme="dark"
  />
 );
};

export default Error;
