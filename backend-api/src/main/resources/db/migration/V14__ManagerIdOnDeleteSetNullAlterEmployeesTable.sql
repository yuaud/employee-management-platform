-- drop old constraint --
ALTER TABLE employees
DROP CONSTRAINT IF EXISTS fk_employees_manager;

-- add new constraint with on delete set null --
ALTER TABLE employees
ADD CONSTRAINT fk_employees_manager
FOREIGN KEY (manager_id)
REFERENCES employees (employee_id)
ON DELETE SET NULL;