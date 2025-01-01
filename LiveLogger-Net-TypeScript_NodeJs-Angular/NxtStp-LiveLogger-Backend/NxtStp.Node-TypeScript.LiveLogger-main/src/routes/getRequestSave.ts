import { Router } from 'express'; 
import { getRequestSave } from '../controllers/getRequestSave'; 
const router = Router(); 
router.get('/save', getRequestSave); 

export default router;