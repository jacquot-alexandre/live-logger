import { Router } from 'express'; 
import { postRequestLog } from '../controllers/postRequestLog'; 
const router = Router(); 
router.post('/log', postRequestLog); 

export default router;