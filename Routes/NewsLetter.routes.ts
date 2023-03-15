import express from "express";
import { AsureAuth } from "../Middlewares/Authenticated";

import { 
    suscribEmail ,
    getsEmail,
    deleteEmail
} from "../Controllers/NewsLetter.controller";

const NewsLetterRouter = express.Router();

NewsLetterRouter.post("/newsletter", suscribEmail);
NewsLetterRouter.get("/newsletter", [AsureAuth],getsEmail);
NewsLetterRouter.delete("/newsletter/:id", [AsureAuth], deleteEmail);

export{
    NewsLetterRouter,
}
