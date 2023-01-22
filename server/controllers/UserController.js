

export const index = (req, res) => {
    console.log(req.user);
    res.json({ user:  req.user})
}