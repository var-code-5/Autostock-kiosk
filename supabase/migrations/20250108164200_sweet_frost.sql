/*
  # Add remaining books
  
  1. New Data
    - 30 additional books with varied titles, authors, and prices
    - Maintains realistic Indian educational context
    - Includes books across different subjects and exam categories
*/

INSERT INTO books (title, author, price, stock, description, created_at, updated_at)
VALUES
  ('UPSC Geography Optional', 'Dr. Majid Husain', 899.99, 65, 'Comprehensive geography guide for UPSC optional paper', NOW() - INTERVAL '50 days', NOW() - INTERVAL '20 days'),
  ('Indian Polity', 'M. Laxmikanth', 799.99, 120, 'Detailed coverage of Indian political system and constitution', NOW() - INTERVAL '48 days', NOW() - INTERVAL '18 days'),
  ('Indian Economy', 'Ramesh Singh', 699.99, 100, 'Complete guide to Indian economy for competitive exams', NOW() - INTERVAL '46 days', NOW() - INTERVAL '16 days'),
  ('Science & Technology', 'Spectrum Publications', 599.99, 85, 'Current developments in science and technology', NOW() - INTERVAL '44 days', NOW() - INTERVAL '14 days'),
  ('Environmental Studies', 'Shankar IAS', 849.99, 75, 'Environmental science and ecology for UPSC', NOW() - INTERVAL '42 days', NOW() - INTERVAL '12 days'),
  ('Ancient India', 'R.S. Sharma', 449.99, 95, 'Comprehensive history of ancient India', NOW() - INTERVAL '40 days', NOW() - INTERVAL '10 days'),
  ('Medieval India', 'Satish Chandra', 499.99, 90, 'Complete history of medieval India', NOW() - INTERVAL '38 days', NOW() - INTERVAL '8 days'),
  ('Modern India', 'Bipin Chandra', 549.99, 110, 'Modern Indian history from 1857', NOW() - INTERVAL '36 days', NOW() - INTERVAL '6 days'),
  ('Art & Culture', 'Nitin Singhania', 699.99, 70, 'Indian art, culture and heritage', NOW() - INTERVAL '34 days', NOW() - INTERVAL '4 days'),
  ('Ethics & Integrity', 'Lexicon Publications', 599.99, 80, 'Ethics, integrity and aptitude for civil services', NOW() - INTERVAL '32 days', NOW() - INTERVAL '2 days'),
  ('NCERT Physics Set', 'NCERT', 1299.99, 60, 'Complete set of NCERT physics books', NOW() - INTERVAL '30 days', NOW()),
  ('NCERT Chemistry Set', 'NCERT', 1299.99, 60, 'Complete set of NCERT chemistry books', NOW() - INTERVAL '28 days', NOW()),
  ('NCERT Biology Set', 'NCERT', 1299.99, 60, 'Complete set of NCERT biology books', NOW() - INTERVAL '26 days', NOW()),
  ('NCERT Mathematics Set', 'NCERT', 1299.99, 60, 'Complete set of NCERT mathematics books', NOW() - INTERVAL '24 days', NOW()),
  ('General Knowledge 2024', 'Manohar Pandey', 299.99, 200, 'Updated general knowledge for competitive exams', NOW() - INTERVAL '22 days', NOW()),
  ('Current Affairs 2024', 'Arihant Experts', 199.99, 250, 'Monthly current affairs magazine', NOW() - INTERVAL '20 days', NOW()),
  ('Reasoning Ability', 'BS Sijwalii', 399.99, 150, 'Logical reasoning for competitive exams', NOW() - INTERVAL '18 days', NOW()),
  ('Data Interpretation', 'Arun Sharma', 499.99, 100, 'Data interpretation and analysis', NOW() - INTERVAL '16 days', NOW()),
  ('Verbal Ability', 'Sujit Kumar', 399.99, 120, 'English verbal ability and reading comprehension', NOW() - INTERVAL '14 days', NOW()),
  ('Computer Awareness', 'Arihant Experts', 299.99, 130, 'Basic computer knowledge for bank exams', NOW() - INTERVAL '12 days', NOW()),
  ('Indian Constitution', 'DD Basu', 899.99, 70, 'Detailed analysis of Indian Constitution', NOW() - INTERVAL '10 days', NOW()),
  ('Economics Optional', 'Ramesh Singh', 999.99, 50, 'UPSC economics optional paper guide', NOW() - INTERVAL '8 days', NOW()),
  ('Public Administration', 'Lakshmikanth', 849.99, 60, 'Optional subject guide for UPSC', NOW() - INTERVAL '6 days', NOW()),
  ('Sociology Optional', 'CSEC Publications', 799.99, 55, 'Sociology optional paper complete guide', NOW() - INTERVAL '4 days', NOW()),
  ('Psychology Optional', 'Baron & Byrne', 899.99, 45, 'Psychology optional paper study material', NOW() - INTERVAL '2 days', NOW()),
  ('Literature Optional', 'Krishna Publications', 749.99, 40, 'English literature optional paper guide', NOW() - INTERVAL '1 day', NOW()),
  ('Geography Optional', 'GC Leong', 849.99, 50, 'Geography optional paper complete material', NOW(), NOW()),
  ('History Optional', 'Bipan Chandra', 999.99, 45, 'History optional paper comprehensive guide', NOW(), NOW()),
  ('Philosophy Optional', 'Lexicon Publications', 799.99, 35, 'Philosophy optional paper study material', NOW(), NOW()),
  ('Political Science', 'IGNOU Materials', 849.99, 40, 'Political science optional paper guide', NOW(), NOW());