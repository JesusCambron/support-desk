const express = require("express");
const {
  getTickets,
  createTicket,
  getTicket,
  editTicket,
  deleteTicket,
} = require("../controllers/ticketController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const noteRouter = require("./noteRoutes");
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:ticketId")
  .get(protect, getTicket)
  .put(protect, editTicket)
  .delete(protect, deleteTicket);

module.exports = router;
