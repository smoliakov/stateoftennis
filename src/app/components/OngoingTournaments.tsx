'use client';

import TournamentCard from '@/app/components/TournamentCard';
import { Tournament } from '@/app/data/tournaments';
import { getOngoingTournaments } from '@/app/utils';

const OngoingTournaments = ({ tournaments }: { tournaments: Tournament[] }) => {
  return (
    <>
      <h2 className="mb-10 text-xl font-bold md:mb-16 md:text-3xl">
        Ongoing Tournaments
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {getOngoingTournaments(tournaments).map((tournament) => (
          <div key={tournament.name + tournament.startDate}>
            <TournamentCard tournament={tournament} />
          </div>
        ))}
      </div>

      <hr className="my-10 text-zinc-100" />
    </>
  );
};

export default OngoingTournaments;
