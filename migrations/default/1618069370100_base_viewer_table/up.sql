
DROP TABLE IF EXISTS base.viewer;

CREATE TABLE base.viewer
  (
     viewer_guid     UUID NOT NULL,
     video_clip_guid UUID NOT NULL,
     ipaddr          VARCHAR NOT NULL,--gives place of watching
     status_code     INT NOT NULL,--1 - watching, 2 - stopped, 3 - expired
     feature         JSONB,-- represents a spatially bounded thing, see https://tools.ietf.org/html/rfc7946#section-3.2
     location        GEOMETRY(POINT) GENERATED ALWAYS AS (ST_GeomFromGeoJSON(jsonb_path_query_first(feature, '$.geometry'))) STORED, --included in feature, generated for convenience
     created_at      TIMESTAMP NOT NULL,-- auto-populated by trigger
     modified_at     TIMESTAMP NULL, -- auto-populated when the record is created or modified
     PRIMARY KEY(viewer_guid),
     UNIQUE (viewer_guid)
  ); 

ALTER TABLE base.viewer 
  ADD CONSTRAINT uq__viewer_guid__video_clip_guid UNIQUE (viewer_guid);

ALTER TABLE base.viewer
  ADD CONSTRAINT fk__viewer__video_clip FOREIGN KEY (video_clip_guid) REFERENCES base.video_clip(video_clip_guid);

ALTER TABLE base.viewer
  ALTER COLUMN viewer_guid set DEFAULT md5(random()::text || clock_timestamp()::text)::uuid;

ALTER TABLE base.viewer
  ALTER COLUMN status_code set DEFAULT 1;


-- Auto-assign dates. _01 suffix to ensure correct trigger firing order.
DROP TRIGGER IF EXISTS trig_base_viewer_insert_01 on base.viewer;
CREATE TRIGGER trig_base_viewer_insert_01 BEFORE INSERT
	ON base.viewer FOR EACH ROW 
  EXECUTE PROCEDURE base.tf_set_defaults();

DROP TRIGGER IF EXISTS trig_base_viewer_update_01 on base.viewer;
CREATE TRIGGER trig_base_viewer_update_01 BEFORE UPDATE
	ON base.viewer FOR EACH ROW 
  EXECUTE PROCEDURE base.tf_set_defaults();
