import type {ErrorRequestHandler} from 'express';

export const errorHandler: ErrorRequestHandler = (error, request, res, next) => {
    console.error("Unhandled error:", error);

    return res.status(500).json({
        message:"Palvelimella tapahtui odottamaton virhe",
    
    });
}