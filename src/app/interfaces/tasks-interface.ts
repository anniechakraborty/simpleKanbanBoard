export interface TasksInterface {
    _id: string;
    title: string;
    description: string;
    status: string;
    created_on: string;
    created_by: string;
}

export interface TasksResponse {
    message: string;
    status: number;
}