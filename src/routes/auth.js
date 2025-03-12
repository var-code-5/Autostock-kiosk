import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Signup validation
const signupValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty()
];

// Login validation
const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
];

// Signup endpoint
router.post('/signup', signupValidation, validate, async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    });

    if (error) throw error;

    res.status(201).json({
      message: 'User created successfully',
      user: data.user
    });
  } catch (error) {
    next(error);
  }
});

// Login endpoint
router.post('/login', loginValidation, validate, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    res.json({
      message: 'Login successful',
      session: data.session
    });
  } catch (error) {
    next(error);
  }
});

// Password reset request
router.post('/reset-password', 
  body('email').isEmail().normalizeEmail(),
  validate,
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) throw error;

      res.json({
        message: 'Password reset email sent'
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;