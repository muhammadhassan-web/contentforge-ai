"use client";

import { useState } from "react";
import Link from "next/link";

const PLANS = [
  { id: "free", name: "Free", price: "$0", desc: "5 caption generations per month", href: "/signup", cta: "Start for free" },
  { id: "pro", name: "Pro", price: "$9", suffix: "/mo", desc: "Unlimited caption generations", href: "/signup?plan=pro", cta: "Get Pro" },
] as const;

export function PricingSelector() {
  const [selected, setSelected] = useState<"free" | "pro">("pro");

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {PLANS.map((plan) => {
        const isSelected = selected === plan.id;
        return (
          <button
            key={plan.id}
            type="button"
            onClick={() => setSelected(plan.id)}
            className={`relative flex flex-col rounded-xl border p-6 text-left transition hover:-translate-y-1 ${
              isSelected
                ? "border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-100 ring-1 ring-indigo-500"
                : "border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md"
            }`}
          >
            {plan.id === "pro" && (
              <span className="absolute -top-3 right-6 rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-medium text-white">
                Most popular
              </span>
            )}
            <h3 className="mb-1 font-semibold text-neutral-900">{plan.name}</h3>
            <p className="mb-4 text-3xl font-bold text-neutral-900">
              {plan.price}
              {"suffix" in plan && <span className="text-base font-normal text-neutral-500">{plan.suffix}</span>}
            </p>
            <p className="mb-6 flex-1 text-sm text-neutral-600">{plan.desc}</p>
            <Link
              href={plan.href}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-lg px-4 py-2 text-center text-sm font-medium transition ${
                isSelected
                  ? "bg-indigo-600 text-white hover:bg-indigo-500"
                  : "border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              {plan.cta}
            </Link>
          </button>
        );
      })}
    </div>
  );
}
