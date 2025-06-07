// import { DatabaseConfig } from './database.config';
import { SrvRecord } from 'dns';
import{Pool} from 'pg'

export interface DatabaseConfig {
      host: string;
      port:number;
      database:string;
      username:string;
      password:string;
      ssl?:boolean;
}

export const databaseConfig: DatabaseConfig ={
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', ),
      database: process.env.DB_NAME || 'book_catalog',
      username: process.env.DB_USERNAME|| 'postgres',
      password: process.env.DB_PASSWORD || 'post',
      ssl:process.env.DB_env === 'production'
}
export const createDatabbasePool = () :Pool =>{
return new Pool ({
      host:databaseConfig.host,
      port:databaseConfig.port,
      database:databaseConfig.database,
      user:databaseConfig.username,
      password:databaseConfig.password,
      ssl:databaseConfig.ssl?{rejectUnauthorized:false}:false,
      max:20,
      idleTimeoutMillis: 3000
})


}
