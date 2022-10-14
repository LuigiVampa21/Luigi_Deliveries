import { Router } from 'express';
import { getSeed, login, register } from '../controllers/userController'


const router = Router();

router.get("/seed", getSeed)
router.post("/login", login)
router.post('/register', register)
  

export default router;