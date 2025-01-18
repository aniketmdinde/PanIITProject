import { Router } from "express";
import { createAgreement, getAgreement, getAllAgreements, updateAgreement } from "../controllers/agreement.controller.js";
import {upload} from '../middlewares/multer.middleware.js'

const router = Router();

router.route("/agreements").post(
    upload.fields([
        {
            name: 'agreement',
            maxCount: 1
        }
    ]),
    createAgreement
)

router.route('/agreements').get(getAgreement);

router.route("/agreements/all").get(getAllAgreements)

router.route("/agreements/:id").put(
    upload.fields([
        {
            name: 'agreement',
            maxCount: 1
        }
    ]),
    updateAgreement
)

export default router;