const { Router } = require("express");
const router = Router();
const { getalltypes } = require("../controllers/types");

router.get("/", getalltypes);

module.exports = router;
