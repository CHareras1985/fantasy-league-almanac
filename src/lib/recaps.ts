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
    bar: "Year one, nine teams, some fake “Random” squad filling out the schedule, whatever. Tony absolutely bullied everyone — 10–3, most points, won eight straight, took the ring off Costa. Meanwhile Marcil goes 1–12 in his first year. Welcome to the league, buddy.",
    bored:
      "This is apparently the first year. There were nine of them, plus a pretend tenth person. Tony won the most games and then won the final thing too. Somebody named Marcil lost almost every week, which everyone still brings up.",
    partner:
      "The very first season, so this is where it all started. Tony won everything, which he has never once let anyone forget. And yes, Marcil went 1 and 12 — I know because you told that story at three separate dinners.",
  },
  2010: {
    analyst:
      "Costa posted the best regular season — 10–3, the scoring lead, and the MVP pick in Arian Foster (323) — but ran into a hot Marcil in the bracket. Marcil rode a seven-game streak to his first championship over Costa, with Paul third. Regular-season strength, playoff variance.",
    bar: "Costa was the best team all year and it didn't matter one bit. Marcil got scorching hot at the right time, won seven in a row, and took the whole thing off Costa in the final. Foster went nuts for Costa — cold comfort.",
    bored:
      "Costa was good for a long time and then lost when it counted. Marcil got the trophy this year. I'm told a running back did well, but I could not tell you which team he was even on.",
    partner:
      "Costa was “robbed,” according to the group chat that lit up my phone all December. Marcil won it. There was a running back involved who was apparently very important.",
  },
  2011: {
    analyst:
      "George set the pace at 11–2 and reached the final, but Fernando closed it out for his first title. Tony led the league in scoring and took the MVP pick behind Drew Brees' 405. Chris entered the league this year.",
    bar: "George went 11–2 and still choked in the final — Fernando got his first ring. Tony hung the most points on everybody with prime Brees going 400-plus. New guy Chris shows up.",
    bored:
      "George won the most games but not the important game. Fernando won that one. A quarterback threw for a large number for Tony. There is now a Chris.",
    partner:
      "George was the best “on paper” — a phrase I have heard so many times. Fernando actually won. This is the year Chris joined, which means one more person in the draft group text.",
  },
  2012: {
    analyst:
      "Dean was the regular-season standout — 11–2 with the scoring lead — but lost the third-place game while Tony beat Marcil for the title. Dean and Marcil shared the longest streak at six. George's Brees (360) was the MVP pick.",
    bar: "Dean was a wagon all year — 11–2, most points — and then didn't even medal. Brutal. Tony beat Marcil in the final. Dean and Marcil both won six straight at some point, so call it a wash.",
    bored:
      "Dean was good and then wasn't. Tony won. Two different people had the same win streak, which felt like it mattered to everyone at the table.",
    partner:
      "Dean “had it in the bag” and then finished fourth, and I heard about it for weeks. Tony won. You spent that whole third-place game pacing around the kitchen.",
  },
  2013: {
    analyst:
      "The most compressed race on record — five teams tied at 6–7. Paul (9–4) took the top seed and third place; Costa won the title over Marcil, who led the league in scoring despite a losing record. Chris's Peyton Manning (400) — a historic real-life season — was the MVP pick.",
    bar: "Absolute logjam in the middle — like five teams at 6–7. Paul was the one seed, Costa won it all, and Marcil scored the most points and STILL had a losing record. Unreal. Chris had that psycho Peyton Manning year.",
    bored:
      "A lot of them had the same record, which caused a lot of discussion. Costa won. Somebody scored the most points and still lost more than they won, and this is apparently very funny.",
    partner:
      "Everyone was tied, so draft-night math came up at brunch. Costa won. You keep bringing up that Peyton Manning “had the greatest season ever,” as if I was there.",
  },
  2014: {
    analyst:
      "Fernando's year — 11–2, the scoring lead, and a title over Fink, who reached the final on an eight-game streak. The MVP pick went to Marcil's Aaron Rodgers (351). It was Paul's final season in the league.",
    bar: "Fernando ran it back — 11–2, most points, beat Fink in the final. Fink got there on an eight-game heater. Paul dips out after this one.",
    bored:
      "Fernando won a lot and then won the last one. Fink got close. Paul stopped playing after this year, which no one seems sad about.",
    partner:
      "Fernando won again. This was Paul's last season, so at least that's one fewer person you text about “waiver claims” at 11pm.",
  },
  2015: {
    analyst:
      "Tony led on every regular-season axis — record, points, a seven-game streak — but Marcil took the championship over George. Matt, in his debut year, ran to third. Wally's midseason Cam Newton (390) was the best transaction.",
    bar: "Tony was the best team by a mile and Marcil took the ring anyway, off George in the final. Rookie Matt makes a third-place run out of nowhere. Wally grabbed MVP Cam Newton off the wire — sicko move.",
    bored:
      "Tony was the best and did not win. Marcil won. A new person, Matt, did surprisingly okay. Wally added a quarterback from the pile of unused players and it worked out.",
    partner:
      "Tony was “the best team that didn't win,” quote unquote. Marcil won. Matt's first year — another draft invite. Wally “won the waiver wire” all offseason, whatever that means.",
  },
  2016: {
    analyst:
      "Wally's peak season — 10–3, the scoring lead, a share of the longest streak with Fernando, and the championship over Fernando in the final. Dean's Aaron Rodgers (377) was the MVP pick.",
    bar: "Wally's magnum opus — 10–3, most points, won the whole thing over Fernando. He and Fernando both had six-game streaks. Dean drafted MVP Rodgers and still didn't win.",
    bored:
      "Wally was the best this year and, for once, also won. He beat Fernando. Dean had the best-drafted guy and it didn't help.",
    partner:
      "Wally's “best year ever,” which he mentions annually. He beat Fernando in the final. You watched every minute of it instead of coming to my cousin's thing.",
  },
  2017: {
    analyst:
      "Chris finally claimed the top regular-season seed, but Dean won the title over Tony — Dean also took the MVP pick and a share of best transaction. Tony led the league in scoring for a fourth time. Mike joined; Wally played his last season.",
    bar: "Chris FINALLY gets a one seed and then Dean wins it all over Tony anyway. Dean cleaned up — title, MVP pick, best transaction. Tony most points AGAIN. Mike joins, Wally rides off.",
    bored:
      "Chris was finally good at the regular part. Dean won the end part. Tony scored the most, again, which he'll tell you about. Mike is new; Wally left.",
    partner:
      "Chris was “due,” and then Dean won instead. Mike joined this year — yes, another one. Wally's last season, so the group chat lost a member and gained none.",
  },
  2018: {
    analyst:
      "Dean was statistically everywhere — 10–3, a then-record 2,087 points, the MVP pick in Saquon Barkley (396), a seven-game streak — yet Mike won the title in only his second season, over Fink. Matt's waiver-wire Patrick Mahomes (424) outscored every drafted player and was the best transaction.",
    bar: "Dean put up video-game numbers — record 2,087 points, MVP Barkley, seven straight — and won NOTHING. Mike takes it in year two over Fink. Matt grabs Mahomes off waivers and he outscores everyone's draft picks. Absurd.",
    bored:
      "Dean scored more than anyone ever had and did not win. Mike won, and he's fairly new. Someone found a quarterback named Mahomes in the leftovers and he was the best one, which everybody found outrageous.",
    partner:
      "Dean scored “the most points in league history” and lost, and I have a very detailed memory of that Sunday. Matt “stole Mahomes,” a sentence said to me many times. Mike won.",
  },
  2019: {
    analyst:
      "Mike backed up his title with the best record (11–2) and an all-time 11-game win streak. George led in scoring and took the MVP pick with Christian McCaffrey's 478 — the highest single-season total in league history — but Matt won the championship over Mike.",
    bar: "Mike goes 11–2 with an ELEVEN-game win streak and still doesn't repeat — Matt gets him in the final. George had CMC's 478, the best fantasy season this league has ever seen, and it wins him a participation trophy. Rough.",
    bored:
      "Mike won eleven in a row, which is apparently a record, and then lost the last game to Matt. George had a running back who scored the most points ever recorded here. He did not win either.",
    partner:
      "Mike won 11 straight and STILL didn't win it all — I heard about the injustice. George had “the greatest fantasy season of all time” and lost. Matt won. Draft night is a formal event now, by the way.",
  },
  2020: {
    analyst:
      "Marcil's best season — 12–1, the scoring lead, an 11-game streak matching the record, and the title over Tony, with Fernando third. Dean took the MVP pick, Mike the best transaction.",
    bar: "Marcil went 12–1, tied the win-streak record at eleven, led in points, and actually finished the job over Tony. Total demolition. Dean and Mike split the pick/transaction hardware.",
    bored:
      "Marcil lost one time all year and won the trophy. He beat Tony. Two other people got smaller awards that I did not follow.",
    partner:
      "Marcil went 12 and 1 — a number I know by heart now. He beat Tony. This was the pandemic year, so you were home for every single game.",
  },
  2021: {
    analyst:
      "The schedule expanded to 14 games. Fink took the top seed and led the league in scoring, but Costa won the championship by a single point over Marcil — 115.4 to 115.1, the closest final on record. Costa also took the MVP pick with Cooper Kupp's 445.",
    bar: "Season stretched to 14 games. Fink was the one seed and scored the most, then Costa beat Marcil in the final by a POINT — 115.4 to 115.1, closest championship ever. Costa had Kupp's 445 too. Marcil still hasn't recovered.",
    bored:
      "This year had more weeks for some reason. Fink was the best in the regular part. Costa won the final by basically nothing — like one point — over Marcil. There was a receiver named Kupp.",
    partner:
      "Costa beat Marcil by ONE POINT and I watched a grown adult lie on the floor. 115.4 to 115.1 — I can recite it. Also the season got longer this year, so: more Sundays.",
  },
};
