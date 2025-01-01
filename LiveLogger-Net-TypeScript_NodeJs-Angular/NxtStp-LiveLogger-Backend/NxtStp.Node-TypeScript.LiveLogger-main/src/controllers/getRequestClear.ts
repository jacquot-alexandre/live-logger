import { Request, Response } from 'express'; 
import { updateGlobalJsonArray } from '../main';

const DATA_RECEIVED_CLEARED_MESSAGE ='Data received on server cleared.';

export const getRequestClear = (req: Request, res: any) => {
    updateGlobalJsonArray([]);
    console.log(DATA_RECEIVED_CLEARED_MESSAGE);
    return res.status(200).json({Message :DATA_RECEIVED_CLEARED_MESSAGE});
};
