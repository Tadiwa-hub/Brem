-- schema.sql

DROP TABLE IF EXISTS brem_availability;
CREATE TABLE brem_availability (
  date TEXT PRIMARY KEY, -- format YYYY-MM-DD
  status TEXT NOT NULL, -- 'available', 'fully_booked', 'on_request'
  note TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS brem_bookings;
CREATE TABLE brem_bookings (
  id TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  stay_type TEXT NOT NULL, -- 'day_rest', 'night_stay'
  preferred_date TEXT NOT NULL,
  num_guests INTEGER NOT NULL,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
