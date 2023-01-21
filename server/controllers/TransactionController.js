import Transaction from "../models/Transaction.js";

export const index = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized, please login" });
  }
  const demo = await Transaction.aggregate([
    {
      $match: { user_id: req.user._id },
    },
    {
      $group: {
        _id: { $month: "$date" },
        transactions: {
          $push: {
            amount: "$amount",
            description: "$description",
            date: "$date",
            type: "$type",
            _id: "$_id",
          },
        },
        totalExpenses: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.json({ data: demo });
};

export const remove = async (req, res) => {
  // console.log(req.params.id);
  await Transaction.deleteOne({ _id: req.params.id });
  // await Transaction.deleteOne({_id: req.params.id})
  res.json({ message: "Transaction Deleted" });
};

export const update = async (req, res) => {
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "Updated Successfully" });
};

export const create = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized, please login" });
  }
  const { amount, description, date, category_id } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
    user_id: req.user._id,
    category_id,
  });
  await transaction.save();
  res.json({ message: "Transaction completed" });
};
