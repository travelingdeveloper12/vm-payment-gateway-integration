import {Request, Response, NextFunction} from 'express';
import logging from '../config/logging';

const NAMESPACE = 'SAMPLE CONTROLLER';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) =>{
    logging.info(NAMESPACE,`Sample Route Check`);

    return res.status(200).json({
            message: 'Health-Check-API'
    });
}

export default {sampleHealthCheck};