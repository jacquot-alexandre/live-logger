import { Router } from 'express'; 
import { postRequestLogText } from '../controllers/postRequestLogText'; 
import bodyParser from 'body-parser'; import type { OptionsJson, OptionsUrlencoded } from 'body-parser';

const router = Router(); 

router.post('/logText', bodyParser.text(), postRequestLogText); 

export default router;