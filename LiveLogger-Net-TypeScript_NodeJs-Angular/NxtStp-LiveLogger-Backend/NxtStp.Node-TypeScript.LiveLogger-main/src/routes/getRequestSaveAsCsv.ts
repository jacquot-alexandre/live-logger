import { Router } from 'express'; 
import { getRequestSaveAsCsv } from '../controllers/getRequestSaveAsCsv'; 
const router = Router(); 
router.get('/saveAsCsv', getRequestSaveAsCsv); 

export default router;