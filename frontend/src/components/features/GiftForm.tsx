import React, { useState } from 'react';
import {
  User,
  Heart,
  DollarSign,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Loader2,
} from 'lucide-react';

interface GiftFormProps {
  onSubmit: (
    age: number,
    budget: number,
    interests: string[],
    gender?: string,
    occasion?: string,
    personality?: string,
    relationship?: string
  ) => void;
  loading: boolean;
}

export default function GiftForm({ onSubmit, loading }: GiftFormProps) {
  const [step, setStep] = useState(1);

  const [age, setAge] = useState('');
  const [budget, setBudget] = useState('');
  const [gender, setGender] = useState('');
  const [relationship, setRelationship] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const allInterests = ['Gaming', 'Technology', 'Music', 'Sports', 'Travel', 'Art'];

  const toggleInterest = (value: string) => {
    setInterests((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : prev.length < 3
        ? [...prev, value]
        : prev
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 4) {
      onSubmit(Number(age), Number(budget), interests, gender, undefined, undefined, relationship);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="
        relative rounded-3xl p-8
        bg-gradient-to-br from-[#0b1020] via-[#0e1328] to-[#0a0f1e]
        border border-white/10 shadow-2xl
      ">
        {/* Progress Bar */}
        <div className="mb-8 h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-pink-500 transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <Sparkles className="mx-auto mb-3 text-fuchsia-400 animate-pulse" />
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            Find the Perfect Gift
          </h2>
          <p className="text-sm text-white/50 mt-1">
            Step {step} of 4
          </p>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <DarkInput
              icon={<User />}
              placeholder="Recipient age"
              value={age}
              onChange={setAge}
            />
            <DarkInput
              icon={<DollarSign />}
              placeholder="Your budget (USD)"
              value={budget}
              onChange={setBudget}
            />
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="grid grid-cols-3 gap-3 animate-fade-in">
            {['Male', 'Female', 'Unisex'].map((g) => (
              <Choice
                key={g}
                active={gender === g}
                onClick={() => setGender(g)}
              >
                {g}
              </Choice>
            ))}
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="grid grid-cols-2 gap-3 animate-fade-in">
            {['Friend', 'Family', 'Partner', 'Colleague'].map((r) => (
              <Choice
                key={r}
                active={relationship === r}
                onClick={() => setRelationship(r)}
              >
                {r}
              </Choice>
            ))}
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="grid grid-cols-2 gap-3 animate-fade-in">
            {allInterests.map((i) => (
              <Choice
                key={i}
                active={interests.includes(i)}
                onClick={() => toggleInterest(i)}
              >
                {i}
              </Choice>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          {step > 1 ? (
            <NavButton onClick={() => setStep(step - 1)}>
              <ChevronLeft className="w-4 h-4" />
              Back
            </NavButton>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <NavButton primary onClick={() => setStep(step + 1)}>
              Next
              <ChevronRight className="w-4 h-4" />
            </NavButton>
          ) : (
            <NavButton primary type="submit">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Get Recommendations'
              )}
            </NavButton>
          )}
        </div>
      </div>
    </form>
  );
}

/* ================= Sub Components ================= */

const DarkInput = ({
  icon,
  value,
  onChange,
  placeholder,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) => (
  <div className="relative">
    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
      {icon}
    </span>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        w-full rounded-2xl px-12 py-4
        bg-white/5 text-white
        placeholder:text-white/40
        border border-white/10
        focus:outline-none
        focus:ring-2 focus:ring-fuchsia-500/40
        transition-all
      "
    />
  </div>
);

const Choice = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      py-4 rounded-2xl font-semibold transition-all
      ${active
        ? 'bg-gradient-to-r from-cyan-400 to-pink-400 text-black shadow-lg'
        : 'bg-white/5 text-white/70 hover:bg-white/10'}
    `}
  >
    {children}
  </button>
);

const NavButton = ({
  children,
  primary,
  ...props
}: {
  children: React.ReactNode;
  primary?: boolean;
  [key: string]: any;
}) => (
  <button
    {...props}
    className={`
      flex items-center gap-2 px-6 py-3 rounded-full font-bold
      transition-all hover:scale-105
      ${primary
        ? 'bg-gradient-to-r from-cyan-400 to-pink-400 text-black'
        : 'text-white/70 hover:text-white'}
    `}
  >
    {children}
  </button>
);
