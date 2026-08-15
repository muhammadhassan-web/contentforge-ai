import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FREE_TIER_LIMIT } from "@/lib/stripe";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  const plan = profile?.plan ?? "free";

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("generations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", startOfMonth.toISOString());

  const { data: recent } = await supabase
    .from("generations")
    .select("id, topic, platform, tone, output, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <DashboardClient
      email={user.email ?? ""}
      plan={plan}
      usedThisMonth={count ?? 0}
      limit={FREE_TIER_LIMIT}
      recent={recent ?? []}
    />
  );
}
