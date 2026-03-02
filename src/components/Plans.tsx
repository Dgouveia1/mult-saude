import { motion } from "motion/react";
import { Check, MessageCircle } from "lucide-react";

const plans = [
  {
    name: "Bim Individual",
    id: "tier-individual",
    href: "https://wa.me/5517996135859",
    price: "16,00",
    description: "Cobertura completa para uma pessoa com todos os benefícios.",
    features: [
      "Apenas para o titular",
      "Consultas a partir de R$ 50,00",
      "Descontos em exames laboratoriais",
      "Acesso à Clínica Odontológica",
      "Atendimento Psicológico",
      "Descontos em farmácias parceiras",
    ],
    mostPopular: false,
  },
  {
    name: "Bim Familiar",
    id: "tier-familiar",
    href: "https://wa.me/5517996135859",
    price: "25,00",
    description: "A melhor escolha para proteger toda a sua família com tranquilidade.",
    features: [
      "Titular + até 7 dependentes",
      "Consultas a partir de R$ 50,00",
      "Descontos em exames laboratoriais",
      "Acesso à Clínica Odontológica",
      "Atendimento Psicológico",
      "Descontos em farmácias parceiras",
    ],
    mostPopular: true,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Plans() {
  return (
    <section id="planos" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-orange">
            Planos e Preços
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
            Escolha o plano ideal para você
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600">
          Sem surpresas, sem taxas ocultas. Apenas saúde acessível e de qualidade.
        </p>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12 justify-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={classNames(
                plan.mostPopular ? "ring-2 ring-brand-orange scale-105 z-10" : "ring-1 ring-slate-200",
                "rounded-3xl p-8 xl:p-10 bg-white relative flex flex-col justify-between shadow-xl shadow-slate-200/50"
              )}
            >
              {plan.mostPopular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-brand-orange px-4 py-1 text-sm font-semibold text-white shadow-sm">
                  Mais Popular
                </div>
              )}
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={plan.id}
                    className={classNames(
                      plan.mostPopular ? "text-brand-orange" : "text-brand-dark",
                      "text-xl font-semibold leading-8"
                    )}
                  >
                    {plan.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{plan.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-brand-dark">R$ {plan.price}</span>
                  <span className="text-sm font-semibold leading-6 text-slate-600">/mês</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-brand-blue" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-describedby={plan.id}
                className={classNames(
                  plan.mostPopular
                    ? "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#20bd5a] hover:shadow-xl"
                    : "text-brand-dark ring-1 ring-inset ring-slate-200 hover:ring-[#25D366]/50 hover:bg-[#25D366]/5 hover:text-[#25D366]",
                  "mt-8 flex items-center justify-center gap-2 rounded-full py-3 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] transition-all active:scale-95"
                )}
              >
                <MessageCircle className="h-5 w-5" />
                Contratar Agora
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
