import Product from "../models/productsModel.js";
const productFilterInRange = async (month) => {
  const result = await Product.aggregate([
    {
      $redact: {
        $cond: [
          { $eq: [{ $month: "$dateOfSale" }, month] },
          "$$KEEP",
          "$$PRUNE",
        ],
      },
    },

    {
      $group: {
        _id: {
          $cond: [
            { $lt: ["$price", 101] },
            "0-100",
            {
              $cond: [
                { $lt: ["$price", 201] },
                "101-200",
                {
                  $cond: [
                    { $lt: ["$price", 301] },
                    "201-300",
                    {
                      $cond: [
                        { $lt: ["$price", 401] },
                        "301-400",
                        {
                          $cond: [
                            { $lt: ["$price", 501] },
                            "401-500",
                            {
                              $cond: [
                                { $lt: ["$price", 601] },
                                "501-600",
                                {
                                  $cond: [
                                    { $lt: ["$price", 701] },
                                    "601-700",
                                    {
                                      $cond: [
                                        { $lt: ["$price", 801] },
                                        "701-800",
                                        {
                                          $cond: [
                                            { $lt: ["$price", 901] },
                                            "801-900",
                                            "901-above",
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        ranges: {
          $push: {
            range: "$_id",
            count: "$count",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        ranges: {
          $concatArrays: [
            [
              { range: "0-100", count: 0 },
              { range: "101-200", count: 0 },
              { range: "201-300", count: 0 },
              { range: "301-400", count: 0 },
              { range: "401-500", count: 0 },
              { range: "501-600", count: 0 },
              { range: "601-700", count: 0 },
              { range: "701-800", count: 0 },
              { range: "801-900", count: 0 },
              { range: "901-above", count: 0 },
            ],
            "$ranges",
          ],
        },
      },
    },
    {
      $unwind: "$ranges",
    },
    {
      $group: {
        _id: "$ranges.range",
        count: {
          $sum: "$ranges.count",
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return result;
};

const totalSoldNotSoldProduct = async (month) => {
  const result = await Product.aggregate([
    {
      $redact: {
        $cond: [
          { $eq: [{ $month: "$dateOfSale" }, month] },
          "$$KEEP",
          "$$PRUNE",
        ],
      },
    },
    {
      $group: {
        _id: null,
        totalSoldtrueSaleAmount: {
          $sum: {
            $cond: [{ $ne: ["$sold", false] }, "$price", 0],
          },
        },
        //totalSaleAmount: { $sum: "$saleAmount" }, if sold true or false both of the include
        totalSoldItems: {
          $sum: {
            $cond: [{ $ne: ["$sold", false] }, 1, 0], //ne means not equel
          },
        },
        totalNotSoldItems: {
          $sum: {
            $cond: [{ $eq: ["$sold", false] }, 1, 0], //eq means equal
          },
        },
      },
    },
  ]);
  return result;
};

const categoryWiseProduct = async (month) => {
  const result = await Product.aggregate([
    {
      $redact: {
        $cond: [
          { $eq: [{ $month: "$dateOfSale" }, month] },
          "$$KEEP",
          "$$PRUNE",
        ],
      },
    },
    {
      $group: {
        _id: "$category",
        items: {
          $addToSet: "$_id",
        },
      },
    },
    {
      $project: {
        category: "$_id",
        count: {
          $size: "$items",
        },
      },
    },
  ]);
  return result;
};

export { productFilterInRange, totalSoldNotSoldProduct, categoryWiseProduct };
