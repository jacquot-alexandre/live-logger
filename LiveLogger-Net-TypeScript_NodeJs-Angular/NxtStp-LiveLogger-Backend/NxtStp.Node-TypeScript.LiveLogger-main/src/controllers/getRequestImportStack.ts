import { Request, Response } from 'express'; 
import * as fs from 'fs';

export const getRequestImportStack = (req: Request, res: any) => {
  const jsonStack = fs.readFileSync('./output/stack.json').toString()
  return res.status(200).json({Message : JSON.parse(jsonStack)});
};
