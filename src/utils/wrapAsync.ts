import { Request, Response, NextFunction } from "express";

// function wrapAsync<
//     P = any,
//     ResBody = any,
//     ReqBody = any,
//     ReqQuery = any
// >(

function wrapAsync<T extends Request>(
    fn: (
        // req: Request<P, ResBody, ReqBody, ReqQuery>,
        req: T,
        res: Response,
        next: NextFunction
    ) => Promise<any>
) {
    return function (
        // req: Request<P, ResBody, ReqBody, ReqQuery>,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        fn(req as T, res, next).catch(e => next(e))
    }
}

export default wrapAsync;