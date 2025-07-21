import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function Avis() {
  const router = useRouter();
  const { pro_id } = router.query;
  const [avis, setAvis] = useState([]);
  const [texte, setTexte] = useState('');

  useEffect(() => {
    if (pro_id) {
      supabase.from('avis').select('*').eq('professional_id', pro_id).then(({ data }) => setAvis(data));
    }
  }, [pro_id]);

  const submitAvis = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('avis').insert({ user_id: user.id, professional_id: pro_id, content: texte });
    setTexte('');
    alert('Avis envoyé');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Laisser un avis</h2>
      <textarea value={texte} onChange={(e) => setTexte(e.target.value)} className="border p-2 w-full mb-2" />
      <button onClick={submitAvis} className="bg-green-600 text-white px-4 py-2 rounded">Envoyer</button>
      <div className="mt-4">
        <h3 className="font-semibold">Avis précédents</h3>
        {avis.map((a) => (
          <div key={a.id} className="border p-2 mb-2">{a.content}</div>
        ))}
      </div>
    </div>
  );
}