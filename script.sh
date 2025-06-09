#!/bin/bash

echo " setting up book_catalog"

#create database
psql -U postgres -h localhost -c "CREATE DATABASE  book_catalog;"   


#Run migrations

psql -U postgres -h localhost -d book_catalog -f src/Database/migration/initial_schema.sql

#CREATE stored procedures 
psql -U postgres -h localhost -d book_catalog -f src/Database/procedures/sp_CREATE_BOOKS.sql
psql -U postgres -h localhost -d book_catalog -f src/Database/procedures/sp_get_all_books.sql
psql -U postgres -h localhost -d book_catalog -f src/Database/procedures/sp_update_books.sql
psql -U postgres -h localhost -d book_catalog -f src/Database/procedures/sp_delete_books.sql







echo "DATABASE SETUP COMPLETE..."

echo "you can now run : npm run start:dev"

-