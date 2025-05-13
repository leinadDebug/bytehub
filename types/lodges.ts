export interface Lodge {
    _id: string;
    title: string;
    owner: string;
}

export interface User {
    _id: string,
    email: string,
    username: string,
    password: string,
    createdAt: string,
    updatedAt: string,
}