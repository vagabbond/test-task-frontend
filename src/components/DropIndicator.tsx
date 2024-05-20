import { FC } from "react";

interface DropIndicatorProps {
 beforeId: string | null;
 columnId: string;
}

const DropIndicator: FC<DropIndicatorProps> = ({ beforeId, columnId }) => {
 return (
  <div
   data-before={beforeId || "-1"}
   data-column-id={columnId}
   className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
  />
 );
};

export default DropIndicator;
