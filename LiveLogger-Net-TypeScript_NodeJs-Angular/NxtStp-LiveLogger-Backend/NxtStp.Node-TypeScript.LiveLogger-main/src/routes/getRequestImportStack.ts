import { Router } from 'express'; 
import { getRequestImportStack } from '../controllers/getRequestImportStack'; 
const router = Router(); 
router.get('/importStack', getRequestImportStack); 

export default router;