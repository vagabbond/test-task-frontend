import Form from "./components/Form";
import { Board } from "./components/Board";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchColumns } from "./redux/columns/columns.controller";
import CreateBoardForm from "./components/CreateBoardForm";
import Error from "./components/Error";

function App() {
 const dispatch = useAppDispatch();
 const {
  board,
  error: boardError,
  success: boardSuccess,
 } = useAppSelector((state) => state.boards);
 const { error: columnError, success: columnsSuccess } = useAppSelector(
  (state) => state.columns
 );
 const [open, setOpen] = useState(false);
 const [notifyInfo, setNotifyInfo] = useState<{
  message: string;
  status: "success" | "error" | null;
  check: boolean;
  type: "board" | "column" | null;
 }>({
  message: "",
  status: null,
  check: false,
  type: null,
 });
 const handleClose = () => {
  setOpen(!open);
 };

 useEffect(() => {
  if (board?._id) {
   dispatch(fetchColumns(board._id));
  }
 }, [dispatch, board?._id]);
 useEffect(() => {
  setNotifyInfo({
   message:
    boardSuccess ||
    columnsSuccess ||
    columnError?.message ||
    boardError?.message ||
    "",
   status: boardSuccess || columnsSuccess ? "success" : "error",
   check:
    boardSuccess || columnsSuccess || columnError || boardError ? true : false,
   type: boardSuccess || boardError ? "board" : "column",
  });
 }, [boardSuccess, columnsSuccess, columnError, boardError]);

 return (
  <div className="h-screen w-full bg-neutral-900 text-neutral-50">
   <div className="w-full flex align-center justify-center p-4 bg-neutral-800/50 gap-9">
    <Form />
    <button
     onClick={() => setOpen(!open)}
     className="bg-violet-400 text-neutral-50 rounded p-2 h-10"
    >
     Create Board
    </button>
    {open && <CreateBoardForm handleClose={handleClose} />}
   </div>
   {board ? (
    <Board />
   ) : (
    <div className="w-full flex align-center  justify-center mt-10">
     <p className="">Fetch or create a board</p>
    </div>
   )}
   {notifyInfo.check && (
    <Error
     message={notifyInfo.message}
     status={notifyInfo.status}
     type={notifyInfo.type}
    />
   )}
  </div>
 );
}

export default App;
