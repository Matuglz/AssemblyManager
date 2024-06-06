import { Router } from "express";
import { usersService } from "../service/users/users.service.js";
export const TEST = Router()

TEST.post('/test', async (req, res) => {

    
 let user = await usersService.register({
  name: 'Assembly',
  lastName: 'Admin',
  email: 'admin@gmail.com',
  password: '1234',
  rol:'admin'
 })
  
 console.log(user);
  res.send('ok')

})