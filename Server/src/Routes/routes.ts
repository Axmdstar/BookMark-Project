import {Router} from 'express';
import { AddBk, AddItem2Bk, BrowserInfo, Delete, GetBks, GetExploreBks, GetItems, Like, LogIn, LogOut, SignUp } from '../Controllers/controllers';
import { authUser } from '../middleware/auth_mdw';



const routes = Router();

routes.get("/LogOut", LogOut);
routes.get("/browserinfo", authUser, BrowserInfo)
routes.get("/getExplore", authUser, GetExploreBks)
routes.get("/getbks/:id", GetBks)
routes.get("/getItems/:id", GetItems)

routes.post("/login", LogIn)
routes.post("/signup", SignUp)

routes.post("/addBk", AddBk)
routes.post("/additem", AddItem2Bk)
routes.post("/like", Like)

routes.delete("/delete/:type/:item", Delete)


export default routes;