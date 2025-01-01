import { Request, Response } from 'express'; 
import { INTERNAL_SERVER_ERROR_MESSAGE} from '../main';
import * as fs from 'fs';
export let json2csvConverter = require('json-2-csv');

export const postRequestSaveStageAsCsv = (req: Request, res: any) => {
      const message = req.body;
      if (!message) {
        return res.status(400).json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
      };
      console.log(message);
      let processedMessages = message["processedMessages"];
      const processedMessagesCsv = json2csvConverter.json2csv(processedMessages);
      console.log(processedMessagesCsv);
      fs.writeFileSync('./output/stage_processedMessages.csv', processedMessagesCsv);
      let calculations = message["calculations"];
      const calculationsCsv = json2csvConverter.json2csv(calculations);
      fs.writeFileSync('./output/stage_calculations.csv', calculationsCsv);
      res.status(200).json({Message :message});
};