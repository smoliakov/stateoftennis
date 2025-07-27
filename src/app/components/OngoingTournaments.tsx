'use client';

import { getOngoingTournaments } from '@/app/utils';
import TournamentCard from '@/app/components/TournamentCard';
import { Tournament } from '@/app/data/tournaments';

const OngoingTournaments = ({ tournaments }: { tournaments: Tournament[] }) => {
  return (
    <>
      <h2 className="text-xl md:text-3xl font-bold mb-10 md:mb-16">Ongoing Tournaments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {getOngoingTournaments(tournaments).map((tournament) => (
          <div key={tournament.name + tournament.startDate}>
            <TournamentCard tournament={tournament} />
          </div>
        ))}
      </div>

      <hr className="text-zinc-100 my-10 " />
    </>
  );
};

export default OngoingTournaments;