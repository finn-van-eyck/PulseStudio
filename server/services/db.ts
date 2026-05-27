import postgres, { Sql } from "postgres";

const DB_URL: string = "postgresql://postgres:PulseStudio123.@db.boqjrpwiprtvrkkzmubp.supabase.co:5432/postgres";
const sql: Sql = postgres(DB_URL);

export default sql;