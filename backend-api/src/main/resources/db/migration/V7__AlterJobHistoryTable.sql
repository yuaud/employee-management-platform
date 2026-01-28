ALTER TABLE job_history
    DROP CONSTRAINT pk_job_history;

ALTER TABLE job_history
    ADD COLUMN job_history_id BIGSERIAL;

ALTER TABLE job_history
    ADD CONSTRAINT pk_job_history
    PRIMARY KEY (job_history_id);

