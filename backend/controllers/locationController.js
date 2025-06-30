const Location = require('../models/Location');

exports.getAllLocations = async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
};

exports.getLocationById = async (req, res) => {
  const location = await Location.findById(req.params.id);
  res.json(location);
};

exports.createLocation = async (req, res) => {
  const newLocation = new Location(req.body);
  await newLocation.save();
  res.status(201).json(newLocation);
};

exports.updateLocation = async (req, res) => {
  const updated = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteLocation = async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
