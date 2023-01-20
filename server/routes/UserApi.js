import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import passport from "passport";

const router = Router();

router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ user:  req.user})
})

export default router;