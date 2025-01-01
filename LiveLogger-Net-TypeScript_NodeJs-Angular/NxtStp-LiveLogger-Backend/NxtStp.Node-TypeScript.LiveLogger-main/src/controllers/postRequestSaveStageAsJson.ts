import { Request, Response } from 'express'; 
import { INTERNAL_SERVER_ERROR_MESSAGE} from '../main';
import * as fs from 'fs';

export const postRequestSaveStageAsJson = (req: Request, res: any) => {
    const message = req.body;
      if (!message) {
        return res.status(400).json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
      };
      console.log(message);
      let data = JSON.stringify(message);
      fs.writeFileSync('./output/stage.json', data);
      res.status(200).json({Message :message});
};