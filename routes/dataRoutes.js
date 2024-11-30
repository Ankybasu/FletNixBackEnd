const express = require('express');
const DataModel = require('../models/dataModel');

const router = express.Router();

// Middleware to restrict R-rated content
const restrictR = (req, res, next) => {
  const userAge = req.query.age;
  if (!userAge) return res.status(400).send('User age is required');
  if (parseInt(userAge) < 18) req.restricted = true;
  next();
};

router.get('/', restrictR, async (req, res) => {
  try {
    // Extract query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;
    const { type } = req.query; // type can be 'movie' or 'tv'

    // Default filter for restricted users (excludes 'R' rated items)
    const filter = req.restricted ? { rating: { $ne: 'R' } } : {};

    // Apply the type filter if provided
    if (type) filter.type = type; // 'movie' or 'tv'

    const aggData = [
      // Match the filters (restrict rating, type, etc.)
      { $match: filter },

      {
        $addFields: {
          createdDate: {
            $dateFromString: {
              dateString: { $trim: { input: "$date_added" } }, 
              format: "%B %d, %Y", // "September 25, 2021"
            }
          }
        }
      },

      // Sort by the parsed 'createdAt' date in descending order (latest first)
      { $sort: { createdDate: -1 } },

      // Pagination stage (skip and limit)
      { $skip: skip },
      { $limit: limit },
    ];

    const filteredData = await DataModel.aggregate(aggData);

    // Get the total count of filtered data for pagination (without pagination applied)
    const totalCount = await DataModel.countDocuments(filter);

    // Send the response with data and pagination details
    res.json({
      data: filteredData,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});

// Search Route
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).send('Search query is required');

    const results = await DataModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { director: { $regex: query, $options: 'i' } },
      ],
    });

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error performing search');
  }
});

// Detail Page Route
router.get('/:show_id', async (req, res) => {
  try {
    const { show_id } = req.params;
    const item = await DataModel.findOne({ show_id });

    if (!item) return res.status(404).send('Item not found');
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving item details');
  }
});

module.exports = router;
