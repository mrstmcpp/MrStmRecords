module.exports = function pagination(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    try {
      const results = {};
      const totalCount = await model.countDocuments();

      results.totalCount = totalCount;
      results.currentPage = page;
      results.totalPages = Math.ceil(totalCount / limit);

      if (endIndex < totalCount) {
        results.next = { page: page + 1, limit };
      }
      if (startIndex > 0) {
        results.previous = { page: page - 1, limit };
      }

      results.results = await model.find()
      .limit(limit)
      .skip(startIndex)
      .populate("artists" , "stageName" , "_id")
      .populate("genre" , "name" , "_id");
      res.paginatedResults = results;
      next();
    } catch (error) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  };
};
