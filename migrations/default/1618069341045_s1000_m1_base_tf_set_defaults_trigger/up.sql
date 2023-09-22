-- Trigger functions can take arguments, but the functions themselves cannot have declared parameters.
CREATE OR REPLACE FUNCTION base.tf_set_defaults() returns TRIGGER
AS $$
DECLARE
  v_columns JSONB;

BEGIN
  v_columns = to_jsonb(NEW);

  -- Various tables have different names for the same field, address the differences here.
  IF v_columns ? 'created_date' THEN
    -- Never update created_date 
    NEW.created_date := COALESCE(OLD.created_date, NOW()::timestamp);
  END IF;
  IF v_columns ? 'created_at' THEN
    -- Never update created_date 
    NEW.created_at := COALESCE(OLD.created_at, NOW()::timestamp);
  END IF;


  -- Auto-assign modified_date for both insert and update.
  IF v_columns ? 'modified_date' THEN
    NEW.modified_date = NOW()::timestamp;
  END IF;
  IF v_columns ? 'modified_at' THEN
    NEW.modified_at = NOW()::timestamp;
  END IF;

  -- -- modified_by is required in case of update.
  -- IF (TG_OP = 'UPDATE' AND NEW.modified_by IS NULL) THEN
  --   RAISE EXCEPTION 'Please provide modified_by.';
  -- END IF;
  
  RETURN NEW;
END $$ LANGUAGE plpgsql;