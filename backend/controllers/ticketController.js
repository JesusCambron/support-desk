const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const { isValidObjectId } = require("mongoose");

// @desc Get user ticket
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  //Get user using id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @desc Get user ticket
// @route GET /api/ticket:ticketId
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  const ticketId = req.params.ticketId;
  if (!isValidObjectId(ticketId)) {
    res.status(401);
    throw new Error("Not valid id");
  }
  //Get user using id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
  }
  const ticket = await Ticket.find({
    $and: [
      {
        _id: ticketId,
      },
      { user: user.id },
    ],
  });

  if (!ticket) {
    res.status(401);
    throw new Error("Ticket not found");
  }
  res.status(200).json(ticket);
});

// @desc Create user ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product and description");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
  });

  res.status(201).json({ ticket });
});

// @desc Edit user ticket
// @route PUT /api/tickets
// @access Private
const editTicket = asyncHandler(async (req, res) => {
  const { product, description, status } = req.body;
  const ticketId = req.params.ticketId;

  if (!isValidObjectId(ticketId)) {
    res.status(401);
    throw new Error("Not valid id");
  }
  /* if (!product || !description) {
    res.status(400);
    throw new Error("Please add a product or description fields");
  } */

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findByIdAndUpdate(
    ticketId,
    {
      status,
    },
    { new: true }
  );
  res.status(201).json(ticket);
});

// @desc delete ticket by id
// @route DELETE /api/tickets
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  //Get user using id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  await Ticket.findByIdAndDelete(req.params.ticketId);
  res.status(200).json({ success: true });
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  editTicket,
  deleteTicket,
};
