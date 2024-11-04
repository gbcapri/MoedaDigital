import { Router } from "express";
import {
  index,
  show,
  createTransaction,
} from "../controllers/transaction_controller.js";
import authorizer from "../middlewares/authorizer.js";
import authenticator from "../middlewares/authenticator.js";

const router = Router();

router.use(authenticator);

router.post("/:id", createTransaction);

router.use(authorizer(["ADMINISTRATOR", "SUPPORT"]));

router.get("/", index);
router.get("/:id", show);

export default router;