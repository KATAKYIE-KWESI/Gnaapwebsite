import Hero         from '@/components/sections/Hero';
import MissionPillars from '@/components/sections/MissionPillars';
import AboutPreview  from '@/components/sections/AboutPreview';
import NewsPreview   from '@/components/sections/NewsPreview';
import CTABanner     from '@/components/sections/CTABanner';
import ImageSlider   from '@/components/sections/ImageSlider';

export const metadata = {
  title: 'GNAAP — Ghana National Authors & Publishers',
  description:
    'The official home of Ghanaian authors and publishers — championing literacy, empowering voices, and transforming society through the written word.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImageSlider />
      <MissionPillars />
      <AboutPreview />
      <NewsPreview />
      <CTABanner />
    </>
  );
}
