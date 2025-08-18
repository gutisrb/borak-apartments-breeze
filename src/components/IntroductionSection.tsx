
import { useTranslation } from '@/hooks/useTranslation';

const IntroductionSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-gradient-to-br from-[hsl(var(--secondary))] to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230C1930' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <div className="container-luxury relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8 animate-fade-in text-[#0C1930] font-playfair text-3xl md:text-4xl lg:text-5xl font-bold">
            {t('intro.title')}
          </h2>
          <p className="text-lg md:text-xl text-[#20425C] leading-relaxed font-app animate-fade-in">
            {t('intro.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
