DROP TABLE IF EXISTS job_history CASCADE;

CREATE TABLE job_history(
    job_history_id BIGSERIAL NOT NULL,
    employee_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    job_id VARCHAR(20) NOT NULL,

    CONSTRAINT pk_job_history
        PRIMARY KEY (job_history_id),

    CONSTRAINT fk_job_history_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees (employee_id),

    CONSTRAINT fk_job_history_job
        FOREIGN KEY (job_id)
        REFERENCES jobs (job_id)
)