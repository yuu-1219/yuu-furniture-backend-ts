import { Request, Response, NextFunction } from "express";

function wrapAsync<
    P = any,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any
>(
    fn: (
        req: Request<P, ResBody, ReqBody, ReqQuery>,
        res: Response,
        next: NextFunction
    ) => Promise<any>
) {
    return function (
        req: Request<P, ResBody, ReqBody, ReqQuery>,
        res: Response,
        next: NextFunction
    ) {
        fn(req, res, next).catch(e => next(e))
    }
}

export default wrapAsync;