import { useState, type FormEvent } from 'react';
import { useAuthStore } from '../../stores/authStore';

type AuthTab = 'login' | 'register';

export default function LoginForm() {
  const [tab, setTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuthStore();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!email || !password) {
      setMessage({ type: 'error', text: 'Rellena todos los campos' });
      return;
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres' });
      return;
    }

    setSubmitting(true);
    try {
      if (tab === 'login') {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setMessage({ type: 'error', text: error });
        } else {
          window.location.href = '/app';
          return;
        }
      } else {
        if (!nombre.trim()) {
          setMessage({ type: 'error', text: 'Introduce tu nombre' });
          setSubmitting(false);
          return;
        }
        const { error, needsConfirmation } = await signUpWithEmail(email, password, nombre);
        if (error) {
          setMessage({ type: 'error', text: error });
        } else if (needsConfirmation) {
          setMessage({ type: 'success', text: '¡Registro exitoso! Revisa tu email para confirmar tu cuenta.' });
        } else {
          window.location.href = '/app';
          return;
        }
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setMessage(null);
    await signInWithGoogle();
  }

  return (
    <div className="animate-fade-in">
      {/* Tab selector */}
      <div className="flex rounded-xl p-1 mb-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={() => { setTab('login'); setMessage(null); }}
          className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
            tab === 'login'
              ? 'text-white shadow-lg'
              : 'text-[#AAA37B] hover:text-white'
          }`}
          style={tab === 'login' ? { background: 'rgba(143,61,56,0.15)', border: '1px solid rgba(143,61,56,0.3)' } : {}}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => { setTab('register'); setMessage(null); }}
          className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
            tab === 'register'
              ? 'text-white shadow-lg'
              : 'text-[#AAA37B] hover:text-white'
          }`}
          style={tab === 'register' ? { background: 'rgba(143,61,56,0.15)', border: '1px solid rgba(143,61,56,0.3)' } : {}}
        >
          Registrarse
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl border text-sm ${
          message.type === 'error'
            ? 'bg-red-500/10 border-red-500/20 text-red-400'
            : 'bg-green-500/10 border-green-500/20 text-green-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {tab === 'register' && (
          <div>
            <label className="block text-sm text-[#AAA37B] mb-2">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Tu nombre de aventurero"
              className="dymes-input"
            />
          </div>
        )}

        <div>
          <label className="block text-sm text-[#AAA37B] mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="aventurero@dungeon.com"
            className="dymes-input"
          />
        </div>

        <div>
          <label className="block text-sm text-[#AAA37B] mb-2">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••"
              className="dymes-input pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#807953] hover:text-[#AAA37B] transition-colors"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full btn-gold py-3.5 rounded-xl text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          ) : null}
          {tab === 'login' ? 'Entrar' : 'Crear cuenta'}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-white/6"></div>
        <span className="text-xs text-[#807953]">o continúa con</span>
        <div className="flex-1 h-px bg-white/6"></div>
      </div>

      {/* Google */}
      <button
        onClick={handleGoogle}
        disabled={submitting}
        className="w-full btn-ghost py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
      >
        <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Google
      </button>

      {/* Skip — removed: login is required */}
      <div className="mt-8 text-center">
        <a href="/" className="text-xs text-[#807953] hover:text-[#AAA37B] transition-colors inline-flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
