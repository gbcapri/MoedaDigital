import { Router } from "express";
import {
  destroy,
  index,
  show,
  store,
  update,
  signup,
  login,
} from "../controllers/user_controller.js";

const router = Router();

router.post("/", user_controller.store)
router.get("/", user_controller.index)
router.get("/:id", user_controller.show)
router.put("/:id", user_controller.update)
router.delete("/:id", user_controller.destroy)

export default router


