import { Router } from 'express'; 
import { getRequestResourcesInfo } from '../controllers/getRequestResourcesInfo'; 
const router = Router(); 
router.get('/resourcesInfo', getRequestResourcesInfo); 

export default router;