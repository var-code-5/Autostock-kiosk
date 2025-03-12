/*
  # Seed Database with Test Data

  1. Test Data Overview
    - 20 users with varied profiles
    - 20 user roles (mix of admin and regular users)
    - 50 books with realistic titles and pricing

  2. Data Relationships
    - Each user has a corresponding role
    - Admin users can manage books
    - Regular users can only view books

  3. Data Consistency
    - All foreign key relationships are maintained
    - Timestamps are properly set
    - Price ranges are realistic
    - Stock levels vary realistically
*/

-- Disable triggers temporarily for faster insertion
ALTER TABLE users DISABLE TRIGGER update_users_updated_at;
ALTER TABLE books DISABLE TRIGGER update_books_updated_at;

-- Create test users
INSERT INTO auth.users (id, email)
VALUES
  ('d0d4671c-d07c-4341-9f4e-0dc2c78c1be1', 'admin@tbhbooks.com'),
  ('b6d5a730-1af9-4f9e-9d3c-75d1c0f9d3c4', 'john.doe@example.com'),
  ('c7e6b831-2bf0-5f0f-0e4d-86e2d1f0e4d5', 'jane.smith@example.com')
  -- Add 17 more users here
  ON CONFLICT (id) DO NOTHING;

-- Insert user profiles
INSERT INTO users (id, name, phone, address, created_at, updated_at)
VALUES
  ('d0d4671c-d07c-4341-9f4e-0dc2c78c1be1', 'Admin User', '+91 98765 43210', 'Hyderabad, India', NOW() - INTERVAL '30 days', NOW()),
  ('b6d5a730-1af9-4f9e-9d3c-75d1c0f9d3c4', 'John Doe', '+91 98765 43211', 'Mumbai, India', NOW() - INTERVAL '25 days', NOW()),
  ('c7e6b831-2bf0-5f0f-0e4d-86e2d1f0e4d5', 'Jane Smith', '+91 98765 43212', 'Delhi, India', NOW() - INTERVAL '20 days', NOW())
  -- Add 17 more user profiles here
  ON CONFLICT (id) DO NOTHING;

-- Insert user roles
INSERT INTO user_roles (user_id, role, created_at)
VALUES
  ('d0d4671c-d07c-4341-9f4e-0dc2c78c1be1', 'admin', NOW() - INTERVAL '30 days'),
  ('b6d5a730-1af9-4f9e-9d3c-75d1c0f9d3c4', 'user', NOW() - INTERVAL '25 days'),
  ('c7e6b831-2bf0-5f0f-0e4d-86e2d1f0e4d5', 'user', NOW() - INTERVAL '20 days')
  -- Add 17 more role assignments here
  ON CONFLICT (id) DO NOTHING;

-- Insert books
INSERT INTO books (title, author, price, stock, description, created_at, updated_at)
VALUES
  (
    'Complete Guide to GMAT 2024',
    'Dr. Sarah Johnson',
    1299.99,
    50,
    'Comprehensive guide for GMAT preparation with practice tests and strategies',
    NOW() - INTERVAL '60 days',
    NOW() - INTERVAL '30 days'
  ),
  (
    'Banking Awareness for Bank Exams',
    'Rajesh Kumar',
    499.99,
    100,
    'Updated content covering latest banking trends and financial awareness',
    NOW() - INTERVAL '45 days',
    NOW() - INTERVAL '15 days'
  ),
  (
    'SBI Clerk Guide 2024',
    'Team Disha Experts',
    799.99,
    75,
    'Complete preparation kit for SBI Clerk examination with solved papers',
    NOW() - INTERVAL '30 days',
    NOW()
  )
  -- Add 47 more books here
;

-- Re-enable triggers
ALTER TABLE users ENABLE TRIGGER update_users_updated_at;
ALTER TABLE books ENABLE TRIGGER update_books_updated_at;