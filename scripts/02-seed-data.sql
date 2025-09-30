-- Insert sample event
INSERT INTO events (slug, title, description, date, location, venue, image_url, status)
VALUES (
  'whats-cooking-2025',
  'What''s Cooking 2025',
  'Where Food Fantasy Meets Entertainment - Join us for an unforgettable celebration of Nigerian food culture with unlimited food delights, live music performances, dance-offs, exciting challenges, and amazing giveaways!',
  '2025-12-15 14:00:00+01',
  'Lagos, Nigeria',
  'Eko Convention Centre',
  '/outdoor-music-festival-sunset.png',
  'upcoming'
);

-- Get the event ID
DO $$
DECLARE
  event_uuid UUID;
BEGIN
  SELECT id INTO event_uuid FROM events WHERE slug = 'whats-cooking-2025';
  
  -- Insert ticket types
  INSERT INTO ticket_types (event_id, name, description, price, total_quantity, available_quantity, perks)
  VALUES 
    (
      event_uuid,
      'Elite Pass',
      'Perfect for individuals looking for a great experience',
      2000.00,
      500,
      500,
      ARRAY['General admission', 'Access to food stalls', 'Live entertainment', 'Photo opportunities']
    ),
    (
      event_uuid,
      'Classic Pass',
      'Enhanced experience with premium benefits',
      5000.00,
      300,
      300,
      ARRAY['Priority entry', 'VIP seating area', 'Complimentary welcome drink', 'Access to all food stalls', 'Meet & greet with performers', 'Exclusive merchandise']
    ),
    (
      event_uuid,
      'Luxury Table',
      'Ultimate VIP experience for groups',
      200000.00,
      20,
      20,
      ARRAY['Reserved luxury table (seats 8)', 'Dedicated server', 'Premium food & beverage package', 'Backstage access', 'Professional photography', 'VIP parking', 'Exclusive gift bags']
    );
END $$;
