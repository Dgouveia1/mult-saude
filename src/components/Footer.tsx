import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-dark text-slate-300">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center">
              <span className="text-3xl font-bold tracking-tight text-white">
                Dr.Bim
              </span>
              <span className="text-3xl font-bold tracking-tight text-brand-blue ml-1">
                Benefícios
              </span>
            </div>
            <p className="text-sm leading-6 max-w-xs">
              Saúde de qualidade a preços acessíveis para toda a família. 
              O maior cartão de descontos do Brasil.
            </p>
            <div className="flex space-x-6">
              {/* Social links could go here */}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Navegação</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><a href="#inicio" className="text-sm leading-6 hover:text-brand-orange transition-colors">Início</a></li>
                  <li><a href="#beneficios" className="text-sm leading-6 hover:text-brand-orange transition-colors">Benefícios</a></li>
                  <li><a href="#planos" className="text-sm leading-6 hover:text-brand-orange transition-colors">Planos</a></li>
                  <li><a href="#contato" className="text-sm leading-6 hover:text-brand-orange transition-colors">Contato</a></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Planos</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><a href="#planos" className="text-sm leading-6 hover:text-brand-orange transition-colors">Bim Individual</a></li>
                  <li><a href="#planos" className="text-sm leading-6 hover:text-brand-orange transition-colors">Bim Familiar</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><a href="#" className="text-sm leading-6 hover:text-brand-orange transition-colors">Termos de Uso</a></li>
                  <li><a href="#" className="text-sm leading-6 hover:text-brand-orange transition-colors">Privacidade</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs leading-5 text-slate-400">
            &copy; {new Date().getFullYear()} Dr. Bim Benefícios. Todos os direitos reservados.
          </p>
          <p className="text-xs leading-5 text-slate-400 flex items-center gap-1">
            Feito com <Heart className="h-3 w-3 text-brand-orange" /> para sua saúde
          </p>
        </div>
      </div>
    </footer>
  );
}
