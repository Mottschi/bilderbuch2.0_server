declare namespace Express {
    type UserType = {
        username: string,
        email: string,
        id: string,
    }
    export interface Request {
        user?: UserType;
    }
    export interface Response {
        user?: UserType;
    }

    namespace Multer {
        interface File {
            location?: string,
        }
    }
}