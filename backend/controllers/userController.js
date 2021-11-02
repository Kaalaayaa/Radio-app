import express from 'express';
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import userValidators from './validators/userValidators.js';



const router = express.Router();

const secret = process.env.SECRET;


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


router.post('/login',  userValidators, async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {

    res.status(400);
  
    res.json({
        errors: result.errors.map(e => e.msg)
    });

    return;
}

      // no validation errors? yeahhhh!!
      res.send("super cool! 😃");
  }
);


  const user = await User.findOne({
      email: req.body.email,
  })

  if (!user) {
      return {
          status: 'error',
          error: 'Invalid login'
      }
  }

  const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
  )

  if (isPasswordValid) {
      const token = jwt.sign({
              name: user.name,
              email: user.email,
          },
          secret
      )

      return res.json({
          status: 'ok',
          user: token
      })
  } else {
      return res.json({
          status: 'error',
          user: false
      })
  }
  
})






export default router;
