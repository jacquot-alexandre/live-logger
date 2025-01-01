import { Router } from 'express'; 
import { getRequestClear } from '../controllers/getRequestClear'; 
const router = Router(); 
router.get('/clear', getRequestClear); 

export default router;