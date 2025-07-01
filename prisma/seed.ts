import { PrismaClient, Era } from '@prisma/client';

const prisma = new PrismaClient();

// Mock data arrays
const churchImages = [
  { url: '/Church-ceiling2.jpg', alt: 'Orthodox Church Interior with Iconostasis', description: 'Traditional Orthodox church interior' },
  { url: '/Church-ceiling.jpg', alt: 'Orthodox Icons', description: 'Sacred iconography preserves divine truth' },
];

const timelineData = [
  {
    century: '1st Century',
    martyrs: [
      { name: 'St. Stephen', year: 'AD 36', description: 'First Christian martyr, stoned in Jerusalem' },
      { name: 'St. James', year: 'AD 62', description: 'Brother of Jesus, thrown from temple' },
    ],
  },
  {
    century: '2nd Century',
    martyrs: [
      { name: 'St. Ignatius', year: 'AD 108', description: 'Bishop of Antioch, fed to lions in Rome' },
      { name: 'St. Polycarp', year: 'AD 155', description: 'Bishop of Smyrna, burned at stake' },
    ],
  },
  {
    century: '3rd Century',
    martyrs: [
      { name: 'St. Perpetua', year: 'AD 203', description: 'Young mother martyred in Carthage' },
      { name: 'St. Lawrence', year: 'AD 258', description: 'Deacon martyred during Valerian persecution' },
    ],
  },
  {
    century: '4th Century',
    martyrs: [
      { name: 'St. Sebastian', year: 'AD 288', description: 'Roman soldier martyred by arrows' },
      { name: 'St. Agnes', year: 'AD 304', description: 'Young virgin martyred in Rome' },
    ],
  },
];

const martyrs = [
  { name: 'St. Stephen', title: 'First Martyr', feastDay: 'December 27', year: 'AD 36', era: Era.Apostolic, iconUrl: '/st-stephen-the-first-martyr.jpg', description: 'First Christian martyr, stoned in Jerusalem', prayer: 'Holy Stephen, first martyr, pray for us' },
  { name: 'St. Ignatius', title: 'of Antioch', feastDay: 'December 20', year: 'AD 108', era: Era.Apostolic, iconUrl: '/saint-ignatius-antioch.jpg', description: 'Bishop thrown to wild beasts in Roman Colosseum', prayer: 'Holy Ignatius of Antioch, pray for us' },
  { name: 'St. Polycarp', title: 'Bishop of Smyrna', feastDay: 'February 23', year: 'AD 155', era: Era.Apostolic, iconUrl: '/st-Polycarp.jpg', description: 'Disciple of St. John the Apostle, burned at the stake', prayer: 'Holy Polycarp, bishop and martyr, pray for us' },
  { name: 'St. Perpetua', title: 'Noble Martyr', feastDay: 'March 7', year: 'AD 203', era: Era.Patristic, iconUrl: '/st-Perpetua.jpg', description: 'Young mother martyred in Carthage with her servant Felicity', prayer: 'Holy Perpetua and Felicity, pray for us' },
  { name: 'St. Lawrence', title: 'Deacon Martyr', feastDay: '', year: 'AD 258', era: Era.Patristic, iconUrl: '/st-Laurence.jpg', description: 'Deacon martyred during Valerian persecution', prayer: 'Holy Lawrence, deacon and martyr, pray for us' },
  { name: 'St. Agnes', title: 'Virgin Martyr', feastDay: 'January 21', year: 'AD 304', era: Era.Patristic, iconUrl: '/st-Agnes.JPG', description: 'Young virgin martyred in Rome during Diocletian persecution', prayer: 'Holy Agnes, virgin and martyr, pray for us' },
];

const testimonies = [
  { name: 'Maria S.', title: 'Finding Strength in St. Perpetua', content: "As a young mother facing difficulties, reading about St. Perpetua's courage gave me the strength to persevere through my trials.", date: new Date('2024-12-01') },
  { name: 'Father Michael', title: 'The Witness of Polycarp', content: "In my 30 years of ministry, I've often returned to the example of St. Polycarp.", date: new Date('2024-11-01') },
  { name: 'David K.', title: "Stephen's Forgiveness", content: "Learning about St. Stephen's prayer for his persecutors transformed how I handle conflict.", date: new Date('2024-11-01') },
  { name: 'Sister Catherine', title: 'Agnes and Pure Love', content: "St. Agnes shows us that age is no barrier to heroic sanctity.", date: new Date('2024-10-01') },
];

async function main() {
  // Clear existing data
  await prisma.testimony.deleteMany();
  await prisma.timelineEntry.deleteMany();
  await prisma.timelineCentury.deleteMany();
  await prisma.churchImage.deleteMany();
  await prisma.martyr.deleteMany();

  // Seed Church Images
  await prisma.churchImage.createMany({ data: churchImages });

  // Seed Timeline Centuries & Entries
  for (const centuryBlock of timelineData) {
    const centuryRec = await prisma.timelineCentury.create({
      data: { century: centuryBlock.century },
    });
    for (const entry of centuryBlock.martyrs) {
      await prisma.timelineEntry.create({
        data: {
          name: entry.name,
          year: entry.year,
          description: entry.description,
          centuryId: centuryRec.id,
        },
      });
    }
  }

  // Seed Martyrs
  await prisma.martyr.createMany({ data: martyrs });

  // Seed Testimonies
  await prisma.testimony.createMany({ data: testimonies });

  console.log('✅ Database has been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
