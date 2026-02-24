import { useState, useEffect } from 'react';
import CharacterSheet from './CharacterSheet';

export default function CharacterSheetPage() {
  const [characterId, setCharacterId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCharacterId(params.get('id'));
  }, []);

  if (!characterId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="text-5xl mb-4">🎲</div>
        <h2 className="text-lg font-display font-semibold text-[#CDC9B2] mb-2">Personaje no encontrado</h2>
        <p className="text-sm text-[#807953] mb-6">No se encontró el ID del personaje en la URL.</p>
        <a href="/app" className="btn-gold text-sm !px-5 !py-2.5 rounded-lg">Volver al panel</a>
      </div>
    );
  }

  return <CharacterSheet characterId={characterId} />;
}
