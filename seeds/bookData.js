const { Book } = require('../models');

const bookData = [
  {
    title: '488 Rules for Life',
    author: 'Kitty Flanagan',
    publication_year: 2019,
    synopsis: `Providing you with the antidote to every annoying little thing, these rules are not made to be broken. 488 Rules for Life is not a self-help book, because it's not you who needs help, it's other people. Whether they're walking and texting, asphyxiating you on public transport with their noxious perfume cloud, or leaving one useless square of toilet paper on the roll, a lot of people just don't know the rules.

    But thanks to Kitty Flanagan's comprehensive guide to modern behaviour, our world will soon be a much better place. A place where people don't ruin the fruit salad by putting banana in it ... where your co-workers respect your olfactory system and don't reheat their fish curry in the office microwave ... where middle aged men don't have ponytails ...`,
    user_shared_id: 1,
    genre_id: 1
  },
  {
    title: 'Harry Potter and The Half-Blood Prince',
    author: 'JK Rowling',
    publication_year: 2005,
    synopsis: `As the Dark Lord's sinister forces amass, a spirit of gloom and fear is sweeping the land. Harry Potter waits nervously in his bedroom at the Dursleys' for Professor Dumbledore to arrive. One of the last times he saw the Headmaster was in a fierce duel with Voldemort at the Ministry of Magic. Why is the Professor coming to visit him now? What is it that cannot wait until Harry returns to Hogwarts?

    In his sixth year, Harry will discover the secret behind the Half-Blood Prince, as Professor Dumbledore prepares him to face his destiny ...`,
    user_shared_id: 5,
    genre_id: 2
  },
  {
    title: 'The Complete Maus',
    author: 'Art Spiegelman',
    publication_year: 2003,
    synopsis: `The Pulitzer Prize-winning Maus tells the story of Vladek Spiegelman, a Jewish survivor of Hitler's Europe, and his son, a cartoonist coming to terms with his father's story. Maus approaches the unspeakable through the diminutive. Its form, the cartoon (the Nazis are cats, the Jews mice), shocks us out of any lingering sense of familiarity and succeeds in "drawing us closer to the bleak heart of the Holocaust" (The New York Times).

    Maus is a haunting tale within a tale. Vladek's harrowing story of survival is woven into the author's account of his tortured relationship with his aging father. Against the backdrop of guilt brought by survival, they stage a normal life of small arguments and unhappy visits. This astonishing retelling of our century's grisliest news is a story of survival, not only of Vladek but of the children who survive even the survivors. Maus studies the bloody pawprints of history and tracks its meaning for all of us.`,
    user_shared_id: 2,
    genre_id: 3
  },
  {
    title: 'To Paradise',
    author: 'Hanya Yanagihara',
    publication_year: 2022,
    synopsis: `In an alternate version of 1893 America, New York is part of the Free States, where people may live and love whomever they please (or so it seems). The fragile young scion of a distinguished family resists betrothal to a worthy suitor, drawn to a charming music teacher of no means. In a 1993 Manhattan besieged by the AIDS epidemic, a young Hawaiian man lives with his much older, wealthier partner, hiding his troubled childhood and the fate of his father. And in 2093, in a world riven by plagues and governed by totalitarian rule, a powerful scientist's damaged granddaughter tries to navigate life without him - and solve the mystery of her husband's disappearances.
    
    These three sections are joined in an enthralling and ingenious symphony, as recurring notes and themes deepen and enrich one another: A townhouse in Washington Square Park in Greenwich Village; illness, and treatments that come at a terrible cost; wealth and squalor; the weak and the strong; race; the definition of family, and of nationhood; the dangerous righteousness of the powerful, and of revolutionaries; the longing to find a place in an earthly paradise, and the gradual realization that it can't exist. What unites not just the characters, but these Americas, are their reckonings with the qualities that make us human: Fear. Love. Shame. Need. Loneliness.`,
    user_shared_id: 3,
    genre_id: 4
  },
  {
    title: 'A Gentleman in Moscow',
    author: 'Amor Towles',
    publication_year: 2016,
    synopsis: `On 21 June 1922 Count Alexander Rostov – recipient of the Order of Saint Andrew, member of the Jockey Club, Master of the Hunt – is escorted out of the Kremlin, across Red Square and through the elegant revolving doors of the Hotel Metropol.

    But instead of being taken to his usual suite, he is led to an attic room with a window the size of a chessboard. Deemed an unrepentant aristocrat by a Bolshevik tribunal, the Count has been sentenced to house arrest indefinitely.
    
    While Russia undergoes decades of tumultuous upheaval, the Count, stripped of the trappings that defined his life, is forced to question what makes us who we are. And with the assistance of a glamorous actress, a cantankerous chef and a very serious child, Rostov unexpectedly discovers a new understanding of both pleasure and purpose.`,
    user_shared_id: 4,
    genre_id: 5
  },
  {
    title: 'House of Leaves',
    author: 'Mark Z. Danielewski',
    publication_year: 1986,
    synopsis: `A young family moves into a small home on Ash Tree Lane where they discover something is terribly wrong: their house is bigger on the inside than it is on the outside.

    Of course, neither Pulitzer Prize-winning photojournalist Will Navidson nor his companion Karen Green was prepared to face the consequences of that impossibility, until the day their two little children wandered off and their voices eerily began to return another story -- of creature darkness, of an ever-growing abyss behind a closet door, and of that unholy growl which soon enough would tear through their walls and consume all their dreams.`,
    user_shared_id: 5,
    genre_id: 6
  },
  {
    title: 'And Then There Were None',
    author: 'Agatha Christie',
    synopsis: `1939. Europe teeters on the brink of war. Ten strangers are invited to Soldier Island, an isolated rock near the Devon coast. Cut off from the mainland, with their generous hosts Mr and Mrs U.N. Owen mysteriously absent, they are each accused of a terrible crime. When one of the party dies suddenly they realise they may be harbouring a murderer among their number.
    
    The 10 strangers include a reckless playboy, a troubled Harley Street doctor, a formidable judge, an uncouth detective, an unscrupulous mercenary, a God-fearing spinster, two restless servants, a highly decorated general and an anxious secretary. One by one they are picked off. Who will survive? And who is the killer? Copies of an ominous nursery rhyme hang in each room, the murders mimicking the awful fates of its 'Ten Little Soldier Boys'.`,
    publication_year: 1939,
    user_shared_id: 3,
    genre_id: 7
  },
  {
    title: 'The Decline and Fall of the Roman Empire',
    author: 'Edward Gibbon',
    synopsis: `Abridged and with an Introduction by Antony Lentin and Brian Norman. Gibbon's Decline and Fall of the Roman Empire, published between 1776 and 1788, is the undisputed masterpiece of English historical writing which can only perish with the language itself. Its length alone is a measure of its monumental quality: seventy-one chapters, of which twenty-eight appear in full in this edition. With style, learning and wit, Gibbon takes the reader through the history of Europe from the second century AD to the fall of Constantinople in 1453 - an enthralling account by 'the greatest of the historians of the Enlightenment'. This edition includes Gibbon's footnotes and quotations, here translated for the first time, together with brief explanatory comments, a precis of the chapters not included, 16 maps, a glossary, and a list of emperors. AUTHOR: Edward Gibbon was born on 8th May 1737 in Putney, Surrey. He described himself as "a puny child, neglected by my Mother, starved by my nurse". At nine his mother died and he was cared for by his adored 'Aunt Kitty'. In 1753 he converted to Roman Catholicism and in 1761 he began a literary career. His father's death made him a man of independent means with time to pursue his lilfe's work, 'The History of the Decline and Fall of the Roman Empire," published in 1776.`,
    publication_year: 1789,
    user_shared_id: 2,
    genre_id: 8
  },
  {
    title: 'Rough and Ready',
    author: 'Sandra Hill',
    publication_year: 2006,
    synopsis: `A MISSION OF NO MERCY
    It takes nothing short of a miracle to catapult Lt. Torolf Magnusson and his team of Navy SEALs back in time to the eleventh-century Norselands. First on the agenda: destroy the evil villain who terrorized his family and a nation.
    
    A SURRENDER SO SWEET
    But when the sexy SEALs find they've landed in the middle of a sanctuary--filled with women--well, hoo-yah! Their plans are put on hold, much to the distress of Hilda, the head of the sanctuary. At first resistant to Torolf's pursuits, she soon succumbs to his passionate advances. Suddenly the term "Special Forces" takes on a whole new meaning. But with victory in sight for Torolf, Hilda must face the fact that their love may not survive the test of time...`,
    user_shared_id: 4,
    genre_id: 9
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    publication_year: 1965,
    synopsis: `Melange, or 'spice', is the most valuable - and rarest - element in the universe; a drug that does everything from increasing a person's life-span to making intersteller travel possible. And it can only be found on a single planet: the inhospitable desert world Arrakis.

    Whoever controls Arrakis controls the spice. And whoever controls the spice controls the universe. When the Emperor transfers stewardship of Arrakis from the noble House Harkonnen to House Atreides, the Harkonnens fight back, murdering Duke Leto Atreides.
    
    Paul, his son, and Lady Jessica, his concubine, flee into the desert. On the point of death, they are rescued by a band for Fremen, the native people of Arrakis, who control Arrakis' second great resource: the giant worms that burrow beneath the burning desert sands. In order to avenge his father and retake Arrakis from the Harkonnens, Paul must earn the trust of the Fremen and lead a tiny army against the innumerable forces aligned against them. And his journey will change the universe.`,
    user_shared_id: 1,
    genre_id: 10
  }
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;
