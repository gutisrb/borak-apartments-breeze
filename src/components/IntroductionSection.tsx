
import { useTranslation } from '@/hooks/useTranslation';

const IntroductionSection = () => {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8 animate-fade-in text-[#0C1930] font-playfair">
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
