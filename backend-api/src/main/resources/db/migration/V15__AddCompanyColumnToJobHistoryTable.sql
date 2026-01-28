ALTER TABLE job_history
    DROP CONSTRAINT IF EXISTS fk_job_history_job;

ALTER TABLE job_history
    DROP COLUMN job_id;

ALTER TABLE job_history
    ADD COLUMN job VARCHAR(200) NOT NULL;

ALTER TABLE job_history
    ADD COLUMN company_name VARCHAR(255);