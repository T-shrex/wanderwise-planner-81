const Itinerary = require("../models/Itinerary");

exports.list = async (req, res) => {
  const items = await Itinerary.find({ user: req.user.id }).sort({ updatedAt: -1 });
  res.json(items);
};

exports.create = async (req, res) => {
  const payload = { ...req.body, user: req.user.id };
  const item = await Itinerary.create(payload);
  res.status(201).json(item);
};

exports.getOne = async (req, res) => {
  const item = await Itinerary.findOne({ _id: req.params.id, user: req.user.id });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

exports.update = async (req, res) => {
  const item = await Itinerary.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

exports.remove = async (req, res) => {
  const item = await Itinerary.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json({ success: true });
};

