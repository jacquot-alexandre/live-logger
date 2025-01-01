import { Router } from 'express'; 
import { postRequestSaveStackAsJson } from '../controllers/postRequestSaveStackAsJson'; 
const router = Router(); 
router.post('/saveStackAsJson', postRequestSaveStackAsJson); 

export default router;