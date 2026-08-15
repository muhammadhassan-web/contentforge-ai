import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { openai } from "@/lib/openai";
import { FREE_TIER_LIMIT } from "@/lib/stripe";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { topic, platform, tone } = await request.json();
  if (!topic || typeof topic !== "string" || !topic.trim()) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  const plan = profile?.plan ?? "free";

  if (plan !== "pro") {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from("generations")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", startOfMonth.toISOString());

    if ((count ?? 0) >= FREE_TIER_LIMIT) {
      return NextResponse.json(
        { error: "Free tier limit reached. Upgrade to Pro for unlimited generations." },
        { status: 403 }
      );
    }
  }

  const completion = await openai.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are a social media copywriter. Generate 3 distinct, ready-to-post captions for the given topic, platform, and tone. Each caption should include relevant emoji where natural and 3-5 relevant hashtags at the end. Separate each caption with a line containing only '---'. Do not number them or add extra commentary.",
      },
      {
        role: "user",
        content: `Platform: ${platform}\nTone: ${tone}\nTopic: ${topic}`,
      },
    ],
    temperature: 0.9,
  });

  const output = completion.choices[0]?.message?.content?.trim() ?? "";

  await supabase.from("generations").insert({
    user_id: user.id,
    topic,
    platform,
    tone,
    output,
  });

  return NextResponse.json({ output });
}
