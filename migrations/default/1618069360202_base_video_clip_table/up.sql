DROP TABLE IF EXISTS base.video_clip;

CREATE TABLE base.video_clip
  (
     video_clip_guid UUID NOT NULL,
     title           VARCHAR NOT NULL,
     langtag         VARCHAR(5) NOT NULL,
     clip_url        VARCHAR NOT NULL,
     created_at      TIMESTAMP NOT NULL,-- auto-populated by trigger
     modified_by     INT NULL,
     modified_at     TIMESTAMP NULL, -- auto-populated when the record is created or modified
     PRIMARY KEY(video_clip_guid),
     UNIQUE (video_clip_guid)
  ); 

ALTER TABLE base.video_clip 
  ADD CONSTRAINT uq__video_clip__video_clip_guid UNIQUE (video_clip_guid);

ALTER TABLE base.video_clip
  ALTER COLUMN video_clip_guid set DEFAULT md5(random()::text || clock_timestamp()::text)::uuid;

-- Auto-assign dates. _01 suffix to ensure correct trigger firing order.
DROP TRIGGER IF EXISTS trig_base_video_clip_insert_01 on base.video_clip;
CREATE TRIGGER trig_base_video_clip_insert_01 BEFORE INSERT
	ON base.video_clip FOR EACH ROW 
  EXECUTE PROCEDURE base.tf_set_defaults();

DROP TRIGGER IF EXISTS trig_base_video_clip_update_01 on base.video_clip;
CREATE TRIGGER trig_base_video_clip_update_01 BEFORE UPDATE
	ON base.video_clip FOR EACH ROW 
  EXECUTE PROCEDURE base.tf_set_defaults();