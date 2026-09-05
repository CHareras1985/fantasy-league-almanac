/**
 * Season recap blurbs, four voices each. Factual across all personas — only the
 * tone changes. Edit freely; this is the "story" layer on top of the tables.
 */
export type Persona = "analyst" | "bar" | "bored" | "partner";

export const PERSONAS: { key: Persona; label: string }[] = [
  { key: "analyst", label: "Professional analyst" },
  { key: "bar", label: "Bro at the bar" },
  { key: "bored", label: "Doesn't care about football" },
  { key: "partner", label: "Annoyed partner" },
];

export const DEFAULT_PERSONA: Persona = "analyst";

export const SEASON_RECAPS: Record<number, Record<Persona, string>> = {
  2009: {
    analyst:
      "The inaugural year ran nine teams with a median “Random” opponent to square the schedule. Tony was the clear class of the field — top record at 10–3, the scoring lead, and an eight-game win streak — and converted it into the first title over Costa. Costa's Aaron Rodgers (340) was the best value on any board; Marcil's 1–12 debut was the outlier the other way.",
    bar: "Year one. Nine teams plus a fake “Random” opponent — and Random still probably would've beaten Marcil, who went 1–12. ONE win, folks. Tony meanwhile curb-stomped the planet — 10–3, most points, eight straight — and yanked the trophy right out of Costa's hands in the final. Costa had a monster Rodgers season and lost anyway. Get used to that, buddy.",
    bored:
      "This is apparently the first year. There were nine of them, plus a pretend tenth person. Tony won the most games and then won the final thing too. Somebody named Marcil lost almost every week, which everyone still brings up.",
    partner:
      "This is the season it started — the year you discovered fantasy football and I lost my Sundays. Somebody named Tony won, apparently a very big deal. What I remember is you turning the spare bedroom into a “draft room” that is, to this day, still a draft room.",
  },
  2010: {
    analyst:
      "Costa posted the best regular season — 10–3, the scoring lead, and the MVP pick in Arian Foster (323) — but ran into a hot Marcil in the bracket. Marcil rode a seven-game streak to his first championship over Costa, with Paul third. Regular-season strength, playoff variance.",
    bar: "Costa's the best team all year again, and again it means jack. Marcil caught fire, won seven straight, and mugged Costa in the final — that's Costa 0-for-2 in title games, but who's counting. Everybody. Everybody's counting. Foster went nuclear for Costa. Cool. Have a beer.",
    bored:
      "Costa was good for a long time and then lost when it counted. Marcil got the trophy this year. I'm told a running back did well, but I could not tell you which team he was even on.",
    partner:
      "Marcil won this one, which mattered enormously to you and to no one else in this house. You watched every minute of the playoffs from the couch while the gutters you promised to clean quietly filled with leaves.",
  },
  2011: {
    analyst:
      "George set the pace at 11–2 and reached the final, but Fernando closed it out for his first title. Tony led the league in scoring and took the MVP pick behind Drew Brees' 405. Chris entered the league this year.",
    bar: "George rolls to 11–2 and then face-plants in the final — Fernando swipes his first ring while George is still figuring out what happened. Tony hangs the most points on the room with prime Brees. New guy Chris arrives and is immediately terrible.",
    bored:
      "George won the most games but not the important game. Fernando won that one. A quarterback threw for a large number for Tony. There is now a Chris.",
    partner:
      "Fernando won. George “should have” won — I heard the phrase “best team on paper” more times that fall than I heard my own name. You took a call about a trade during my sister's engagement dinner and thought I didn't notice.",
  },
  2012: {
    analyst:
      "Dean was the regular-season standout — 11–2 with the scoring lead — but lost the third-place game while Tony beat Marcil for the title. Dean and Marcil shared the longest streak at six. George's Brees (360) was the MVP pick.",
    bar: "Dean's a wagon — 11–2, most points — and doesn't even medal. Fourth place. For the best team in the league. Chef's kiss. Tony beats Marcil in the final. Dean and Marcil both had six-game streaks, so neither one gets the mic.",
    bored:
      "Dean was good and then wasn't. Tony won. Two different people had the same win streak, which felt like it mattered to everyone at the table.",
    partner:
      "Tony won, over Marcil. You explained to me that Dean “had the best team and blew it” — on what was supposed to be date night — and then checked your phone through the entire movie anyway.",
  },
  2013: {
    analyst:
      "The most compressed race on record — five teams tied at 6–7. Paul (9–4) took the top seed and third place; Costa won the title over Marcil, who led the league in scoring despite a losing record. Chris's Peyton Manning (400) — a historic real-life season — was the MVP pick.",
    bar: "Total pileup — five teams stuck at 6–7, nobody actually wants it. Paul backs into the one seed, Costa wins the whole thing, and Marcil leads the LEAGUE in scoring with a losing record. Only Marcil could pull that off. Chris rode a cartoon Peyton Manning season and still couldn't close.",
    bored:
      "A lot of them had the same record, which caused a lot of discussion. Costa won. Somebody scored the most points and still lost more than they won, and this is apparently very funny.",
    partner:
      "Costa won. Everyone was tied going in, so instead of talking to me at brunch you did math on a napkin. That was the fall I stopped asking how your weekend was going — I already knew. The games were on.",
  },
  2014: {
    analyst:
      "Fernando's year — 11–2, the scoring lead, and a title over Fink, who reached the final on an eight-game streak. The MVP pick went to Marcil's Aaron Rodgers (351). It was Paul's final season in the league.",
    bar: "Fernando runs it back — 11–2, most points, smokes Fink in the final. Fink only snuck in on an eight-game heater and everybody knew it. Paul packs it in after this year. Nobody's throwing him a party.",
    bored:
      "Fernando won a lot and then won the last one. Fink got close. Paul stopped playing after this year, which no one seems sad about.",
    partner:
      "Fernando won again. Paul finally quit the league — I was thrilled, briefly, until you explained someone always replaces them. You missed my cousin's baby shower for a 1pm kickoff you “couldn't move.”",
  },
  2015: {
    analyst:
      "Tony led on every regular-season axis — record, points, a seven-game streak — but Marcil took the championship over George. Matt, in his debut year, ran to third. Wally's midseason Cam Newton (390) was the best transaction.",
    bar: "Tony's the best team by a mile and Marcil robs him blind anyway, beating George in the final. Rookie Matt stumbles into third place like he tripped over it. Wally grabbed Cam Newton off the wire and has not shut up about it since.",
    bored:
      "Tony was the best and did not win. Marcil won. A new person, Matt, did surprisingly okay. Wally added a quarterback from the pile of unused players and it worked out.",
    partner:
      "Marcil won. A new guy, Matt, joined — another name I have to keep straight, another person you text at midnight about “waivers.” We were supposed to start planning the trip that year. We started planning it three years later.",
  },
  2016: {
    analyst:
      "Wally's peak season — 10–3, the scoring lead, a share of the longest streak with Fernando, and the championship over Fernando in the final. Dean's Aaron Rodgers (377) was the MVP pick.",
    bar: "Wally's magnum opus — 10–3, most points, wins it all over Fernando. Him and Fernando both had six-game streaks. Dean drafted the MVP and still got bounced from the playoffs — drafts like a genius, finishes like a guy who drafts like a genius.",
    bored:
      "Wally was the best this year and, for once, also won. He beat Fernando. Dean had the best-drafted guy and it didn't help.",
    partner:
      "Wally won, and he still brings it up, and you still let him. You watched the entire final instead of coming to my cousin's thing, and told me it was “basically the Super Bowl,” as if that settled it.",
  },
  2017: {
    analyst:
      "Chris finally claimed the top regular-season seed, but Dean won the title over Tony — Dean also took the MVP pick and a share of best transaction. Tony led the league in scoring for a fourth time. Mike joined; Wally played his last season.",
    bar: "Chris FINALLY lucks into a one seed and Dean wins the title over Tony anyway, because of course he does. Dean walks off with the ring, the MVP pick, AND a best-transaction share — leave some for the rest of us. Tony leads in points for the FOURTH time and has zero rings to show for it. Mike shows up, Wally shuffles off.",
    bored:
      "Chris was finally good at the regular part. Dean won the end part. Tony scored the most, again, which he'll tell you about. Mike is new; Wally left.",
    partner:
      "Dean won. Mike joined — yes, the league grew again. That was the year the group chat started buzzing at 11pm every night, and you'd reach over and check it, every time, before you'd say goodnight.",
  },
  2018: {
    analyst:
      "Dean was statistically everywhere — 10–3, a then-record 2,087 points, the MVP pick in Saquon Barkley (396), a seven-game streak — yet Mike won the title in only his second season, over Fink. Matt's waiver-wire Patrick Mahomes (424) outscored every drafted player and was the best transaction.",
    bar: "Dean drops a league-record 2,087 points, MVP Barkley, seven straight wins — and wins NOTHING. Second-year Mike takes the whole thing over Fink. Then Matt fishes Mahomes out of the waiver bin and the guy outscores every draft pick in the league. Somewhere Dean is still yelling about it.",
    bored:
      "Dean scored more than anyone ever had and did not win. Mike won, and he's fairly new. Someone found a quarterback named Mahomes in the leftovers and he was the best one, which everybody found outrageous.",
    partner:
      "Mike won. You still bring up Dean “scoring the most points in history and losing,” usually while something else needs doing. Somebody “stole Mahomes,” a phrase that meant nothing to me and still cost us a Sunday.",
  },
  2019: {
    analyst:
      "Mike backed up his title with the best record (11–2) and an all-time 11-game win streak. George led in scoring and took the MVP pick with Christian McCaffrey's 478 — the highest single-season total in league history — but Matt won the championship over Mike.",
    bar: "Mike goes 11–2 with an ELEVEN-game win streak and still can't repeat — Matt runs him over in the final. George had CMC's 478, the greatest fantasy season this league has ever seen, and it bought him a firm handshake. Two of the best teams ever built and not a single ring between them that year.",
    bored:
      "Mike won eleven in a row, which is apparently a record, and then lost the last game to Matt. George had a running back who scored the most points ever recorded here. He did not win either.",
    partner:
      "Matt won. Mike went on some historic win streak — I know because you narrated it, live, from the couch. Draft night became a formal event this year: snacks, a spreadsheet, and a “do not disturb” sign you were only half joking about.",
  },
  2020: {
    analyst:
      "Marcil's best season — 12–1, the scoring lead, an 11-game streak matching the record, and the title over Tony, with Fernando third. Dean took the MVP pick, Mike the best transaction.",
    bar: "Marcil goes 12–1, ties the win-streak record, leads in points, and actually finishes the job over Tony — Tony never had a prayer. Total demolition. Dean and Mike split the dinky little consolation trinkets.",
    bored:
      "Marcil lost one time all year and won the trophy. He beat Tony. Two other people got smaller awards that I did not follow.",
    partner:
      "Marcil won, 12 and 1 — a number I could recite in my sleep, because you did. This was the year we were all stuck at home anyway, so you had an excuse. You used it every single Sunday, all season.",
  },
  2021: {
    analyst:
      "The schedule expanded to 14 games. Fink took the top seed and led the league in scoring, but Costa won the championship by a single point over Marcil — 115.4 to 115.1, the closest final on record. Costa also took the MVP pick with Cooper Kupp's 445.",
    bar: "14 games now. Fink's the one seed and leads in points, then Costa beats Marcil in the final by ONE point — 115.4 to 115.1. Marcil lost a title by a rounding error and has not been the same man since. Costa had Kupp's 445 on top of it. Rub it in.",
    bored:
      "This year had more weeks for some reason. Fink was the best in the regular part. Costa won the final by basically nothing — like one point — over Marcil. There was a receiver named Kupp.",
    partner:
      "Costa beat Marcil by one point and you lay down on the floor. The season also got longer this year — more weeks, more Sundays, more of me finishing dinner alone while you “just check the scores real quick.”",
  },
};
