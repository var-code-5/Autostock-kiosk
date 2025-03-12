import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Get users (admin only)
router.get('/', 
  authenticate, 
  authorize(['admin']), 
  async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const { data, error, count } = await supabase
        .from('users')
        .select('*', { count: 'exact' })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      res.json({
        users: data,
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit)
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get user profile
router.get('/profile', 
  authenticate, 
  async (req, res, next) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', req.user.id)
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

// Update user profile
router.put('/profile',
  authenticate,
  [
    body('name').optional().trim().notEmpty(),
    body('phone').optional().isMobilePhone(),
    body('address').optional().trim()
  ],
  validate,
  async (req, res, next) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(req.body)
        .eq('id', req.user.id)
        .select()
        .single();

      if (error) throw error;

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

export default router;