import { FC } from "react";
import Column from "./Column";
import BurnBarrel from "./BurnBarrel";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { deleteBoard } from "../redux/boards/board.contoller";

export const Board: FC = () => {
 const board = useAppSelector((state) => state.boards.board);
 const columns = useAppSelector((state) => state.columns.columns);

 const dispatch = useAppDispatch();
 const handleDelete = (boardId: string) => {
  dispatch(deleteBoard(boardId));
 };

 return (
  <div className=" w-full flex flex-col items-center justify-center mt-10">
   <div className="flex flex-col items-center justify-center gap-3">
    <h1 className="text-4xl font-bold text-center text-violet-400">
     {board?.name}
    </h1>
    <button
     className="w-fit bg-violet-400 text-neutral-50 rounded p-2"
     onClick={() => {
      if (board) {
       handleDelete(board._id);
      }
     }}
    >
     Delete Board
    </button>
   </div>
   <div className="flex w-full items-start justify-center gap-3 p-12">
    {board &&
     columns &&
     columns.map((column) => {
      return (
       <Column
        key={column._id}
        title={column.title}
        headingColor="text-violet-400"
        tasks={column.tasks}
        columnId={column._id}
       />
      );
     })}
    <BurnBarrel />
   </div>
  </div>
 );
};
