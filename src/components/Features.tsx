import { motion } from "motion/react";
import { Stethoscope, Pill, Activity, Smile, BrainCircuit, MessageCircle } from "lucide-react";

const features = [
  {
    name: "Consultas Médicas",
    description: "Atendimento presencial com especialistas a partir de R$ 50,00. Clínico geral, pediatria, ginecologia e mais.",
    icon: Stethoscope,
    color: "bg-brand-orange/10 text-brand-orange",
  },
  {
    name: "Clínica Odontológica",
    description: "Tratamentos odontológicos completos com profissionais qualificados e condições especiais para associados.",
    icon: Smile,
    color: "bg-brand-blue/10 text-brand-blue",
  },
  {
    name: "Psicologia",
    description: "Cuidar da mente é fundamental. Oferecemos atendimento psicológico humanizado com valores acessíveis.",
    icon: BrainCircuit,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    name: "Exames Laboratoriais",
    description: "Realize seus exames de sangue, imagem e check-ups anuais com descontos exclusivos.",
    icon: Activity,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    name: "Descontos em Farmácias",
    description: "Economize na compra de medicamentos em milhares de farmácias parceiras em todo o país.",
    icon: Pill,
    color: "bg-rose-500/10 text-rose-600",
  },
];

export function Features() {
  return (
    <section id="beneficios" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-orange">
            O Maior Cartão de Descontos
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Tudo o que você precisa para cuidar da sua saúde
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Com o Dr. Bim Benefícios, você tem acesso a uma rede completa de saúde,
            educação e lazer com preços que cabem no seu bolso.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col group rounded-2xl p-6 transition-all duration-300 hover:bg-slate-50 hover:shadow-md hover:ring-1 hover:ring-slate-100"
              >
                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-brand-dark">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>

          {/* Mid-page CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 sm:mt-24 flex justify-center"
          >
            <a
              href="https://wa.me/5517996135859"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#20bd5a] hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              Falar com um Consultor
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
