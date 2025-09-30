-- Function to decrement ticket quantity
CREATE OR REPLACE FUNCTION decrement_ticket_quantity(
  ticket_type_id UUID,
  quantity INTEGER
)
RETURNS VOID AS $$
BEGIN
  UPDATE ticket_types
  SET available_quantity = available_quantity - quantity,
      updated_at = NOW()
  WHERE id = ticket_type_id
    AND available_quantity >= quantity;
    
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Not enough tickets available';
  END IF;
END;
$$ LANGUAGE plpgsql;
