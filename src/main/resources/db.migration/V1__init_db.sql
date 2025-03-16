CREATE TYPE gender AS ENUM ('M', 'F', 'O');

CREATE TYPE status AS ENUM ('ACTIVE', 'DISABLED', 'BLOCKED', 'WAITING');

CREATE TYPE role_references AS ENUM ('ADMIN', 'ADMIN_ORGANIZATION', 'ADMIN_COMPANY', 'CLIENT');

CREATE TYPE ability_codes AS ENUM ('ADMIN', 'ORGANIZATIONS', 'COMPANIES', 'USERS', 'ROLES');

CREATE TYPE ability_actions AS ENUM ('READ', 'CREATE', 'UPDATE', 'DELETE');

CREATE TABLE stored_files (
  id SERIAL PRIMARY KEY,
  "uuid" VARCHAR(36) UNIQUE NOT NULL,
  alt VARCHAR NOT NULL,
  original_name VARCHAR(100) NOT NULL,
  stored_name VARCHAR(150) NOT NULL,
  relative_path VARCHAR NOT NULL,
  content_type VARCHAR NOT NULL,
  is_public BOOLEAN DEFAULT false NOT NULL,
  checksum CHAR(32) NOT NULL,
  created_at TIMESTAMP DEFAULT now() NOT NULL
);

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  "name" VARCHAR(100) UNIQUE NOT NULL,
  trade_name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  status status DEFAULT 'ACTIVE' NOT NULL,
  avatar_id INT UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL,
  deleted_at TIMESTAMP
  CONSTRAINT fk_avatar FOREIGN KEY (avatar_id) REFERENCES stored_files(id)
);

CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  "name" VARCHAR(100) UNIQUE NOT NULL,
  trade_name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  status status DEFAULT 'ACTIVE' NOT NULL,
  organization_id INT NOT NULL,
  avatar_id INT UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL,
  deleted_at TIMESTAMP,
  CONSTRAINT fk_organization_company FOREIGN KEY (organization_id) REFERENCES organizations(id)
  CONSTRAINT fk_avatar FOREIGN KEY (avatar_id) REFERENCES stored_files(id)
);


CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  is_default BOOLEAN DEFAULT false NOT NULL,
  reference role_references DEFAULT 'CLIENT' NOT NULL,
  status status DEFAULT 'ACTIVE' NOT NULL,
  organization_id INT,
  company_id INT,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL,
  deleted_at TIMESTAMP,
  CONSTRAINT fk_organization_role FOREIGN KEY (organization_id) REFERENCES organizations(id),
  CONSTRAINT fk_company_role FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE abilities (
  id SERIAL PRIMARY KEY,
  code ability_codes DEFAULT 'USERS' NOT NULL,
  "action" ability_actions DEFAULT 'CREATE' NOT NULL,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL,
  deleted_at TIMESTAMP
);

CREATE TABLE role_abilities (
  role_id INT NOT NULL,
  ability_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  PRIMARY KEY (role_id, ability_id),
  CONSTRAINT fk_role_ability FOREIGN KEY (role_id) REFERENCES roles(id),
  CONSTRAINT fk_ability_role FOREIGN KEY (ability_id) REFERENCES abilities(id)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  "name" VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  "password" VARCHAR(200) NOT NULL,
  gender gender DEFAULT 'M' NOT NULL,
  phone VARCHAR(20) NOT NULL,
  status status DEFAULT 'ACTIVE' NOT NULL,
  role_id INT NOT NULL,
  organization_id INT,
  company_id INT,
  avatar_id INT UNIQUE,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL,
  deleted_at TIMESTAMP,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
  CONSTRAINT fk_organization FOREIGN KEY (organization_id) REFERENCES organizations(id),
  CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES companies(id),
  CONSTRAINT fk_avatar FOREIGN KEY (avatar_id) REFERENCES stored_files(id)
);



