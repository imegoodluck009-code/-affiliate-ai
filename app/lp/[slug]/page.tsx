import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function LandingPage({ params }: { params: { slug: string } }) {
  const { data: page } = await supabase
    .from('landing_pages')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (!page) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Page not found</div>;
  }

  const features = page.features || [];
  const testimonials = page.testimonials || [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: page.bg_color, color: page.text_color, fontFamily: page.font }}>
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        {page.hero_image && (
          <img src={page.hero_image} alt="" className="w-full max-w-md mx-auto mb-8 rounded-lg shadow-2xl" />
        )}
        <h1 className="text-5xl font-bold mb-4">{page.headline || page.title}</h1>
        <p className="text-xl opacity-80 mb-8">{page.subheadline}</p>
        <a 
          href={page.cta_link || '/signup'} 
          className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition hover:opacity-90"
          style={{ backgroundColor: page.accent_color, color: '#ffffff' }}
        >
          {page.cta_text}
        </a>
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f: any, i: number) => (
              <div key={i} className="p-6 rounded-lg bg-opacity-10 bg-white">
                <div className="text-3xl mb-3">{f.icon || '✨'}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm opacity-70">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">What People Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t: any, i: number) => (
              <div key={i} className="p-6 rounded-lg bg-opacity-10 bg-white">
                <p className="italic mb-3 opacity-80">"{t.quote}"</p>
                <p className="font-bold text-sm">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className="text-center py-12">
        <a 
          href={page.cta_link || '/signup'} 
          className="inline-block px-8 py-4 rounded-lg font-bold transition hover:opacity-90"
          style={{ backgroundColor: page.accent_color, color: '#ffffff' }}
        >
          {page.cta_text}
        </a>
      </div>
    </div>
  );
}
