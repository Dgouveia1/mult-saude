import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-brand-light via-white to-brand-blue/5 pt-32 pb-20 lg:pt-48 lg:pb-32"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-brand-blue/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600">Famílias atendidas e satisfeitas</span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-2 text-sm font-semibold text-brand-orange mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange"></span>
              </span>
              Saúde de qualidade para todos
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-brand-dark sm:text-6xl lg:text-7xl mb-6 text-balance leading-[1.1]">
              Saúde de qualidade <br className="hidden lg:block"/><span className="text-brand-orange">sem pesar no bolso.</span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed text-balance">
              Consultas, exames e medicamentos com custo acessível todo mês. 
              Da nossa família para a sua.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="https://wa.me/5517996135859"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#20bd5a] hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <PhoneCall className="h-5 w-5 animate-pulse" />
                Falar com Especialista
              </a>
              <a
                href="#planos"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:shadow-md transition-all active:scale-95"
              >
                Ver planos
                <ArrowRight className="h-5 w-5 text-slate-400" />
              </a>
            </div>

            <ul className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-medium text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                Sem burocracia
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                Atendimento rápido
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-brand-blue" />
                Rede credenciada
              </li>
            </ul>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto w-full max-w-lg"
          >
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5">
              <img
                src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Família feliz e saudável"
                className="absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-brand-dark/0 to-transparent" />
              
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-8 right-8 rounded-2xl bg-white/95 backdrop-blur-sm p-6 shadow-xl ring-1 ring-slate-900/5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10">
                    <span className="text-2xl font-bold text-brand-orange">R$</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Consultas a partir de</p>
                    <p className="text-2xl font-bold text-brand-dark">R$ 50,00</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Dots */}
            <div className="absolute -right-8 -top-8 h-32 w-32 bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:16px_16px] opacity-50" />
            <div className="absolute -left-8 -bottom-8 h-32 w-32 bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:16px_16px] opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
