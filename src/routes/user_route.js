import { Router } from "express";
import {
  login,
  signup,
  destroy,
  index,
  show,
  store,
  update,
} from "../controllers/user-controller.js";
import authorizer from "../middlewares/authorizer.js";
import authenticator from "../middlewares/authenticator.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);

router.use(authenticator);

router.use(authorizer(["ADMINISTRATOR", "SUPPORT"]));

router.get("/", index);
router.get("/:id", show);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;