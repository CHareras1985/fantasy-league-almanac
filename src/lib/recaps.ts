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
      "The very first season, so this is where it all started. Tony won everything, which he has never once let anyone forget. And yes, Marcil went 1 and 12 — I know because you told that story at three separate dinners.",
  },
  2010: {
    analyst:
      "Costa posted the best regular season — 10–3, the scoring lead, and the MVP pick in Arian Foster (323) — but ran into a hot Marcil in the bracket. Marcil rode a seven-game streak to his first championship over Costa, with Paul third. Regular-season strength, playoff variance.",
    bar: "Costa's the best team all year again, and again it means jack. Marcil caught fire, won seven straight, and mugged Costa in the final — that's Costa 0-for-2 in title games, but who's counting. Everybody. Everybody's counting. Foster went nuclear for Costa. Cool. Have a beer.",
    bored:
      "Costa was good for a long time and then lost when it counted. Marcil got the trophy this year. I'm told a running back did well, but I could not tell you which team he was even on.",
    partner:
      "Costa was “robbed,” according to the group chat that lit up my phone all December. Marcil won it. There was a running back involved who was apparently very important.",
  },
  2011: {
    analyst:
      "George set the pace at 11–2 and reached the final, but Fernando closed it out for his first title. Tony led the league in scoring and took the MVP pick behind Drew Brees' 405. Chris entered the league this year.",
    bar: "George rolls to 11–2 and then face-plants in the final — Fernando swipes his first ring while George is still figuring out what happened. Tony hangs the most points on the room with prime Brees. New guy Chris arrives and is immediately terrible.",
    bored:
      "George won the most games but not the important game. Fernando won that one. A quarterback threw for a large number for Tony. There is now a Chris.",
    partner:
      "George was the best “on paper” — a phrase I have heard so many times. Fernando actually won. This is the year Chris joined, which means one more person in the draft group text.",
  },
  2012: {
    analyst:
      "Dean was the regular-season standout — 11–2 with the scoring lead — but lost the third-place game while Tony beat Marcil for the title. Dean and Marcil shared the longest streak at six. George's Brees (360) was the MVP pick.",
    bar: "Dean's a wagon — 11–2, most points — and doesn't even medal. Fourth place. For the best team in the league. Chef's kiss. Tony beats Marcil in the final. Dean and Marcil both had six-game streaks, so neither one gets the mic.",
    bored:
      "Dean was good and then wasn't. Tony won. Two different people had the same win streak, which felt like it mattered to everyone at the table.",
    partner:
      "Dean “had it in the bag” and then finished fourth, and I heard about it for weeks. Tony won. You spent that whole third-place game pacing around the kitchen.",
  },
  2013: {
    analyst:
      "The most compressed race on record — five teams tied at 6–7. Paul (9–4) took the top seed and third place; Costa won the title over Marcil, who led the league in scoring despite a losing record. Chris's Peyton Manning (400) — a historic real-life season — was the MVP pick.",
    bar: "Total pileup — five teams stuck at 6–7, nobody actually wants it. Paul backs into the one seed, Costa wins the whole thing, and Marcil leads the LEAGUE in scoring with a losing record. Only Marcil could pull that off. Chris rode a cartoon Peyton Manning season and still couldn't close.",
    bored:
      "A lot of them had the same record, which caused a lot of discussion. Costa won. Somebody scored the most points and still lost more than they won, and this is apparently very funny.",
    partner:
      "Everyone was tied, so draft-night math came up at brunch. Costa won. You keep bringing up that Peyton Manning “had the greatest season ever,” as if I was there.",
  },
  2014: {
    analyst:
      "Fernando's year — 11–2, the scoring lead, and a title over Fink, who reached the final on an eight-game streak. The MVP pick went to Marcil's Aaron Rodgers (351). It was Paul's final season in the league.",
    bar: "Fernando runs it back — 11–2, most points, smokes Fink in the final. Fink only snuck in on an eight-game heater and everybody knew it. Paul packs it in after this year. Nobody's throwing him a party.",
    bored:
      "Fernando won a lot and then won the last one. Fink got close. Paul stopped playing after this year, which no one seems sad about.",
    partner:
      "Fernando won again. This was Paul's last season, so at least that's one fewer person you text about “waiver claims” at 11pm.",
  },
  2015: {
    analyst:
      "Tony led on every regular-season axis — record, points, a seven-game streak — but Marcil took the championship over George. Matt, in his debut year, ran to third. Wally's midseason Cam Newton (390) was the best transaction.",
    bar: "Tony's the best team by a mile and Marcil robs him blind anyway, beating George in the final. Rookie Matt stumbles into third place like he tripped over it. Wally grabbed Cam Newton off the wire and has not shut up about it since.",
    bored:
      "Tony was the best and did not win. Marcil won. A new person, Matt, did surprisingly okay. Wally added a quarterback from the pile of unused players and it worked out.",
    partner:
      "Tony was “the best team that didn't win,” quote unquote. Marcil won. Matt's first year — another draft invite. Wally “won the waiver wire” all offseason, whatever that means.",
  },
  2016: {
    analyst:
      "Wally's peak season — 10–3, the scoring lead, a share of the longest streak with Fernando, and the championship over Fernando in the final. Dean's Aaron Rodgers (377) was the MVP pick.",
    bar: "Wally's magnum opus — 10–3, most points, wins it all over Fernando. Him and Fernando both had six-game streaks. Dean drafted the MVP and still got bounced from the playoffs — drafts like a genius, finishes like a guy who drafts like a genius.",
    bored:
      "Wally was the best this year and, for once, also won. He beat Fernando. Dean had the best-drafted guy and it didn't help.",
    partner:
      "Wally's “best year ever,” which he mentions annually. He beat Fernando in the final. You watched every minute of it instead of coming to my cousin's thing.",
  },
  2017: {
    analyst:
      "Chris finally claimed the top regular-season seed, but Dean won the title over Tony — Dean also took the MVP pick and a share of best transaction. Tony led the league in scoring for a fourth time. Mike joined; Wally played his last season.",
    bar: "Chris FINALLY lucks into a one seed and Dean wins the title over Tony anyway, because of course he does. Dean walks off with the ring, the MVP pick, AND a best-transaction share — leave some for the rest of us. Tony leads in points for the FOURTH time and has zero rings to show for it. Mike shows up, Wally shuffles off.",
    bored:
      "Chris was finally good at the regular part. Dean won the end part. Tony scored the most, again, which he'll tell you about. Mike is new; Wally left.",
    partner:
      "Chris was “due,” and then Dean won instead. Mike joined this year — yes, another one. Wally's last season, so the group chat lost a member and gained none.",
  },
  2018: {
    analyst:
      "Dean was statistically everywhere — 10–3, a then-record 2,087 points, the MVP pick in Saquon Barkley (396), a seven-game streak — yet Mike won the title in only his second season, over Fink. Matt's waiver-wire Patrick Mahomes (424) outscored every drafted player and was the best transaction.",
    bar: "Dean drops a league-record 2,087 points, MVP Barkley, seven straight wins — and wins NOTHING. Second-year Mike takes the whole thing over Fink. Then Matt fishes Mahomes out of the waiver bin and the guy outscores every draft pick in the league. Somewhere Dean is still yelling about it.",
    bored:
      "Dean scored more than anyone ever had and did not win. Mike won, and he's fairly new. Someone found a quarterback named Mahomes in the leftovers and he was the best one, which everybody found outrageous.",
    partner:
      "Dean scored “the most points in league history” and lost, and I have a very detailed memory of that Sunday. Matt “stole Mahomes,” a sentence said to me many times. Mike won.",
  },
  2019: {
    analyst:
      "Mike backed up his title with the best record (11–2) and an all-time 11-game win streak. George led in scoring and took the MVP pick with Christian McCaffrey's 478 — the highest single-season total in league history — but Matt won the championship over Mike.",
    bar: "Mike goes 11–2 with an ELEVEN-game win streak and still can't repeat — Matt runs him over in the final. George had CMC's 478, the greatest fantasy season this league has ever seen, and it bought him a firm handshake. Two of the best teams ever built and not a single ring between them that year.",
    bored:
      "Mike won eleven in a row, which is apparently a record, and then lost the last game to Matt. George had a running back who scored the most points ever recorded here. He did not win either.",
    partner:
      "Mike won 11 straight and STILL didn't win it all — I heard about the injustice. George had “the greatest fantasy season of all time” and lost. Matt won. Draft night is a formal event now, by the way.",
  },
  2020: {
    analyst:
      "Marcil's best season — 12–1, the scoring lead, an 11-game streak matching the record, and the title over Tony, with Fernando third. Dean took the MVP pick, Mike the best transaction.",
    bar: "Marcil goes 12–1, ties the win-streak record, leads in points, and actually finishes the job over Tony — Tony never had a prayer. Total demolition. Dean and Mike split the dinky little consolation trinkets.",
    bored:
      "Marcil lost one time all year and won the trophy. He beat Tony. Two other people got smaller awards that I did not follow.",
    partner:
      "Marcil went 12 and 1 — a number I know by heart now. He beat Tony. This was the pandemic year, so you were home for every single game.",
  },
  2021: {
    analyst:
      "The schedule expanded to 14 games. Fink took the top seed and led the league in scoring, but Costa won the championship by a single point over Marcil — 115.4 to 115.1, the closest final on record. Costa also took the MVP pick with Cooper Kupp's 445.",
    bar: "14 games now. Fink's the one seed and leads in points, then Costa beats Marcil in the final by ONE point — 115.4 to 115.1. Marcil lost a title by a rounding error and has not been the same man since. Costa had Kupp's 445 on top of it. Rub it in.",
    bored:
      "This year had more weeks for some reason. Fink was the best in the regular part. Costa won the final by basically nothing — like one point — over Marcil. There was a receiver named Kupp.",
    partner:
      "Costa beat Marcil by ONE POINT and I watched a grown adult lie on the floor. 115.4 to 115.1 — I can recite it. Also the season got longer this year, so: more Sundays.",
  },
};
