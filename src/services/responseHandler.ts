import { Request, Response, NextFunction } from 'express';
import { Exception } from '../exceptions/exceptions';
import ExceptionMessages from '../exceptions/messages';

import StatusCode from '../exceptions/statusCodes'

const responseJsonHandler = (error: Exception | null, result: any, out: Response) => {
    let response;
    if (error) {
        if (error.message && error.code) {
            response = error;
        } else {
            response = new Exception(StatusCode.InternalServerError, ExceptionMessages.INTERNAL);
        }
    } else {
        response = result;
    }
    out.json(response);
};


const routeHandler = (callback: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            responseJsonHandler(null, await callback(req, res, next), res);
        } catch (err: any) {
            responseJsonHandler(err, null, res);
        }
    }


}

export default routeHandler;