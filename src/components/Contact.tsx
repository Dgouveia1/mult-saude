import { motion } from "motion/react";
import { MapPin, Phone, Mail, Star, Quote } from "lucide-react";

const reviews = [
  {
    author: "Débora Amazonas Franciscon",
    time: "4 meses atrás",
    text: "Fui muito bem atendida, desde a minha chegada na clínica. A consulta foi muito boa, o que me deixou bem satisfeita. Aprovado!👍",
    rating: 5,
  },
  {
    author: "Lauriene Bortolotti",
    time: "3 semanas atrás",
    text: "Tive consulta odontológica com a Dra. Aline… maravilhosa, muito atenciosa! Equipe muito gentil e ágil!",
    rating: 5,
  },
  {
    author: "Cristiane Oliveira",
    time: "um mês atrás",
    text: "Fui muito bem atendida pela equipe da multsaude o médico muito atencioso parabéns a todos estou feliz em ter conhecido a multsaude",
    rating: 5,
  },
  {
    author: "Marli Laskosky",
    time: "3 meses atrás",
    text: "Atendimento Humanizado! Fui muito bem acolhida e fiquei muito feliz com os resultados. Parabéns a toda Equipe da Multi Saúde!",
    rating: 5,
  },
  {
    author: "Sueli Carvalho",
    time: "4 meses atrás",
    text: "Gostei muito. Os funcionários são muito atenciosos e o médico Avenor Bom é um poço de simpatia.",
    rating: 5,
  },
  {
    author: "Coisas de Cinara",
    time: "6 meses atrás",
    text: "Excelente Clínica, Atendimento e Profissionais Extremamente Qualificados! O valor pequenino que cabe em qualquer bolso!! Sem contar que agora também tem a parte odontológica! Super indico!!👏🏼🤩",
    rating: 5,
  }
];

export function Contact() {
  return (
    <section id="contato" className="relative isolate bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Onde Estamos & Avaliações
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Venha nos visitar ou entre em contato. Veja também o que nossos pacientes dizem sobre nós.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            <div className="rounded-3xl bg-brand-light p-10 ring-1 ring-slate-200">
              <h3 className="text-base font-semibold leading-7 text-brand-dark mb-8">
                Informações de Contato
              </h3>
              <dl className="space-y-8 text-base leading-7 text-slate-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Endereço</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/10">
                      <MapPin className="h-6 w-6 text-brand-orange" aria-hidden="true" />
                    </div>
                  </dt>
                  <dd>
                    Av. Amadeu Bizelli, 1315<br />
                    Centro, Fernandópolis - SP<br />
                    15600-019, Brasil
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telefone</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                      <Phone className="h-6 w-6 text-brand-blue" aria-hidden="true" />
                    </div>
                  </dt>
                  <dd>
                    <a className="hover:text-brand-dark" href="tel:+5517996135859">
                      (17) 99613-5859
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                      <Mail className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                    </div>
                  </dt>
                  <dd>
                    <a className="hover:text-brand-dark" href="mailto:bimclinica@gmail.com">
                      bimclinica@gmail.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl overflow-hidden h-80 ring-1 ring-slate-200 shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.254199049454!2d-50.2486886!3d-20.2854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9498270000000001%3A0x0!2sAv.%20Amadeu%20Bizelli%2C%201315%20-%20Centro%2C%20Fernand%C3%B3polis%20-%20SP%2C%2015600-019!5e0!3m2!1spt-BR!2sbr!4v1610000000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                <span className="text-4xl font-bold text-brand-dark">4,8</span>
                <div className="flex flex-col">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-slate-500">41 avaliações no Google</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 overflow-y-auto pr-2 max-h-[700px] custom-scrollbar">
              {reviews.map((review, idx) => (
                <div key={idx} className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold text-lg">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-brand-dark">{review.author}</h4>
                        <p className="text-xs text-slate-500">{review.time}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 italic relative">
                    <Quote className="h-4 w-4 absolute -left-2 -top-2 text-slate-200 rotate-180" />
                    <span className="pl-4">{review.text}</span>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
