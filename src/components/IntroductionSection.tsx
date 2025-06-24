
import { useTranslation } from '@/hooks/useTranslation';

const IntroductionSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="section-padding bg-mist">
      <div className="container-luxury">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8 animate-fade-in font-playfair text-primary">
            {t('intro.title')}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-slate2 font-app animate-fade-in">
            {t('intro.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
