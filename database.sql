CREATE TABLE document_categories (
    dc_id SERIAL PRIMARY KEY,
    dc_name VARCHAR(50)
);

CREATE TABLE documents(
    doc_id SERIAL PRIMARY KEY,
    dc_id INT,
    reg_number INT,
    description VARCHAR(255),
    uploaded_date DATE DEFAULT NOW(),
    doc_path VARCHAR(255),
    CONSTRAINT fk_document_categories
    FOREIGN KEY (dc_id)
    REFERENCES document_categories(dc_id)
    ON DELETE CASCADE,
    CONSTRAINT fk_student
    FOREIGN KEY (reg_number)
    REFERENCES students(reg_number)
    ON DELETE CASCADE

);

CREATE TABLE staffs (
    staff_id SERIAL PRIMARY KEY,
    role_id INT,
    staff_name VARCHAR(50),
    staff_email VARCHAR(50),
    phone VARCHAR(50),
    passcode VARCHAR(50),
    isAdmin BOOLEAN,
    CONSTRAINT fk_role
    FOREIGN KEY (role_id)
    REFERENCES roles(role_id)
    ON DELETE CASCADE 
);

CREATE TABLE academic_year(
    ay_id SERIAL PRIMARY KEY,
    ay_name VARCHAR,
    starting_date DATE,
    ending_date DATE
);

CREATE TABLE roles(
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50)
);

CREATE TABLE students(
    reg_number INT PRIMARY KEY,
    full_name VARCHAR(255),
    student_email VARCHAR(50),
    passcode VARCHAR(50)
);

-- psql --host=ec2-54-157-100-65.compute-1.amazonaws.com --port=5432 --username=cghanjgqtyibex --password --dbname=dfc4k2hnr6216c