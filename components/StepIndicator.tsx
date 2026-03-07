"use client";

type Step = { id: number; label: string; icon: string };

const STEPS: Step[] = [
    { id: 1, label: "Cart", icon: "🛒" },
    { id: 2, label: "Shipping", icon: "📦" },
    { id: 3, label: "Payment", icon: "💳" },
    { id: 4, label: "Done", icon: "✅" },
];

export default function StepIndicator({ currentStep }: { currentStep: number }) {
    const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

    return (
        <div className="mb-10 animate-fade-up">
            {/* Progress row */}
            <div className="relative flex items-center justify-between mb-5 px-1">
                {/* Track */}
                <div className="absolute left-0 right-0 top-[22px] h-0.5 bg-gray-200 rounded-full" />
                {/* Fill */}
                <div
                    className="absolute left-0 top-[22px] h-0.5 rounded-full transition-all duration-700 ease-out"
                    style={{
                        width: `${progress}%`,
                        background: "linear-gradient(90deg, #16a34a, #4ade80)",
                    }}
                />

                {STEPS.map((step) => {
                    const done = step.id < currentStep;
                    const active = step.id === currentStep;

                    return (
                        <div key={step.id} className="relative flex flex-col items-center gap-2 z-10">
                            <div
                                className={`
                                    w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold
                                    transition-all duration-500 relative border-2
                                    ${active
                                        ? "bg-green-600 border-green-600 text-white shadow-[0_4px_16px_rgba(22,163,74,0.35)]"
                                        : done
                                            ? "bg-green-50 border-green-500 text-green-700"
                                            : "bg-white border-gray-200 text-gray-400"
                                    }
                                `}
                            >
                                {done ? (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8l3.5 3.5L13 4.5" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <span>{step.icon}</span>
                                )}
                                {active && (
                                    <span className="absolute inset-0 rounded-full border-2 border-green-400 pulse-ring" />
                                )}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300
                                ${active ? "text-green-700" : done ? "text-green-600" : "text-gray-400"}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            <p className="text-center text-[11px] text-gray-400">
                Step {currentStep} of {STEPS.length} —{" "}
                <span className="text-gray-500 font-medium">{STEPS[currentStep - 1]?.label}</span>
            </p>
        </div>
    );
}
