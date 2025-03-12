import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Book validation rules
const bookValidation = [
  body('title').trim().notEmpty(),
  body('author').trim().notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('stock').isInt({ min: 0 }),
  body('description').trim().optional()
];

// Get all books
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('books')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, error, count } = await query
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      books: data,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    next(error);
  }
});

// Get single book
router.get('/:id', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Create book (admin only)
router.post('/',
  authenticate,
  authorize(['admin']),
  bookValidation,
  validate,
  async (req, res, next) => {
    try {
      const { data, error } = await supabase
        .from('books')
        .insert(req.body)
        .select()
        .single();

      if (error) throw error;

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
);

// Update book (admin only)
router.put('/:id',
  authenticate,
  authorize(['admin']),
  bookValidation,
  validate,
  async (req, res, next) => {
    try {
      const { data, error } = await supabase
        .from('books')
        .update(req.body)
        .eq('id', req.params.id)
        .select()
        .single();

      if (error) throw error;
      if (!data) {
        return res.status(404).json({ error: 'Book not found' });
      }

      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

// Delete book (admin only)
router.delete('/:id',
  authenticate,
  authorize(['admin']),
  async (req, res, next) => {
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', req.params.id);

      if (error) throw error;

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export default router;