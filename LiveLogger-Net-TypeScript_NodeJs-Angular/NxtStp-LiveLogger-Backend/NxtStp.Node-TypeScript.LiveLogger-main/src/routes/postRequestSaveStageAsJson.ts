import { Router } from 'express'; 
import { postRequestSaveStageAsJson } from '../controllers/postRequestSaveStageAsJson'; 
const router = Router(); 
router.post('/saveStageAsJson', postRequestSaveStageAsJson); 

export default router;