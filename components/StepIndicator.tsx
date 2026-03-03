"use client";

type Step = { id: number; label: string; icon: string };

const STEPS: Step[] = [
    { id: 1, label: "Cart", icon: "🛒" },
    { id: 2, label: "Shipping", icon: "📦" },
    { id: 3, label: "Payment", icon: "💳" },
    { id: 4, label: "Done", icon: "✅" },
];

export default function StepIndicator({ currentStep }: { currentStep: number }) {
    return (
        <div className="flex items-center justify-center gap-0 mb-9 px-4">
            {STEPS.map((step, idx) => {
                const done = step.id < currentStep;
                const active = step.id === currentStep;

                return (
                    <div key={step.id} className="flex items-center flex-1 last:flex-none">
                        {/* Circle + label */}
                        <div className="flex flex-col items-center gap-1.5">
                            <div className={`
                relative w-11 h-11 rounded-full flex items-center justify-center
                text-base font-bold transition-all duration-200
                ${active ? "border-2 border-brand bg-brand/15 text-brand shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                                    : done ? "border-2 border-eco bg-eco/15 text-eco shadow-[0_0_14px_rgba(16,185,129,0.2)]"
                                        : "border-2 border-white/10 bg-white/[0.03] text-slate-600"}
              `}>
                                {done ? "✓" : step.icon}
                                {active && (
                                    <span className="absolute inset-0 rounded-full border-2 border-brand pulse-ring" />
                                )}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? "text-brand" : done ? "text-eco" : "text-slate-600"
                                }`}>
                                {step.label}
                            </span>
                        </div>

                        {/* Connector */}
                        {idx < STEPS.length - 1 && (
                            <div className={`
                flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all duration-500
                ${done ? "bg-gradient-to-r from-eco to-brand" : "bg-white/8"}
              `} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
