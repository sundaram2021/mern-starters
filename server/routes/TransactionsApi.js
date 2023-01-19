import { Router } from "express";
import Transaction from "../models/Transaction.js";
import passport from "passport";


const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const transaction = await Transaction.find({}).sort({ createdAt: -1 });
    res.json({ data: transaction });
    //   console.log(transaction);
  }
);

router.post("/", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });
  await transaction.save();
  res.json({ message: "transaction complete" });
});

router.delete("/:id", async (req, res) => {
  // console.log(req.params.id);
  await Transaction.findOneAndDelete({ _id: req.params.id });
  // await Transaction.deleteOne({_id: req.params.id})
  res.json({ message: "Transaction Deleted" });
});

router.patch("/:id", async (req, res) => [
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body }),
  res.json({ message: "Updated Successfully" }),
]);

export default router;
