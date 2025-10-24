alter table "public"."Poll" add column "ts" TEXT;

alter table "public"."Poll" disable row level security;

alter table "public"."Restaurant" disable row level security;

alter table "public"."Vote" disable row level security;


