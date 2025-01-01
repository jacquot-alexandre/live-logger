import { Request, Response } from 'express'; 
import { globalJsonArray } from '../main';
import * as fs from 'fs';

const DATA_RECEIVED_SAVED_MESSAGE ='Data received on server saved on disk.';

export const getRequestSave = (req: Request, res: any) => {
  let data = JSON.stringify(globalJsonArray);
  fs.writeFileSync('./output/log.json', data);
  console.log(DATA_RECEIVED_SAVED_MESSAGE);
  return res.status(200).json({Message :DATA_RECEIVED_SAVED_MESSAGE});
};