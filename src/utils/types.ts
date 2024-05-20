export interface ITask {
 _id: string;
 title: string;
 caption: string;
}

export interface IColumn {
 _id: string;
 title: string;
 tasks: ITask[];
 board: string;
}

export interface IBoard {
 columns: string[];
 name: string;
 _id: string;
}
export interface IError {
 message: string;
 code: number;
}

export interface IAddProps {
 title: string;
 caption: string;
 columnId: string;
}

export interface IMoveProps {
 taskId: string;
 newColumnId: string;
 fromColumnId: string;
 insertAtIndex: number;
}

export interface IChangeOrderProps {
 insertAtIndex: number;
 columnId: string;
 taskId: string;
}

export interface IDeletProps {
 taskId: string;
 columnId: string;
}

export interface IEditProps {
 taskId: string;
 columnId: string;
 title: string;
 caption: string;
}
