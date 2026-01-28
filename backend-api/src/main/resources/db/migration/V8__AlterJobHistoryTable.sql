ALTER TABLE job_history
DROP CONSTRAINT IF EXISTS fk_jh_department;


ALTER TABLE job_history
DROP COLUMN IF EXISTS department_id;
