import express from "express";
import { Register, Login, UpdateProfile, UpdateUsername, UpdateEmail, UpdatePhone, MatchPassword, UpdatePassword, DeleteUser, GetAllUsers, GetUser, UserDocument }
from "../controllers/auth.js";

const router = express.Router()

router.post("/", Register)
router.post("/login", Login)
router.put("/:id", UpdateProfile)
router.put("/username/:id", UpdateUsername)
router.put("/email/:id", UpdateEmail)
router.put("/phone/:id", UpdatePhone)
router.put("/password/:id", MatchPassword)
router.put("/password/update/:id", UpdatePassword)
router.delete("/:id", DeleteUser)
router.get("/user/:id", GetUser)
router.get("/", GetAllUsers)
router.get("/document", UserDocument)

export default router