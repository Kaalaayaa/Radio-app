import express from 'express';
const router = express.Router();

router.post("/register", async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    return res.status(400).send("That user already exists!");
  } else {
      try {
        const user = await User.register(req.body);
        res.json({
          _id: user.id,
          email: user.email,
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Check inputs" });
      }

  }
});

export default router;