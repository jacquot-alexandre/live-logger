import { Request, Response } from 'express'; 
import { sockets} from '../main';

export const postRequestLogText = (req: Request, res: any) => {
    const message = req.body;
    console.log(message);
    let except = JSON.stringify(message);
    sockets.forEach(s => s.send(except));
    res.status(200).json({"Message" :  "text forwarded to web socket"});
};