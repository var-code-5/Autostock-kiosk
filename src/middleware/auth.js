import { supabase } from '../config/supabase.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (roles) => {
  return async (req, res, next) => {
    try {
      const { data: { role }, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', req.user.id)
        .single();

      if (error || !roles.includes(role)) {
        return res.status(403).json({ error: 'Unauthorized' });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};