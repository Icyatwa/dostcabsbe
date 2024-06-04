
// busController.js
const Bus = require('../models/busModel')
const mongoose = require('mongoose')

const getBuses = async (req, res) => {
  const { user_id } = req.params;
  try {
    const buses = await Bus.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(buses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find().sort({ createdAt: -1 });
    res.status(200).json(buses);
  } catch (error) {
    console.error('Error fetching buses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBus = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such bus'})
  }
  const bus = await Bus.findById(id)
  if (!bus) {
    return res.status(404).json({error: 'No such bus'})
  }
  res.status(200).json(bus)
}

const createBus = async (req, res) => {
  const { user_id, driver, licensePlates, model, capacity } = req.body;

  try {
    const bus = await Bus.create({
      user_id,
      driver,
      licensePlates,
      model,
      capacity
    });
    res.status(200).json(bus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTotalBuses = async (req, res) => {
  try {
    const count = await Bus.countDocuments();
    res.status(200).json({ total: count });
  } catch (error) {
    console.error('Error fetching total buses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
const updateBus = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such bus' });
  }
  try {
    const existingBus = await Bus.findById(id);
    if (!existingBus) {
      return res.status(404).json({ error: 'No such bus' });
    }
    const updatedBus = await Bus.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedBus);
  } catch (error) {
    console.error('Error updating bus:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const deleteBus = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such bus'})
    }
    const bus = await Bus.findOneAndDelete({_id: id})
    if (!bus) {
        return res.status(400).json({error: 'No such bus'})
    }
    res.status(200).json(bus)
}

module.exports = {
    getBuses,
    getAllBuses,
    getBus,
    createBus,
    getTotalBuses,
    deleteBus,
    updateBus,
}