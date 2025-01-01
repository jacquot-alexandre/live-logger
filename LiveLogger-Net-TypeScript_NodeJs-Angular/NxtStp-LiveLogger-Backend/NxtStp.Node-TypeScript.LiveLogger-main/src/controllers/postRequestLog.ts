import { Request, Response } from 'express'; 
import { globalJsonArray , sockets, INTERNAL_SERVER_ERROR_MESSAGE} from '../main';

export const postRequestLog = (req: Request, res: any) => {
    const message = req.body;
      if (!message) {
        return res.status(400).json({ error: INTERNAL_SERVER_ERROR_MESSAGE });
      };
      globalJsonArray.push(message);
      console.log(message);
      sockets.forEach(s => s.send(JSON.stringify(message)));
      res.status(200).json({Message :message});
};