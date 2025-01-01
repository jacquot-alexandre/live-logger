import { Router } from 'express'; 
import { postRequestSaveStageAsCsv } from '../controllers/postRequestSaveStageAsCsv'; 
const router = Router(); 
router.post('/saveStageAsCsv', postRequestSaveStageAsCsv); 

export default router;