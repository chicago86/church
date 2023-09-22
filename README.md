# Introduction

This document describes how to setup a complete Placyy environment

# Install Postgres on EC2

1. Launch EC2 instance (Ubuntu 22, AMD, 15Gb of disk space) 
   1. Add Postgres and SSH inbound rules in EC2 Security Group
   2. Add internet gateway to the VPC
   3. Add route 0.0.0.0/0	igw-xxx in the VPC subnet route table
2. Install postgres https://ubuntu.com/server/docs/databases-postgresql 
3. Set in /etc/postgresql/10/main/pg_hba.conf
   host    all             all             0.0.0.0/0               md5
4. Edit /etc/postgresql/10/main/postgresql.conf
   1. listen_addresses = '*' in 
   2. default_text_search_config='public.english'
5. Restart `sudo systemctl restart postgresql.service`
6. Connect into postgres template1 db `sudo -u postgres psql template1`
7. Set password for user "postgres" `ALTER USER postgres PASSWORD 'pgPass12345';`
7. Create user zulip `CREATE USER zulip WITH ENCRYPTED PASSWORD 'pgPass12345' CREATEDB;`
8. Create user hasura `CREATE USER hasura WITH ENCRYPTED PASSWORD 'pgPass12345';`
9. Install PostGIS `sudo apt install postgis postgresql-14-postgis-3`
10. Use db_link to copy data from an existing database

--create extension dblink;
truncate table staging.vacancy;
insert into staging.vacancy
select *
from dblink('hostaddr=35.177.169.15 dbname=vadb04 user=postgres password=pgPass12345',
            'SELECT organisation_description, job_description, organisation_name, ou_display_name, job_title, contact_person, telephone_1, email_address, twitter_handle, other_contact, organisation_website_url, latitude, longitude, start_date, end_date, hello_message FROM staging.vacancy;')
       as t1 (
				organisation_description character varying,
				job_description character varying,
				organisation_name character varying(160),
				ou_display_name character varying(160),
				job_title character varying(160),
				contact_person character varying(160),
				telephone_1 character varying(50),
				email_address character varying(100),
				twitter_handle character varying(15),
				other_contact character varying(100),
				organisation_website_url character varying(200),
				latitude character varying(50),
				longitude character varying(50),
				start_date date,
				end_date date,
				hello_message character varying
			);


https://www.postgresql.org/docs/current/client-authentication-problems.html

10. Apply migrations and metadata as above

# Enable streaming replication

1. Configure Postgres on the Ubuntu server 1 (master)
sudo -u postgres createuser --replication -P -e replicator

sudo sed -i "/listen_addresses/s/^#//g" /etc/postgresql/14/main/postgresql.conf #uncomment a line
sudo sed -i "s/listen_addresses.*/listen_addresses='*'/" /etc/postgresql/14/main/postgresql.conf

sudo sed -i "/wal_level/s/^#//g" /etc/postgresql/14/main/postgresql.conf #uncomment a line
sudo sed -i "s/wal_level.*/wal_level=replica/" /etc/postgresql/14/main/postgresql.conf

echo "host replication replicator ec2-18-192-58-92.eu-central-1.compute.amazonaws.com scram-sha-256" >> /etc/postgresql/14/main/pg_hba.conf # Repeat for each standby server

sudo systemctl restart postgresql

2. Configure Postgres on the Ubuntu server 2 (hot standby)
sudo systemctl stop postgresql
sudo sed -i "/hot_standby /s/^#//g" /etc/postgresql/14/main/postgresql.conf #uncomment a line
sudo sed -i "s/hot_standby .*/hot_standby=on/" /etc/postgresql/14/main/postgresql.conf

sudo su - postgres # Back up the current state of the main server (run on the standby system):
cp -R /var/lib/postgresql/14/main /var/lib/postgresql/14/main_bak
rm -rf /var/lib/postgresql/14/main/*  # remove all the files in the local data directory
pg_basebackup -h ec2-3-232-98-21.compute-1.amazonaws.com -D /var/lib/postgresql/14/main -U replicator -P -v -R

sudo systemctl start postgresql

Flags for pg_basebackup:
-h: The hostname or IP address of the main server
-D: The data directory
-U: The user to be used in the operation
-P: Turns on progress reporting
-v: Enables verbose mode
-R: Creates a standby.signal file and appends connection settings to postgresql.auto.conf

3. Configure Postgres on the Ubuntu server 3 etc - repeat steps from Ubuntu server 2 above

4. Test the newly configured replication
sudo -u postgres psql -c "select * from pg_stat_replication;" # on the main server
sudo -u postgres createdb test123 # on the main server
sudo -u postgres psql -c "\l" # on the standby server, you should see the "test123" database

# Deploy Hasura And Postgres Containers In Docker

WARNING!
As of the day of writing, docker depends_on setting cannot make docker waiting until the dependent container is fully up and running.
Also Hasura cannot retry migrations because of a bug.
Because of the 2 above, hasura migrations must be applied manually (see points 4 and 5 below).

1. Make sure Docker Desktop is up and running

2. Open project's deploy dir (the directory with docker-compose.yml files) and run:
   docker compose up

3. Wait until images are built, containers run and APPLICATION_DB created. In case if the APPLICATION_DB is not created, create manually in pgAdmin/psql or similar.

4. Connect APPLICATION_DB in Hasura if required.
   Navigate to http://localhost:8080 to open Hasura Console
   Go to Data/Databases and make sure a connection called "default" is listed. If not click Manage/Connect Database. A sample connection string that should work is (amend if required) postgresql://postgres:pgPass!234@postgres:5432/jdb

5. Download a file into the Postgres docker container(linux):
   su -
   apt-get update
   apt-get install curl
   cd /usr/share/postgresql/14/tsearch_data

   > ukrainian.syn #this command will create an empty .syn file
   > curl https://raw.githubusercontent.com/skupriienko/Ukrainian-Stopwords/master/stopwords_ua.txt -o ukrainian.stop
   > curl https://cgit.freedesktop.org/libreoffice/dictionaries/plain/uk_UA/uk_UA.aff -o ukrainian_ispell.affix
   > curl https://cgit.freedesktop.org/libreoffice/dictionaries/plain/uk_UA/uk_UA.dic -o ukrainian_ispell.dict

   > english.syn #this command will create an empty .syn file
   > curl https://cgit.freedesktop.org/libreoffice/dictionaries/plain/en/en_GB.aff -o english_ispell.affix
   > curl https://cgit.freedesktop.org/libreoffice/dictionaries/plain/en/en_GB.dic -o english_ispell.dict
   Note: english.stop is already shipped with postgres.



6. Apply migrations and metadata:
   Open bash on the hasura container or in cmd
   a) docker ps to get a CONTAINER_ID
   b) docker exec -u root -t -i CONTAINER_ID /bin/bash

   Apply
   cd /migrations_metadata && hasura-cli migrate apply --database-name jdb

   Alternatively you can apply migrations remotely from any workstation with hasura cli installed, see 8.1 below.

7. In pgAdmin check _postgis_\* function are added under APPLICATION_DB/Schemas/public/Functions and base tables are created under APPLICATION_DB/Schemas/base/Tables

# Useful notes 

   1. hasura-cli command line args (see more on migrations and metadata below):
      `hasura migrate apply --database-name="APPLICATION_DB" --admin-secret="YOUR_ADMIN_SECRET" --endpoint="YOUR_ENDPOINT_URL"`
      `hasura metadata export --admin-secret="YOUR_ADMIN_SECRET" --endpoint="YOUR_ENDPOINT_URL"`

   2. Clean up docker after making changes in docker-compose.yml or Dockerfile
      `docker compose -f docker-compose.yml down --volumes`
      `docker system prune -a`
      `docker builder prune -a`

   3. Update root project's submodule references
      `git submodule update --recursive --remote`

   4. Export data from Postgres into a file
      `"C:\Program Files\PostgreSQL\14\bin\psql" -c "select \* from base.vacancy_staging where job_description=\'vacancy8931947\'" > c:\temp\export.csv postgresql://postgres:pgPass!234@192.168.1.68:5432/jdb`

# Apply migrations and metadata

1. Set .env values as per your configuration
2. Apply migrations
   1. Rename folder called "default" to your database name as per .env
   2. Delete either the ukrainian or english full-text search configuration script called "...app_configure_full_text_search_ukrainian/english".
   3. Run the command below. Make sure migrations are executed, if not then select a new unique name for your database.
      `hasura migrate apply --endpoint "https://v16.hasura.app/" --admin-secret "sZGqxwL40Q2U73fHauF4yYKoEjEIeaBEcwkmUkdGdMygEJ6CSsB7tYe08IJG6bjC" --all-databases`

3. Apply metadata
   1. Open ...deploy\hasura\metadata folder
   2. Edit src/replace_metadata.jsonnet, set database name and server IP address
   3. npm run replace_metadata

   Alternatively one can import the generated above file in Hasura console Settings>Import Metadata menu or using Hasura CLI  
   `hasura metadata --envfile ".env" apply --endpoint "https://desired-termite-79.hasura.app" --admin-secret "zGoJ0U5K9uQBdqwk2oSsGPjfwaQZscvWGRP5ineRsmK3cX2t06v12dXy0CzyLP7R"`  

# Install Zulip - single-server deployment

Zulip should be available over HTTPS and on public IP so that Lambda can automatically create new zulip users through Zulip API

1. Launch EC2 instance
2. Add HTTP/HTTPS inbound rules in EC2 Security Group. Only the SSH inbound rule is added automatically.
3. Create a new DNS record in Office 365 admin.
4. Putty into the server using auth key issued in step 1.
5. Run zulip installer with --certbot option https://zulip.readthedocs.io/en/latest/production/install.html
6. Run the command below to allow Zulip admin (e.g. jadmin@arvosoftware.com) to create a new user account via the API. NOTE: in case of single Zulip organisation realm should be empty string
   sudo -u zulip /home/zulip/deployments/current/manage.py change_user_role --realm= va@arvosoftware.com can_create_users
7. If required configure outgoing emails by running
   sudo nano /etc/zulip/settings.py
   sudo nano /etc/zulip/zulip-secrets.conf
8. To delete a user:
   1. cd /home/zulip/deployments/current
   2. sudo -u zulip ./manage.py shell
   3. UserProfile.objects.get(email="aaaaaa3@aaaaaa.ie").delete()
   4. Clean up zulip cache for example reboot zulip server.
   5. More info here https://zulip.readthedocs.io/en/latest/production/management-commands.html

# Install Zulip - dual-server deployment

NOTE: This procedure can be used to install any number of zulip webservers connected to the same postgres DB.
TODO try installing 2 zulip webservers connected to the same DB to see if there are any issues with that setup

Database server setup:

1. Install Postgres and create 'zulip' user, database, and schema on the db server.
This also works on a postgres HA cluster with master and stand by postgres servers.
CREATE USER zulip WITH ENCRYPTED PASSWORD 'zulipPass_12345' CREATEDB;
CREATE DATABASE zulip OWNER=zulip ENCODING=UTF8 LC_COLLATE='C.UTF-8' LC_CTYPE='C.UTF-8' TEMPLATE=template0;
CREATE SCHEMA IF NOT EXISTS zulip AUTHORIZATION zulip;

2. Create full text search dictionaries for zulip.
> en_us.syn #this command will create an empty .syn file
curl https://cgit.freedesktop.org/libreoffice/dictionaries/plain/en/en_GB.aff -o en_us.affix
curl https://cgit.freedesktop.org/libreoffice/dictionaries/plain/en/en_GB.dic -o en_us.dict
cp english.stop zulip_english.stop


Webserver setup:
TODO: Zulip manual requires the same version of zulip in case of backup/restore from server to server. Keep an installer in a centralised location and download the same copy to each webserver. 2023-05-1 version of zulip 6.1 is kept on VA OneDrive - ARVO Software\backup

1. Run:
sudo cd $(mktemp -d)
curl -fLO https://download.zulip.com/server/zulip-server-latest.tar.gz
tar -xf zulip-server-latest.tar.gz
sudo -s  ./zulip-server-*/scripts/setup/install --certbot  --email=va@arvosoftware.com --hostname=zulip162.arvosoftware.com --no-init-db

2. Edit /etc/zulip/settings.py
REMOTE_POSTGRES_HOST = "dbserver.example.com"
REMOTE_POSTGRES_PORT = "5432"
REMOTE_POSTGRES_SSLMODE = "require"

3. Set postgres_password in /etc/zulip/zulip-secrets.conf

4. Run
su zulip -c '/home/zulip/deployments/current/scripts/setup/initialize-database'
su zulip -c '/home/zulip/deployments/current/manage.py generate_realm_creation_link'


Handy commands:
Backup zulip with no database on the old webserver. Restore on a different machine is supported.
https://zulip.readthedocs.io/en/latest/production/export-and-import.html#backup-details
 
Restore zulip backup on the new webserver
/home/zulip/deployments/current/scripts/setup/restore-backup /path/to/backup

Restart zulip
su zulip -c '/home/zulip/deployments/current/scripts/restart-server'

# How to

- Download graphql schema from hasura. MUST use RELAY endpoint otherwise _connection types are not generated `gq https://xxx.hasura.app/v1beta1/relay  -H "X-Hasura-Admin-Secret: xxx" --introspect > relay_server_schema.graphql`
- [Download graphql schema manual from hasura](https://hasura.io/docs/latest/graphql/core/guides/export-graphql-schema.html)
- [Set up AWS Cognito to work with the Hasura GraphQL engine:](https://hasura.io/docs/1.0/graphql/core/guides/integrations/aws-cognito.html)
- Run chrome with remote debugging "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222)
#   c h u r c h  
 #   c h u r c h  
 