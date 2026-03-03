import { Apple, Check, EyeOff, Infinity, Star } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { Logo } from '../components/common/Logo'

const features = [
  'Effortlessly spider and map targets to uncover hidden security flaws',
  'Deliver high-quality, validated findings in hours, not weeks.',
  'Generate professional, enterprise-grade security reports automatically.',
]

export function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptedTerms: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      toast.error('Please fill all required fields')
      return
    }
    if (!form.acceptedTerms) {
      toast.error('Accept terms and conditions to continue')
      return
    }
    toast.success('Account created. Redirecting to dashboard...')
    navigate('/dashboard')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#03070f]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_26%,rgba(8,158,144,0.35),transparent_44%),radial-gradient(circle_at_70%_86%,rgba(255,93,58,0.74),transparent_34%),linear-gradient(104deg,#050912_12%,#0b1220_48%,#09343a_75%,#2a1223_100%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:3px_3px]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1450px] flex-col justify-between px-5 py-4 md:flex-row md:items-stretch md:px-[58px] md:py-5">
        <section className="flex flex-col md:w-[56%] md:justify-between md:pb-[66px]">
          <div className="mt-0.5 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <Logo tone="light" />
          </div>

          <div className="mt-16 max-w-[640px] space-y-8 md:mt-0 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4">
              <h1 className="text-[36px] font-semibold leading-[1.15] tracking-[-0.02em] text-white md:text-[60px]">
                Expert level Cybersecurity
                <br />
                in <span className="text-accent">hours</span> not weeks.
              </h1>
              <p className="text-[18px] font-semibold tracking-[-0.01em] text-white">What&apos;s included</p>
            </div>

            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-[15px] leading-[1.35] text-white md:text-[16px]">
                  <Check size={15} className="mt-1 shrink-0 text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 space-y-1.5 pb-6 md:pb-0 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
            <p className="flex items-center gap-1.5 text-[14px] text-white/92">
              <Star size={16} className="fill-accent text-accent" />
              Trustpilot
            </p>
            <p className="text-[35px] font-semibold leading-none text-white">
              Rated 4.5/5.0 <span className="text-[12px] font-medium text-white/70">(100k+ reviews)</span>
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center md:w-[44%] md:justify-end md:pr-[20px]">
          <div className="w-full max-w-[520px] rounded-[14px] bg-[#f8f8f8] p-6 shadow-[0_24px_70px_rgba(2,7,16,0.42)] md:w-[520px] md:p-7 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="mb-5 text-center">
              <h2 className="text-[56px] font-semibold leading-none tracking-[-0.03em] text-[#232323]">Sign up</h2>
              <p className="mt-2.5 text-[17px] text-[#3b3b3b]">
                Already have an account? <button className="font-medium text-[#0baea1]">Log in</button>
              </p>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <Input
                value={form.firstName}
                onChange={(e) => setForm((s) => ({ ...s, firstName: e.target.value }))}
                placeholder="First name*"
                className="[&_input]:h-[52px] [&_input]:rounded-[9px] [&_input]:border-[#d7d9de] [&_input]:bg-[#fafafa] [&_input]:text-[15px] [&_input]:text-[#555]"
              />
              <Input
                value={form.lastName}
                onChange={(e) => setForm((s) => ({ ...s, lastName: e.target.value }))}
                placeholder="Last name*"
                className="[&_input]:h-[52px] [&_input]:rounded-[9px] [&_input]:border-[#d7d9de] [&_input]:bg-[#fafafa] [&_input]:text-[15px] [&_input]:text-[#555]"
              />
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                placeholder="Email address*"
                className="[&_input]:h-[52px] [&_input]:rounded-[9px] [&_input]:border-[#d7d9de] [&_input]:bg-[#fafafa] [&_input]:text-[15px] [&_input]:text-[#555]"
              />
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                placeholder="Password (8+ characters)*"
                icon={EyeOff}
                className="[&_input]:h-[52px] [&_input]:rounded-[9px] [&_input]:border-[#d7d9de] [&_input]:bg-[#fafafa] [&_input]:text-[15px] [&_input]:text-[#555] [&_svg]:text-[#171717]"
              />

              <label className="mt-3 flex items-start gap-2 text-[14px] leading-snug text-[#3d4450]">
                <input
                  type="checkbox"
                  checked={form.acceptedTerms}
                  onChange={(e) => setForm((s) => ({ ...s, acceptedTerms: e.target.checked }))}
                  className="mt-1 h-4 w-4 rounded-sm border border-[#cfd3db] accent-[#0baea1]"
                />
                <span>
                  I agree to Aps&apos;s <span className="font-medium text-[#2f66df]">Terms & Conditions</span> and
                  acknowledge the <span className="font-medium text-[#2f66df]">Privacy Policy</span>
                </span>
              </label>

              <Button
                type="submit"
                variant="primary"
                className="mt-1 h-[50px] w-full rounded-full text-[22px] font-medium shadow-[0_4px_14px_rgba(12,200,168,0.39)] hover:shadow-[0_6px_20px_rgba(12,200,168,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Create account
              </Button>
            </form>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <button className="flex h-[44px] items-center justify-center rounded-full bg-black text-white">
                <Apple size={20} />
              </button>
              <button className="flex h-[44px] items-center justify-center rounded-full bg-[#f2f2f2]">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[conic-gradient(#ea4335_0_25%,#fbbc05_25%_50%,#34a853_50%_75%,#4285f4_75%_100%)] text-xs font-bold text-white">
                  G
                </span>
              </button>
              <button className="flex h-[44px] items-center justify-center rounded-full bg-[#3b65d8] text-base font-semibold text-white">
                <Infinity size={25} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
